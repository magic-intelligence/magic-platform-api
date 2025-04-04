import { CreateNewAddressUseCase } from "src/core/address/application/use-cases/create.new.address.use.case";
import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { AddressRepository } from "src/core/address/domain/repositories/address.repository";

describe('Pruebas al create.new.address.use.case.ts', ()=>{
    let addressRepository: jest.Mocked<AddressRepository>;
    let createNewAddressUseCase: CreateNewAddressUseCase;

    beforeEach(()=>{
        addressRepository = {
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
        } as unknown as jest.Mocked<AddressRepository>

        createNewAddressUseCase = new CreateNewAddressUseCase(addressRepository);
    });

    test('debe registrar un address correctamente', async ()=>{
        const address: AddressEntity = {
            addressId: 5n,
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

        addressRepository.save.mockResolvedValue(address);

        const result = await createNewAddressUseCase.save({
            city: 'Ometepec', 
            district: 'Ometepec', 
            exteriorNumber: 'NA', 
            interiorNumber: '14', 
            postalCode: 41700, 
            state: 'Guerrero', 
            street: 'Juan Ruiz de Alarcon'
        });

        expect(result).toEqual(address);
    });

});