import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../../src/libs/Logger';

const OPENAPI = '3.0.0';
const PROJECT_INFO = {
    description: 'Testflock api swagger documentation',
    version: '1.0.0',
    title: 'Testflock API',
    contact: {
        email: 'zjnrabor@917ventures.com',
    },
    license: {
        name: 'Development: https://z21mkhdeqc.execute-api.ap-southeast-1.amazonaws.com/dev',
        url: 'https://z21mkhdeqc.execute-api.ap-southeast-1.amazonaws.com/dev',
    },
};

const TAGS_NAMES = {
    BROADCAST: 'BROADCAST',
    CONNECTION: 'CONNECTION',
    API_GATEWAY: 'API GATEWAY',
};

const TAGS = [
    {
        name: TAGS_NAMES.BROADCAST,
        description: 'Broadcast APIs Supported',
    },
    {
        name: TAGS_NAMES.CONNECTION,
        description: 'Connection APIs Supported',
    },
    {
        name: TAGS_NAMES.API_GATEWAY,
        description: 'API Gateway Supported (Privately accessible)',
    },
];

const DEFAULTS = {
    AuthenticationToken: {
        type: 'string',
        description: 'JWT Token to access secured apis',
    },
    RefreshToken: {
        type: 'string',
        description: 'Token to regenerate the AuthenticationToken',
    },
};

const getDefinitions = async (): Promise<any> => {
    let DEFINITIONS = {};

    const files = fs.readdirSync(path.join(__dirname, 'definitions'));

    for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const file_path = `./definitions/${file.replace('.ts', '')}`;
        const data = await import(file_path);

        DEFINITIONS = {
            ...DEFINITIONS,
            ...data.default,
        };
    }

    return DEFINITIONS;
};
const getPaths = async (directory: string): Promise<any[]> => {
    const PATHS: any[] = [];

    try {
        const files = fs.readdirSync(path.join(__dirname, `paths/${directory}`));

        for (let i = 0; i < files.length; i += 1) {
            const file = files[i];
            const file_path = `./paths/${directory}/${file.replace('.ts', '')}`;
            const data = await import(file_path);

            PATHS.push(data.default);
        }

        return PATHS;
    } catch (error) {
        Logger.debug('Config.getPaths', { error });

        return [];
    }
};

export { OPENAPI, PROJECT_INFO, TAGS_NAMES, TAGS, DEFAULTS, getDefinitions, getPaths };
