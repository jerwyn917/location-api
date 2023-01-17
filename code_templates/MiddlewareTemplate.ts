import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { snakeCase } from 'case-anything';

const config = `
<name>:
  handler: src/functions/middlewares/<name>/handler.execute

  environment:

  warmup:
    api:
      enabled: true
`;
const handler = `
import { Logger } from '../../../libs/Logger';
import { JWT } from '../../../libs/JWT';
import { TokenData } from '../../../helper/Interface';
import { TokenType } from '../../../helper/Enums';
import { Databases } from '../../../libs/Mysql';
import { Context, Effect, Event, generatePolicy, Policy } from '../../../helper/Middleware';
import { WarmerService } from '../../../services/WarmerService';

export async function execute(event: Event, context?: Context): Promise<Policy> {
    const request_id = context !== undefined && context.awsRequestId ? context.awsRequestId : '';
    const resource = event.methodArn;

    try {
        WarmerService.execute(event);

        if (typeof event.authorizationToken === 'undefined' || event.authorizationToken === '') {
            Logger.error('Authorization:403', { event, context });
            return generatePolicy(request_id, Effect.DENY, resource);
        }

        const tokenData = await JWT.verifyToken<TokenData>(event.authorizationToken);
        if (tokenData.type !== TokenType.ACCESS_TOKEN) {
            Logger.error('Authorization:403', { event, context });
            return generatePolicy(request_id, Effect.DENY, resource);
        }

        Logger.info('Authorization:200', { event, context });
        return generatePolicy(request_id, Effect.ALLOW, resource);
    } catch (error) {
        Logger.error('Authorization:403', { event, context });
        return generatePolicy(request_id, Effect.DENY, resource);
    } finally {
        await Databases.closeConnection();
    }
}
`;

export class MiddlewareTemplate {
    private readonly name: string;

    constructor(name: string) {
        this.name = snakeCase(name.trim());
    }

    generate(): void {
        if (existsSync(`./src/functions/middlewares/${this.name}`)) throw new Error('Middleware already existed');

        mkdirSync(`./src/functions/middlewares/${this.name}`, { recursive: true });
        writeFileSync(
            `./src/functions/middlewares/${this.name}/config.yml`,
            config.trim().replace(/<name>/g, this.name),
        );

        writeFileSync(`./src/functions/middlewares/${this.name}/handler.ts`, handler.trim());
    }
}
