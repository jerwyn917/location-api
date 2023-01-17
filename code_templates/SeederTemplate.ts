import { pascalCase } from 'case-anything';
import { existsSync, writeFileSync } from 'fs';

const content = `
import { Databases } from '../../libs/Mysql';
import * as faker from 'faker';

export class <class_name>Faker {
    static async seed(args?: unknown): Promise<<class_name>Model> {
        const connection = await Databases.getConnection();
        const repository = connection.getCustomRepository(<class_name>Repository);

        const model = new <class_name>Model();
        
        if (args) model = Object.assign(model, args);
        await repository.save(model);
        return model;
    }
}

`;

export class SeederTemplate {
    private readonly className: string;

    constructor(name: string) {
        this.className = pascalCase(name.trim());
    }

    generate(): void {
        if (existsSync(`./src/seeder/fakers/${this.className}Faker.ts`)) throw new Error('Seeder already existed');
        writeFileSync(
            `./src/seeder/fakers/${this.className}Faker.ts`,
            content.trim().replace(/<class_name>/g, this.className),
        );
    }
}
