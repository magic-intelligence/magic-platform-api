import { CreateAddressDTO } from "src/adapters/http/dtos/address/create.address.dto";
import { AddressService } from "src/core/address/application/services/address.service";
import { CreateNewAddressUseCase } from "src/core/address/application/use-cases/create.new.address.use.case";
import { AddressEntity } from "src/core/address/domain/entities/address.entity";

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then
describe('Pruebas al address.service.ts', ()=>{
    // Given
    let addressService: AddressService;
    let createNewAddressUseCase: jest.Mocked<CreateNewAddressUseCase>;

    // When
    beforeEach(()=>{
        // Mock del caso de uso
        createNewAddressUseCase = {
            save: jest.fn(),
        } as unknown as jest.Mocked<CreateNewAddressUseCase>;

        // Instancia de AddressService con el mock inyecto
        addressService = new AddressService(createNewAddressUseCase);

    });

    // Then
    test('Debe llamar a crearteNewAddressUseCase.save() con los datos correctos', async ()=>{
        // Given: Dado que
        const dto: CreateAddressDTO = {
            city: 'Ometepec', 
            district: 'Ometepec', 
            exteriorNumber: 'NA', 
            interiorNumber: '14', 
            postalCode: 41700, 
            state: 'Guerrero', 
            street: 'Juan Ruiz de Alarcon'
        }
        const expextecResponse: AddressEntity = {
            ...dto,
            addressId: 5n,
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
        }
        createNewAddressUseCase.save.mockResolvedValue(expextecResponse);

        // When: Cuando
        const result = await addressService.saveNewAddress(dto);

        // Then: Entonces
        // Verificar que se haya llamado al caso de uso con los datos correctos
        expect(createNewAddressUseCase.save).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expextecResponse);
    });
});