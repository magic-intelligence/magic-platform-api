import { Module } from "@nestjs/common";
import { BRANCH_REPOSITORY } from "./domain/repository/branch.repository";
import { BranchRepositoryImpl } from "src/adapters/persistence/repositories/branch.repository.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchSchema } from "src/adapters/persistence/schemas";
import { BranchController } from "src/adapters/http/controllers/branch.controller";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";
import { AddressModule } from "../address/address.module";
import { CreateNewBranchFacade } from "./application/facade/create.new.branch.facade";
import { BranchService } from "./application/services/branch.service";
import { CreateNewBranchUseCase } from "./application/use-cases/create.new.branch.use.case";

@Module({
    imports:[
        TypeOrmModule.forFeature([BranchSchema]),
        TransactionModule,
        AddressModule,
    ],
    providers:[
        {
            provide: BRANCH_REPOSITORY,
            useClass: BranchRepositoryImpl
        },
        CreateNewBranchFacade,
        CreateNewBranchUseCase,
        BranchService,
    ],
    exports:[
        BRANCH_REPOSITORY
    ],
    controllers:[BranchController]
})
export class BranchModule{}