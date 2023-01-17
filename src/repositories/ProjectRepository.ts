import { EntityRepository, Repository } from 'typeorm';
import { ProjectModel } from '../models/ProjectModel';

@EntityRepository(ProjectModel)
export class ProjectRepository extends Repository<ProjectModel> {
}