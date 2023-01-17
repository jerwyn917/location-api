import AWS = require('aws-sdk');
import { Logger } from './Logger';

export interface SchemaPublishSNS {
    Subject: string;
    Message: string;
    TopicArn: string | undefined;
}
export async function PublishSNS(params: SchemaPublishSNS): Promise<void> {
    Logger.debug(`PRE-PUBLISH: ${params.TopicArn}`, {
        params,
    });

    try {
        const confg: AWS.SNS.ClientConfiguration = {};
        confg.region = 'ap-southeast-1';
        confg.apiVersion = '2010-12-01';

        const sns = new AWS.SNS(confg);

        await sns
            .publish(params)
            .promise()
            .then(function () {
                Logger.info(`SNS.publish.${params.TopicArn}.SUCCESS`, 'Published');
            })
            .catch(function (error) {
                Logger.error(`SNS.publish.${params.TopicArn}.ERROR`, { error });
            });
    } catch (error) {
        Logger.error(`SNS.publish.${params.TopicArn}.ERROR`, {
            error,
        });
    }
}
