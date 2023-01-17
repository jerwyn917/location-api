export interface QueryPaginationKeys {
    page: number;
    limit: number;
}

export interface PaginationQuery {
    page?: string;
    limit?: string;
}

export class HttpRequestHelper {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static extractQuery(queryStringParameters: any, key: string): string {
        return queryStringParameters ? queryStringParameters[key] : '';
    }

    static extractPagination<T extends PaginationQuery>(queryStringParameters: T): QueryPaginationKeys {
        const query = queryStringParameters ? queryStringParameters : { page: '1', limit: '50', search: '' };
        const page = query.page ? parseInt(query.page.trim()) : 1;
        const limit = query.limit ? parseInt(query.limit.trim()) : 50;
        return {
            page,
            limit,
        };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    static extractPath(pathParameters: any, key: string): string {
        if (!pathParameters) return '';
        return pathParameters[key];
    }
}
