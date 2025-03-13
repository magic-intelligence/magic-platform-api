import { Test, TestingModule } from "@nestjs/testing";
import { CreateBranchWithAddressDTO } from "src/adapters/http/dtos/branch/create.branch.with.address.dto";
import { AddressService } from "src/core/address/application/services/address.service";
import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { CreateNewBranchFacade } from "src/core/branch/application/facade/create.new.branch.facade";
import { BranchService } from "src/core/branch/application/services/branch.service";
import { BranchEntity } from "src/core/branch/domain/entities/branch.entity";
import { TRANSACTION_PORT, TransactionPort } from "src/shared/ports/transaction.port";

describe('Prueba de integración al create.new.branch.facade.ts', ()=>{
    let createNewBranchFacade: CreateNewBranchFacade;
    let branchService: jest.Mocked<BranchService>;
    let addressService: jest.Mocked<AddressService>;
    let transaction: jest.Mocked<TransactionPort>;

    const dto: CreateBranchWithAddressDTO = {
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
        addressId: '1',
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

    const branchEntity: BranchEntity = {
        branchId: '1',
        addressId: '1',
        name: 'Sucursal Nueva',
        isActive: true,
        createdAt: new Date("2025-03-11T20:58:06.331Z"),
        updatedAt: new Date("2025-03-11T20:58:06.331Z"),
    }

    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                CreateNewBranchFacade,
                {
                    provide: BranchService,
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

        createNewBranchFacade = module.get<CreateNewBranchFacade>(CreateNewBranchFacade);
        branchService = module.get(BranchService);
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
            branchId: '1',
            addressId: '1',
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