import { validate } from "class-validator";
import { CreateBranchWithAddressDTO } from "src/adapters/http/dtos/branch/create.branch.with.address.dto";

describe('Pruebas al create.branch.with.address.dto.ts', ()=>{
    test('Debe validar que los datos sean correctos, vienen del request api', async ()=>{
        const newBranchDTO = new CreateBranchWithAddressDTO();
        newBranchDTO.name = 'Sucursal Ometepec'
        newBranchDTO.city = 'Ometepec'; 
        newBranchDTO.district = 'Ometepec'; 
        newBranchDTO.exteriorNumber = 'NA'; 
        newBranchDTO.interiorNumber = '14'; 
        newBranchDTO.postalCode = 41700; 
        newBranchDTO.state = 'Guerrero'; 
        newBranchDTO.street = 'Juan Ruiz de Alarcon';

        const result = await validate(newBranchDTO);
        expect(result.length).toBe(0);
    });
    test('Debe fallar por datos incorrectos y por falta de datos, vienen del request api', async ()=>{
        const newBranchDTO = new CreateBranchWithAddressDTO();
        // Para que haga falta
        // newBranchDTO.name = 'Sucursal Ometepec'
        newBranchDTO.city = 'Ometepec'; 
        newBranchDTO.district = 'Ometepec'; 
        newBranchDTO.exteriorNumber = 'NA'; 
        newBranchDTO.interiorNumber = '14'; 
        newBranchDTO.postalCode = NaN; 
        newBranchDTO.state = ''; 
        newBranchDTO.street = 'Juan Ruiz de Alarcon';

        const result = await validate(newBranchDTO);
        expect(result.length).toBe(3);
    });
});