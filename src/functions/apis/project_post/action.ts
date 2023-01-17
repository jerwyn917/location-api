import { Connection } from 'typeorm';
import { ProjectPostRequest } from './requests';
import { ProjectRepository } from '../../../repositories/ProjectRepository';

interface ProjectData {
    project_id: string;
    name: string;
    created_at: string;
}

export class ProjectPostAction {
    private connection: Connection;
    private projectRepository: ProjectRepository;

    constructor(connection: Connection) {
        this.connection = connection;
        this.projectRepository = this.connection.getCustomRepository(ProjectRepository);
    }

    async execute(request: ProjectPostRequest): Promise<ProjectData> {
        const project = await this.projectRepository
            .create({
                name: request.name,
                description: request.description,
            })
            .save();

        return {
            project_id: project.project_id,
            name: project.name,
            created_at: project.created_at,
        };
    }
}
