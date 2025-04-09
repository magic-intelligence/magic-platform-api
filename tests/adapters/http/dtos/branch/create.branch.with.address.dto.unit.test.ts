import { validate } from "class-validator";
import { CreateBranchOfficeWithAddressDTO } from "src/adapters/branch-office/http/dtos/create.branch-office.with.address.dto";

describe('Pruebas al create.branch-office.with.address.dto.ts', ()=>{
    test('Debe validar que los datos sean correctos, vienen del request api', async ()=>{
        const newBranchOfficeDTO = new CreateBranchOfficeWithAddressDTO();
        newBranchOfficeDTO.name = 'Sucursal Ometepec'
        newBranchOfficeDTO.city = 'Ometepec'; 
        newBranchOfficeDTO.district = 'Ometepec'; 
        newBranchOfficeDTO.exteriorNumber = 'NA'; 
        newBranchOfficeDTO.interiorNumber = '14'; 
        newBranchOfficeDTO.postalCode = 41700; 
        newBranchOfficeDTO.state = 'Guerrero'; 
        newBranchOfficeDTO.street = 'Juan Ruiz de Alarcon';

        const result = await validate(newBranchOfficeDTO);
        expect(result.length).toBe(0);
    });
    test('Debe fallar por datos incorrectos y por falta de datos, vienen del request api', async ()=>{
        const newBranchOfficeDTO = new CreateBranchOfficeWithAddressDTO();
        // Para que haga falta
        // newBranchOfficeDTO.name = 'Sucursal Ometepec'
        newBranchOfficeDTO.city = 'Ometepec'; 
        newBranchOfficeDTO.district = 'Ometepec'; 
        newBranchOfficeDTO.exteriorNumber = 'NA'; 
        newBranchOfficeDTO.interiorNumber = '14'; 
        newBranchOfficeDTO.postalCode = NaN; 
        newBranchOfficeDTO.state = ''; 
        newBranchOfficeDTO.street = 'Juan Ruiz de Alarcon';

        const result = await validate(newBranchOfficeDTO);
        expect(result.length).toBe(3);
    });
});