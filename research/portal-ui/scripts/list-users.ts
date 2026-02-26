/**
 * List Portal Users CLI Script
 * Displays all users in the PortalUsers DynamoDB table with their statuses.
 *
 * Usage:
 *   npx tsx scripts/list-users.ts
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const TABLE_NAME = 'PortalUsers';

async function main() {
    const client = new DynamoDBClient({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });
    const docClient = DynamoDBDocumentClient.from(client);

    const result = await docClient.send(
        new ScanCommand({ TableName: TABLE_NAME })
    );

    const users = result.Items || [];

    if (users.length === 0) {
        console.log('\n📭 No users found in the portal.\n');
        return;
    }

    console.log('');
    console.log(`👥 Portal Users (${users.length} total)`);
    console.log('─'.repeat(90));
    console.log(
        'Email'.padEnd(35) +
        'Name'.padEnd(20) +
        'Role'.padEnd(10) +
        'Status'.padEnd(15) +
        'Last Login'
    );
    console.log('─'.repeat(90));

    for (const user of users) {
        const status = user.mustChangePassword ? '🔑 Must Change' : '✅ Active';
        const lastLogin = user.lastLogin
            ? new Date(user.lastLogin).toLocaleString()
            : 'Never';

        console.log(
            String(user.email).padEnd(35) +
            String(user.name).padEnd(20) +
            String(user.role).padEnd(10) +
            status.padEnd(15) +
            lastLogin
        );
    }

    console.log('─'.repeat(90));
    console.log('');
}

main().catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
