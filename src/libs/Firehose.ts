import * as AWS from 'aws-sdk';
import { Logger } from './Logger';

const FIREHOSE_STREAM = process.env.FIREHOSE_STREAM ?? '';

export class Firehose {
    service: AWS.Firehose;

    constructor() {
        this.service = new AWS.Firehose();
    }

    async putRecord<T>(Data: T): Promise<void> {
        await this.service
            .putRecord({
                DeliveryStreamName: FIREHOSE_STREAM,
                Record: {
                    Data: JSON.stringify(Data),
                },
            })
            .promise();
    }

    async putRecords<T>(Data: T[]): Promise<void> {
        const result = await this.service
            .putRecordBatch({
                DeliveryStreamName: FIREHOSE_STREAM,
                Records: Data.map((item) => {
                    return {
                        Data: JSON.stringify(item),
                    };
                }),
            })
            .promise();

        Logger.info('Firehose.putRecords', { ...result });
    }
}
