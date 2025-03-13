import { validate } from "class-validator";
import { CreateBranchDTO } from "src/adapters/http/dtos/branch/create.branch.dto";

describe('Preubas al DTO para crear branchs',()=>{
    test('Recibir datos correctos para crear un branch', async ()=>{
        const branchDTO = new CreateBranchDTO();
        branchDTO.addressId = '1234';
        branchDTO.name = 'Sucursal Nueva'
        
        const result = await validate(branchDTO);

        expect(result.length).toBe(0);
    });

    test('Falla la prueba, addressId el tipo es incorrecto', async ()=>{
        const branchDTO = new CreateBranchDTO();
        branchDTO.addressId = 'ede33';
        branchDTO.name = 'Sucursal Nueva'
        
        const result = await validate(branchDTO);

        expect(result.length).toBe(1);
    });

    test('Falla la prueba, ambos datos son incorrectos', async ()=>{
        const branchDTO = new CreateBranchDTO();
        branchDTO.addressId = 'ede33';
        branchDTO.name = '';
        
        const result = await validate(branchDTO);

        expect(result.length).toBe(2);
    });
});