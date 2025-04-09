import { validate } from "class-validator";
import { CreateBranchOfficeDTO } from "src/adapters/branch-office/http/dtos/create.branch-office.dto";

describe('Preubas al DTO para crear branchs',()=>{
    test('Recibir datos correctos para crear un branch', async ()=>{
        const branchOfficeDTO = new CreateBranchOfficeDTO();
        branchOfficeDTO.addressId = 1234n;
        branchOfficeDTO.name = 'Sucursal Nueva'
        
        const result = await validate(branchOfficeDTO);

        expect(result.length).toBe(0);
    });

});