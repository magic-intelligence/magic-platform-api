import { EducationalCenterEntity } from "src/contexts/educational-center-management/educational-center/domain/entities/educational-center.entity";
import { EducationalCenterCreatedEvent } from "src/contexts/educational-center-management/educational-center/domain/events/educational-center-created.event";
import { Name } from "src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo";

describe('Pruebas unitarias a la entidad de dominio Educational Center, educational-center.entity.ts', ()=>{
    const id = BigInt(1);
    const name = 'Centro Educativo de Prueba';
    const nameVO = Name.create(name);

    test('Debe crear una instancia de EducationalCenterEntity.', () => {
      // Given
      let entity: EducationalCenterEntity;

      // When
      entity = EducationalCenterEntity.create(id, nameVO);

      // Then
      expect(entity.educationalCenterId).toBe(id);
      expect(entity.name).toEqual(nameVO);
      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.updatedAt).toBeNull();
      expect(entity.deletedAt).toBeNull();
    });
});