import * as AWS from 'aws-sdk';

const LAMBDA = new AWS.Lambda();
const SERVICE_NAME = process.env.SERVICE_NAME ?? '';
const STAGE = process.env.STAGE ?? 'local';

// EVENTS
export const EVENTS = {
    // TODO: Add your lambda events here //
    USER_CREATED_EVENT: `${SERVICE_NAME}-events-${STAGE}-user_created`,
    LOG_ADMIN_ACTIVITY: `${SERVICE_NAME}-events-${STAGE}-log_admin_activity`,
    PAYMENT_ADD_CLIENT: `payment-${STAGE}-add_client`,
    WALLET_POSTPAID_SUMMARY: `wallet-events-${STAGE}-postpaid_summary`,
};

/**
 * Invoke the lambda function without response
 *
 * @param FunctionName
 * @param Payload
 * @returns {Promise<unknown>}
 */

export async function invokeEvent(FunctionName: string, Payload: unknown): Promise<unknown> {
    if (STAGE === 'local') {
        // // eslint-disable-next-line @typescript-eslint/no-var-requires
        // const LambdaLocal = require('./LambdaLocal');
        // return LambdaLocal.invokeEvent(FunctionName, Payload);
    } else {
        return LAMBDA.invoke({
            FunctionName,
            InvocationType: 'Event',
            Payload: JSON.stringify(Payload),
        }).promise();
    }
}

/**
 * Invoke the lambda function with response
 *
 * @param FunctionName
 * @param Parameter
 * @returns {Promise<unknown>}
 */
export async function invokeWithResponse(FunctionName: string, Parameter: unknown): Promise<unknown> {
    if (STAGE === 'local') {
        // // eslint-disable-next-line @typescript-eslint/no-var-requires
        // const LambdaLocal = require('./LambdaLocal');
        // return LambdaLocal.invokeWithResponse(FunctionName, Parameter);
    } else {
        const result: AWS.Lambda.InvocationResponse = await LAMBDA.invoke({
            FunctionName,
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(Parameter),
        }).promise();

        return JSON.parse(<string>result.Payload);
    }
}
