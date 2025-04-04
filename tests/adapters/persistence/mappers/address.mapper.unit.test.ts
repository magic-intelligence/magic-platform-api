import { AddressMapper } from "src/adapters/persistence/mappers/address.mapper";
import { AddressSchema } from "src/adapters/persistence/schemas";
import { AddressEntity } from "src/core/address/domain/entities/address.entity";

describe('Pruebas al address.mapper.ts', ()=>{
    test('Convertir de AddressShema a AddressEntity',()=>{
        const addressSchema = new AddressSchema();
        addressSchema.addressId = 1n;
        addressSchema.city = 'Ometepec'; 
        addressSchema.district = 'Ometepec'; 
        addressSchema.exteriorNumber = 'NA'; 
        addressSchema.interiorNumber = '14'; 
        addressSchema.postalCode = 41700; 
        addressSchema.state = 'Guerrero'; 
        addressSchema.street = 'Juan Ruiz de Alarcon';
        addressSchema.isActive = true;
        addressSchema.createdAt = new Date('2025-03-12');
        addressSchema.updatedAt = new Date('2025-03-12');


        const branchEntity = AddressMapper.toDomain(addressSchema);

        expect(branchEntity).toEqual<AddressSchema>(addressSchema)
    });

    test('Convertir de AddressEntity a AddressSchema',()=>{
        const addressEntity = new AddressEntity();
        addressEntity.addressId = 1n;
        addressEntity.city = 'Ometepec'; 
        addressEntity.district = 'Ometepec'; 
        addressEntity.exteriorNumber = 'NA'; 
        addressEntity.interiorNumber = '14'; 
        addressEntity.postalCode = 41700; 
        addressEntity.state = 'Guerrero'; 
        addressEntity.street = 'Juan Ruiz de Alarcon';
        addressEntity.isActive = true;
        addressEntity.createdAt = new Date('2025-03-12');
        addressEntity.updatedAt = new Date('2025-03-12');


        const addressSchema = AddressMapper.toPersistence(addressEntity);

        expect(addressSchema).toEqual<AddressEntity>(addressEntity)
    });
});