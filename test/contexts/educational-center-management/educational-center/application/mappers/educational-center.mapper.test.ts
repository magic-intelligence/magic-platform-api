import { EducationalCenterResponseDto } from "src/contexts/educational-center-management/educational-center/application/dtos/educational-center-response.dto";
import { EducationalCenterMapper } from "src/contexts/educational-center-management/educational-center/application/mappers/educational-center.mapper";
import { EducationalCenterEntity } from "src/contexts/educational-center-management/educational-center/domain/entities/educational-center.entity";
import { Name } from "src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo";

describe('EducationalCenterMapper', () => {
  // Datos de prueba para la entidad
  const mockEntityId = 1234567890123456789n; // BigInt de ejemplo
  const mockEntityNameValue = 'Centro Educativo Modelo';
  const mockEntityCreatedAt = new Date('2023-01-01T10:00:00.000Z');
  const mockEntityUpdatedAt = new Date('2023-06-15T14:30:00.000Z');
  const mockEntityDeletedAt = null;

  let mockEducationalCenterEntity: EducationalCenterEntity;

  beforeEach(() => {
    // Creamos la instancia del Value Object Name real
    const nameVo = Name.create(mockEntityNameValue);

    // Usamos el método `reconstitute` de la entidad para hidratarla
    // El mapper recibe una entidad ya existente, no la crea.
    mockEducationalCenterEntity = EducationalCenterEntity.reconstitute(
      mockEntityId,
      nameVo,
      mockEntityCreatedAt,
      mockEntityUpdatedAt,
      mockEntityDeletedAt,
    );
  });

  // Dado un EducationalCenterMapper
  describe('Dado un EducationalCenterMapper', () => {
    // Cuando se llama al método toResponseDto con una entidad válida
    describe('Cuando se llama al método toResponseDto con una entidad válida', () => {
      let resultDto: EducationalCenterResponseDto;

      beforeEach(() => {
        resultDto = EducationalCenterMapper.toResponseDto(mockEducationalCenterEntity);
      });

      // Entonces debería retornar una instancia de EducationalCenterResponseDto
      it('Entonces debería retornar una instancia de EducationalCenterResponseDto', () => {
        expect(resultDto).toBeInstanceOf(EducationalCenterResponseDto);
      });

      // Entonces debería mapear correctamente el ID de BigInt a String
      it('Entonces debería mapear correctamente el ID de BigInt a String', () => {
        expect(resultDto.educationalCenterId).toBe(mockEntityId.toString());
        expect(typeof resultDto.educationalCenterId).toBe('string');
      });

      // Entonces debería mapear correctamente el valor del nombre del Value Object
      it('Entonces debería mapear correctamente el valor del nombre del Value Object', () => {
        expect(resultDto.name).toBe(mockEntityNameValue);
      });

      // Entonces debería mapear correctamente la fecha de creación
      it('Entonces debería mapear correctamente la fecha de creación', () => {
        expect(resultDto.createdAt).toBe(mockEntityCreatedAt);
      });

      // Entonces debería mapear correctamente la fecha de actualización
      it('Entonces debería mapear correctamente la fecha de actualización', () => {
        expect(resultDto.updatedAt).toBe(mockEntityUpdatedAt);
      });

      // Entonces debería mapear correctamente la fecha de borrado lógico
      it('Entonces debería mapear correctamente la fecha de borrado lógico', () => {
        expect(resultDto.deletedAt).toBe(mockEntityDeletedAt);
      });

      // Cuando la entidad tiene deletedAt con valor
      describe('Cuando la entidad tiene deletedAt con un valor de fecha', () => {
        const entityWithDeletedAt = EducationalCenterEntity.reconstitute(
          mockEntityId,
          Name.create(mockEntityNameValue),
          mockEntityCreatedAt,
          mockEntityUpdatedAt,
          new Date('2024-01-20T08:00:00.000Z'),
        );
        let resultDtoWithDeletedAt: EducationalCenterResponseDto;

        beforeEach(() => {
          resultDtoWithDeletedAt = EducationalCenterMapper.toResponseDto(entityWithDeletedAt);
        });

        it('Entonces debería mapear correctamente la fecha de borrado lógico cuando está presente', () => {
          expect(resultDtoWithDeletedAt.deletedAt).toBe(entityWithDeletedAt.deletedAt);
        });
      });
    });
  });
});