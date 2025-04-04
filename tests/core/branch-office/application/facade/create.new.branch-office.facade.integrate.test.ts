import { Test, TestingModule } from "@nestjs/testing";
import { CreateBranchOfficeWithAddressDTO } from "src/adapters/http/dtos/branch-office/create.branch-office.with.address.dto";
import { AddressService } from "src/core/address/application/services/address.service";
import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { CreateNewBranchOfficeFacade } from "src/core/branch-office/application/facade/create.new.branch-office.facade";
import { BranchOfficeService } from "src/core/branch-office/application/services/branch-office.service";
import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { TRANSACTION_PORT, TransactionPort } from "src/shared/ports/transaction.port";

describe('Prueba de integración al create.new.branch.facade.ts', ()=>{
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

    test('debe crear una sucursal con dirección en una transacción', async ()=>{

        addressService.saveNewAddress.mockResolvedValue(addressEntity);

        branchService.saveNewBranch.mockResolvedValue(branchEntity);

        const result = await createNewBranchFacade.execute(dto);
        console.log(result);

        expect(transaction.run).toHaveBeenCalled();
        //Aseguramos de que venga el city en el dto
        expect(addressService.saveNewAddress).toHaveBeenCalledWith(expect.objectContaining({city: 'Ometepec'}));
        expect(branchService.saveNewBranch).toHaveBeenCalledWith({name: 'Sucursal Nueva',addressId: '1'});
        expect(result).toEqual({
            branchId: 1n,
            addressId: 1n,
            name: 'Sucursal Nueva',
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
        });
    });

    test('Debe fallar si no se puede guarda la barnch o dirección', async ()=>{
        addressService.saveNewAddress.mockResolvedValue(addressEntity);
        branchService.saveNewBranch.mockRejectedValue(new Error('Ya existe una branch con ese nombre'));
        
        await expect(createNewBranchFacade.execute(dto))
            .rejects.toThrow('Ya existe una branch con ese nombre')
    });
});