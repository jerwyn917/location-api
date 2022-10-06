import { RequestContextContent } from '../libs/Contracts/ApiGatewayEvent';

export enum Effect {
    ALLOW = 'Allow',
    DENY = 'Deny',
}

export interface Statement {
    Action: string;
    Effect: string;
    Resource: string;
}

export interface PolicyDocument {
    Version: string;
    Statement: Statement[];
}

export interface Policy {
    principalId: string;
    policyDocument: PolicyDocument;
    context: RequestContextContent;
}

export const generatePolicy = (id: string, effect: Effect, resource: string, user_id?: string): Policy => {
    return {
        principalId: id,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
        context: {
            user_id,
        },
    };
};

export interface Event {
    methodArn: string;
    authorizationToken: string;
}

export interface Context {
    awsRequestId?: string;
}
