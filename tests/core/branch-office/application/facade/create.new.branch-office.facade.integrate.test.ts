import { Test, TestingModule } from "@nestjs/testing";
import { CreateBranchOfficeWithAddressDTO } from "src/adapters/branch-office/http/dtos/create.branch-office.with.address.dto";
import { AddressService } from "src/core/address/application/services/address.service";
import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { CreateNewBranchOfficeFacade } from "src/core/branch-office/application/facade/create.new.branch-office.facade";
import { BranchOfficeService } from "src/core/branch-office/application/services/branch-office.service";
import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { TRANSACTION_PORT, TransactionPort } from "src/shared/ports/transaction.port";

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then
describe('Prueba de integración al create.new.branch.facade.ts', ()=>{
    // Given
    let createNewBranchFacade: CreateNewBranchOfficeFacade;
    let branchService: jest.Mocked<BranchOfficeService>;
    let addressService: jest.Mocked<AddressService>;
    let transaction: jest.Mocked<TransactionPort>;
    const dto: CreateBranchOfficeWithAddressDTO = {
        educationalCenterId: 1n,
        name: 'Sucursal Nueva',
        city: 'Ometepec', 
        district: 'Ometepec', 
        exteriorNumber: 'NA', 
        interiorNumber: '14', 
        postalCode: 41700, 
        state: 'Guerrero', 
        street: 'Juan Ruiz de Alarcon'
    }
    const addressEntity: AddressEntity = {
        addressId: 1n,
        city: 'Ometepec', 
        district: 'Ometepec', 
        exteriorNumber: 'NA', 
        interiorNumber: '14', 
        postalCode: 41700, 
        state: 'Guerrero', 
        street: 'Juan Ruiz de Alarcon',
        isActive: true,
        createdAt: new Date("2025-03-11T20:58:06.331Z"),
        updatedAt: new Date("2025-03-11T20:58:06.331Z"),
    }
    const branchEntity: BranchOfficeEntity = {
        branchOfficeId: 1n,
        educationalCenterId: 1n,
        addressId: 1n,
        name: 'Sucursal Nueva',
        isActive: true,
        createdAt: new Date("2025-03-11T20:58:06.331Z"),
        updatedAt: new Date("2025-03-11T20:58:06.331Z"),
    }

    // When
    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                CreateNewBranchOfficeFacade,
                {
                    provide: BranchOfficeService,
                    useValue: {
                        saveNewBranch: jest.fn()
                    }
                },
                {
                    provide: AddressService,
                    useValue: {
                        saveNewAddress: jest.fn()
                    }
                },
                {
                    provide: TRANSACTION_PORT,
                    useValue: {
                        run: jest.fn((cb)=> cb())
                    }
                }
            ]
        }).compile();

        createNewBranchFacade = module.get<CreateNewBranchOfficeFacade>(CreateNewBranchOfficeFacade);
        branchService = module.get(BranchOfficeService);
        addressService = module.get(AddressService);
        transaction = module.get(TRANSACTION_PORT);
    });

    // Then
    test('debe crear una sucursal con dirección en una transacción', async ()=>{

        // Given
        addressService.saveNewAddress.mockResolvedValue(addressEntity);
        branchService.saveNewBranch.mockResolvedValue(branchEntity);

        // When
        const result = await createNewBranchFacade.execute(dto);

        // Then
        expect(transaction.run).toHaveBeenCalled();
        expect(addressService.saveNewAddress).toHaveBeenCalledWith(expect.objectContaining({city: 'Ometepec'}));
        expect(branchService.saveNewBranch).toHaveBeenCalledWith({name: 'Sucursal Nueva',addressId: 1n, educationalCenterId: 1n});
        expect(result).toEqual({
            branchOfficeId: 1n,
            addressId: 1n,
            educationalCenterId: 1n,
            name: 'Sucursal Nueva',
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
        });
    });
});