import { validate } from "class-validator";
import { CreateAddressDTO } from "src/core/address/adapters/http/dtos/create.address.dto";

describe('Pruebas al create.address.dto.ts', ()=>{
    test('Debe ser correcta al recibir los datos', async ()=>{
        const addressDTO = new CreateAddressDTO();
        addressDTO.city = 'Ometepec'; 
        addressDTO.district = 'Ometepec'; 
        addressDTO.exteriorNumber = 'NA'; 
        addressDTO.interiorNumber = '14'; 
        addressDTO.postalCode = 41700; 
        addressDTO.state = 'Guerrero'; 
        addressDTO.street = 'Juan Ruiz de Alarcon';

        const result = await validate(addressDTO);

        expect(result.length).toBe(0);
    });
    test('Debe fallar por datos invalidos', async ()=>{
        const addressDTO = new CreateAddressDTO();
        addressDTO.city = ''; 
        addressDTO.district = 'Ometepec'; 
        addressDTO.exteriorNumber = 'NA'; 
        addressDTO.interiorNumber = ''; 
        addressDTO.postalCode = NaN; 
        addressDTO.state = 'Guerrero'; 
        addressDTO.street = 'Juan Ruiz de Alarcon';

        const result = await validate(addressDTO);

        expect(result.length).toBe(3);
    });
});