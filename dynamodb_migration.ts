import { client } from './src/libs/DynamoDB';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
import { Logger } from './src/libs/Logger';
const TABLE_NAME = process.env.TABLE_NAME ?? '';

async function migrate() {
    const table: CreateTableInput = {
        TableName: TABLE_NAME,
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        AttributeDefinitions: [
            {
                AttributeName: 'lookup_key',
                AttributeType: 'S',
            },
            {
                AttributeName: 'reference_key',
                AttributeType: 'S',
            },
            {
                AttributeName: 'filter1_key',
                AttributeType: 'S',
            },
            {
                AttributeName: 'filter2_key',
                AttributeType: 'S',
            },
            {
                AttributeName: 'filter3_key',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'lookup_key',
                KeyType: 'HASH',
            },
            {
                AttributeName: 'reference_key',
                KeyType: 'RANGE',
            },
        ],
        LocalSecondaryIndexes: [
            {
                KeySchema: [
                    {
                        AttributeName: 'lookup_key',
                        KeyType: 'HASH',
                    },
                    {
                        AttributeName: 'filter1_key',
                        KeyType: 'RANGE',
                    },
                ],
                IndexName: 'FILTER1_INDEX',
                Projection: {
                    ProjectionType: 'ALL',
                },
            },
            {
                KeySchema: [
                    {
                        AttributeName: 'lookup_key',
                        KeyType: 'HASH',
                    },
                    {
                        AttributeName: 'filter2_key',
                        KeyType: 'RANGE',
                    },
                ],
                IndexName: 'FILTER2_INDEX',
                Projection: {
                    ProjectionType: 'ALL',
                },
            },
            {
                KeySchema: [
                    {
                        AttributeName: 'lookup_key',
                        KeyType: 'HASH',
                    },
                    {
                        AttributeName: 'filter3_key',
                        KeyType: 'RANGE',
                    },
                ],
                IndexName: 'FILTER3_INDEX',
                Projection: {
                    ProjectionType: 'ALL',
                },
            },
        ],
    };

    try {
        if (process.env.STAGE === 'local') await client.createTable(table).promise();

        Logger.info('Migration Status: ', 'Success');
    } catch (error) {
        Logger.info('Migration Status: ', 'Failed');
        Logger.error('DynamoDB.Migration', {
            error,
        });
    }
}

migrate().then();
