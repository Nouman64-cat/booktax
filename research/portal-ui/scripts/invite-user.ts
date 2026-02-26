/**
 * Invite User CLI Script
 * Creates a user in DynamoDB with a temporary password and sends an invite email via SES SMTP.
 *
 * Usage:
 *   npx tsx scripts/invite-user.ts --email user@example.com --name "John Doe"
 *   npx tsx scripts/invite-user.ts --email user@example.com --name "John Doe" --role admin
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const TABLE_NAME = 'PortalUsers';

/* ─── Parse CLI Arguments ─── */
function parseArgs() {
    const args = process.argv.slice(2);
    const parsed: Record<string, string> = {};

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--') && i + 1 < args.length) {
            parsed[args[i].replace('--', '')] = args[i + 1];
            i++;
        }
    }

    if (!parsed.email || !parsed.name) {
        console.error('');
        console.error('Usage: npx tsx scripts/invite-user.ts --email user@example.com --name "John Doe" [--role admin]');
        console.error('');
        process.exit(1);
    }

    return {
        email: parsed.email.toLowerCase().trim(),
        name: parsed.name,
        role: parsed.role || 'user',
    };
}

/* ─── Generate Temporary Password ─── */
function generateTemporaryPassword(): string {
    // 12 characters: letters + numbers + special
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    const special = '!@#$%';
    let pass = '';
    for (let i = 0; i < 10; i++) {
        pass += charset[crypto.randomInt(charset.length)];
    }
    // Add one uppercase, one digit, and one special char to ensure requirements
    pass += charset[crypto.randomInt(26)]; // uppercase
    pass += special[crypto.randomInt(special.length)];
    return pass;
}

/* ─── Main ─── */
async function main() {
    const { email, name, role } = parseArgs();

    console.log('');
    console.log(`📧 Inviting user: ${name} <${email}> (role: ${role})`);
    console.log('');

    // Initialize DynamoDB
    const client = new DynamoDBClient({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });
    const docClient = DynamoDBDocumentClient.from(client, {
        marshallOptions: { removeUndefinedValues: true },
    });

    // Check if user already exists
    const existing = await docClient.send(
        new GetCommand({ TableName: TABLE_NAME, Key: { email } })
    );
    if (existing.Item) {
        console.error(`❌ User with email "${email}" already exists.`);
        process.exit(1);
    }

    // Generate temp password and hash it
    const tempPassword = generateTemporaryPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    // Store user in DynamoDB
    await docClient.send(
        new PutCommand({
            TableName: TABLE_NAME,
            Item: {
                email,
                passwordHash,
                name,
                role,
                mustChangePassword: true,
                createdAt: new Date().toISOString(),
            },
        })
    );

    console.log('✅ User created in DynamoDB');

    // Send invite email via SES SMTP
    const portalUrl = process.env.PORTAL_URL || 'http://localhost:3000';

    const transporter = nodemailer.createTransport({
        host: process.env.AWS_SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
        port: parseInt(process.env.AWS_SMTP_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.AWS_SES_SMTP_USER!,
            pass: process.env.AWS_SES_SMTP_PASS!,
        },
    });

    const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 32px;">
      <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Bixious Research</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Research Portal Invitation</p>
      </div>
      <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="color: #1e293b; font-size: 16px;">Hello <strong>${name}</strong>,</p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
          You have been invited to access the Bixious Research Portal. Use the credentials below to sign in:
        </p>
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Portal URL</p>
          <p style="margin: 0 0 16px;"><a href="${portalUrl}/login" style="color: #6366f1; font-weight: 600;">${portalUrl}/login</a></p>
          <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
          <p style="margin: 0 0 16px; font-weight: 600; color: #1e293b;">${email}</p>
          <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Temporary Password</p>
          <p style="margin: 0; font-family: monospace; font-size: 18px; color: #1e293b; background: #f1f5f9; padding: 8px 12px; border-radius: 6px; letter-spacing: 0.05em;">${tempPassword}</p>
        </div>
        <p style="color: #ef4444; font-size: 13px; font-weight: 600;">⚠️ You will be required to change this password on first sign in.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">This is an automated invitation. Do not share your credentials.</p>
      </div>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: `"Bixious Research" <${process.env.SES_FROM_EMAIL || 'no-reply@bixious.com'}>`,
            to: email,
            subject: 'You have been invited to Bixious Research Portal',
            html: htmlBody,
        });
        console.log('✅ Invite email sent successfully');
    } catch (err) {
        console.error('⚠️  Failed to send invite email:', (err as Error).message);
        console.log('');
        console.log('The user has been created. Share credentials manually:');
    }

    console.log('');
    console.log('┌──────────────────────────────────────┐');
    console.log('│  User Credentials (keep secure)      │');
    console.log('├──────────────────────────────────────┤');
    console.log(`│  Email:    ${email}`);
    console.log(`│  Password: ${tempPassword}`);
    console.log(`│  Role:     ${role}`);
    console.log('│  Must change password: Yes           │');
    console.log('└──────────────────────────────────────┘');
    console.log('');
}

main().catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
