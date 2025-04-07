import { CreateNewAddressUseCase } from "src/core/address/application/use-cases/create.new.address.use.case";
import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { AddressRepository } from "src/core/address/domain/repositories/address.repository";

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then

describe('Pruebas al create.new.address.use.case.ts', ()=>{
    // Given
    let addressRepository: jest.Mocked<AddressRepository>;
    let createNewAddressUseCase: CreateNewAddressUseCase;

    // When
    beforeEach(()=>{
        addressRepository = {
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
        } as unknown as jest.Mocked<AddressRepository>

        createNewAddressUseCase = new CreateNewAddressUseCase(addressRepository);
    });

    // Then
    test('debe registrar un address correctamente', async ()=>{
        // Given
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

        // When
        const result = await createNewAddressUseCase.save({
            city: 'Ometepec', 
            district: 'Ometepec', 
            exteriorNumber: 'NA', 
            interiorNumber: '14', 
            postalCode: 41700, 
            state: 'Guerrero', 
            street: 'Juan Ruiz de Alarcon'
        });

        // Then
        expect(result).toEqual(address);
    });

});