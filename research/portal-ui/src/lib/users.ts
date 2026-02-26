import { getDynamoClient, USERS_TABLE } from './dynamodb';
import { GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

/* ─── User Interface ─── */
export interface PortalUser {
    email: string;
    passwordHash: string;
    name: string;
    role: string;
    mustChangePassword: boolean;
    createdAt: string;
    lastLogin?: string;
}

/* ─── Get User by Email ─── */
export async function getUserByEmail(
    email: string
): Promise<PortalUser | null> {
    const client = getDynamoClient();
    const result = await client.send(
        new GetCommand({
            TableName: USERS_TABLE,
            Key: { email },
        })
    );
    return (result.Item as PortalUser) || null;
}

/* ─── Create User ─── */
export async function createUser(user: PortalUser): Promise<void> {
    const client = getDynamoClient();
    await client.send(
        new PutCommand({
            TableName: USERS_TABLE,
            Item: user,
        })
    );
}

/* ─── Update Password ─── */
export async function updatePassword(
    email: string,
    newPasswordHash: string
): Promise<void> {
    const client = getDynamoClient();
    await client.send(
        new UpdateCommand({
            TableName: USERS_TABLE,
            Key: { email },
            UpdateExpression:
                'SET passwordHash = :ph, mustChangePassword = :mcp',
            ExpressionAttributeValues: {
                ':ph': newPasswordHash,
                ':mcp': false,
            },
        })
    );
}

/* ─── Update Last Login ─── */
export async function updateLastLogin(email: string): Promise<void> {
    const client = getDynamoClient();
    await client.send(
        new UpdateCommand({
            TableName: USERS_TABLE,
            Key: { email },
            UpdateExpression: 'SET lastLogin = :ll',
            ExpressionAttributeValues: {
                ':ll': new Date().toISOString(),
            },
        })
    );
}
