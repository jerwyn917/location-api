import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

const TABLE_NAME = process.env.TABLE_NAME ?? '';

@table(TABLE_NAME)
export class DynamoModel {
    @hashKey()
    lookup_key: string;
    @rangeKey()
    reference_key: string;

    @attribute()
    filter1_key: string;
    @attribute()
    filter2_key: string;
    @attribute()
    filter3_key: string;

    @attribute()
    id: string;

    @attribute()
    created_at: string;
    @attribute()
    updated_at: string;
    @attribute()
    deleted_at: string;

    static get LOOKUP_KEY_FIELD(): string {
        return 'lookup_key';
    }

    static get REFERENCE_KEY_FIELD(): string {
        return 'reference_key';
    }

    static get FILTER1_KEY_FIELD(): string {
        return 'filter1_key';
    }

    static get FILTER2_KEY_FIELD(): string {
        return 'filter2_key';
    }

    static get FILTER3_KEY_FIELD(): string {
        return 'filter3_key';
    }
}
