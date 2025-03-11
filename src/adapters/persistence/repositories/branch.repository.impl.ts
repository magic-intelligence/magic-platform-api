import { BranchEntity } from "src/core/branch/domain/entities/branch.entity";
import { BranchRepository } from "src/core/branch/domain/repository/branch.repository";
import { Repository } from "typeorm";
import { BranchSchema } from "../schemas";
import { InjectRepository } from "@nestjs/typeorm";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";
import { BranchMapper } from "../mappers/branch.mapper";

export class BranchRepositoryImpl implements BranchRepository {
    constructor(
        @InjectRepository(BranchSchema)
        private readonly branchRepository: Repository<BranchSchema>,
    ){}
    async save(entity: BranchEntity): Promise<BranchEntity> {
        try {
            const branchSchema = BranchMapper.toPersistence(entity);

            const result = await this.branchRepository.save(branchSchema);

            return BranchMapper.toDomain(result);
        } catch (error) {
            return handlerExceptionError(error);
        }
    }
    findAll(): Promise<BranchEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<BranchEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}