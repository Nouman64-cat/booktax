/**
 * Setup DynamoDB Table for Portal Users
 * Run: npx tsx scripts/setup-table.ts
 */

import {
    DynamoDBClient,
    CreateTableCommand,
    DescribeTableCommand,
} from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const TABLE_NAME = 'PortalUsers';

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

async function main() {
    console.log('🔍 Checking if table exists...');

    try {
        await client.send(
            new DescribeTableCommand({ TableName: TABLE_NAME })
        );
        console.log(`✅ Table "${TABLE_NAME}" already exists.`);
        return;
    } catch (err: unknown) {
        const error = err as { name?: string };
        if (error.name !== 'ResourceNotFoundException') {
            throw err;
        }
    }

    console.log(`📦 Creating table "${TABLE_NAME}"...`);

    await client.send(
        new CreateTableCommand({
            TableName: TABLE_NAME,
            AttributeDefinitions: [
                { AttributeName: 'email', AttributeType: 'S' },
            ],
            KeySchema: [
                { AttributeName: 'email', KeyType: 'HASH' },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        })
    );

    console.log(`✅ Table "${TABLE_NAME}" created successfully.`);
    console.log('');
    console.log('Next step: invite users with:');
    console.log('  npx tsx scripts/invite-user.ts --email user@example.com --name "John Doe"');
}

main().catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
