interface Headers {
    Authorization?: string;
    Host: string;
}

export interface RequestContextContent {
    user_id?: string;
    token?: string;
}

interface RequestContext {
    authorizer?: RequestContextContent;
}

export interface ApiGatewayEvent {
    source?: string;
    methodArn?: string;
    headers?: Headers;
    body: string;
    queryStringParameters?: {
        [key: string]: string | number | undefined;
    };
    pathParameters?: {
        [key: string]: string;
    };
    requestContext?: RequestContext;
}

export interface Event {
    source?: string;
    methodArn: string;
    authorizationToken: string;
}
