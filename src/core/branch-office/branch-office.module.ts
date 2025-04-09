import { Module } from "@nestjs/common";
import { BRANCH_OFFICE_REPOSITORY } from "./domain/repository/branch-office.repository";
import { BranchOfficeRepositoryImpl } from "src/adapters/branch-office/persistence/repositories/branch-office.repository.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchOfficeController } from "src/adapters/branch-office/http/controllers/branch-office.controller";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";
import { AddressModule } from "../address/address.module";
import { CreateNewBranchOfficeFacade } from "./application/facade/create.new.branch-office.facade";
import { BranchOfficeService } from "./application/services/branch-office.service";
import { CreateNewBranchOfficeUseCase } from "./application/use-cases/create.new.branch-office.use.case";
import { BranchOfficeSchema } from "src/adapters/branch-office/persistence/schemas/branch-office.schema";

@Module({
    imports:[
        TypeOrmModule.forFeature([BranchOfficeSchema]),
        TransactionModule,
        AddressModule,
    ],
    providers:[
        {
            provide: BRANCH_OFFICE_REPOSITORY,
            useClass: BranchOfficeRepositoryImpl
        },
        CreateNewBranchOfficeFacade,
        CreateNewBranchOfficeUseCase,
        BranchOfficeService,
    ],
    exports:[
        BRANCH_OFFICE_REPOSITORY
    ],
    controllers:[BranchOfficeController]
})
export class BranchOfficeModule{}