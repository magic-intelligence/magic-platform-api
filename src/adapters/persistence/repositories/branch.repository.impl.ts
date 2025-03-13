import { BranchEntity } from "src/core/branch/domain/entities/branch.entity";
import { BranchRepository } from "src/core/branch/domain/repository/branch.repository";
import { BranchSchema } from "../schemas";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";
import { BranchMapper } from "../mappers/branch.mapper";
import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BranchRepositoryImpl implements BranchRepository {
    constructor(
        // @InjectRepository(BranchSchema)
        // private readonly branchRepository: Repository<BranchSchema>,
        private readonly transactional: Transactional,
    ){}
    async save(entity: BranchEntity): Promise<BranchEntity> {
        try {
            const manager = this.transactional.getManager();
            const transactionRepository = manager.getRepository(BranchSchema);

            const branchSchema = BranchMapper.toPersistence(entity);

            const result = await transactionRepository.save(branchSchema);

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