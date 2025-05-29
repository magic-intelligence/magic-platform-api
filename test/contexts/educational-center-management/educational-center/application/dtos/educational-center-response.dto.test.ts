import { EducationalCenterResponseDto } from "src/contexts/educational-center-management/educational-center/application/dtos/educational-center-response.dto";

describe('EducationalCenterResponseDto', () => {
  const mockId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
  const mockName = 'Mi Centro Educativo Responde';
  const mockCreatedAt = new Date('2024-01-15T10:00:00.000Z');
  const mockUpdatedAt = new Date('2024-01-15T11:30:00.000Z');
  const mockDeletedAt = null;

  // Dado un EducationalCenterResponseDto
  describe('Dado un EducationalCenterResponseDto', () => {
    let dto: EducationalCenterResponseDto;

    // Cuando se crea una nueva instancia del DTO
    describe('Cuando se crea una nueva instancia del DTO', () => {
      beforeEach(() => {
        dto = new EducationalCenterResponseDto(
          mockId,
          mockName,
          mockCreatedAt,
          mockUpdatedAt,
          mockDeletedAt,
        );
      });

      // Entonces debería tener todas las propiedades correctamente asignadas
      it('Entonces debería tener la propiedad "id" correctamente asignada', () => {
        expect(dto.id).toBe(mockId);
      });

      it('Entonces debería tener la propiedad "name" correctamente asignada', () => {
        expect(dto.name).toBe(mockName);
      });

      it('Entonces debería tener la propiedad "createdAt" correctamente asignada', () => {
        expect(dto.createdAt).toBe(mockCreatedAt);
      });

      it('Entonces debería tener la propiedad "updatedAt" correctamente asignada', () => {
        expect(dto.updatedAt).toBe(mockUpdatedAt);
      });

      it('Entonces debería tener la propiedad "deletedAt" correctamente asignada (si es nula o una fecha)', () => {
        expect(dto.deletedAt).toBe(mockDeletedAt); // Debe ser null en este caso
      });

      // Cuando la propiedad deletedAt es una fecha
      describe('Cuando la propiedad deletedAt es una fecha', () => {
        let dtoWithDeletedAt: EducationalCenterResponseDto;
        const actualDeletedAt = new Date('2024-02-20T14:00:00.000Z');

        beforeEach(() => {
          dtoWithDeletedAt = new EducationalCenterResponseDto(
            mockId,
            mockName,
            mockCreatedAt,
            mockUpdatedAt,
            actualDeletedAt,
          );
        });

        it('Entonces debería tener la propiedad "deletedAt" correctamente asignada a la fecha', () => {
          expect(dtoWithDeletedAt.deletedAt).toBe(actualDeletedAt);
        });
      });

      // Entonces todas sus propiedades deberían ser de solo lectura
      it('Entonces todas sus propiedades deberían ser de solo lectura', () => {
        const attemptModificationId = () => {
          // @ts-ignore
          dto.id = 'new-id';
        };
        const attemptModificationName = () => {
          // @ts-ignore
          dto.name = 'New Name';
        };
        const attemptModificationCreatedAt = () => {
          // @ts-ignore
          dto.createdAt = new Date();
        };
        const attemptModificationUpdatedAt = () => {
          // @ts-ignore
          dto.updatedAt = new Date();
        };
        const attemptModificationDeletedAt = () => {
          // @ts-ignore
          dto.deletedAt = new Date();
        };

        // Verificamos que intentar modificar no lance un error (debido a `readonly` no `Object.freeze`)
        expect(attemptModificationId).toThrow();
        expect(attemptModificationName).toThrow();
        expect(attemptModificationCreatedAt).toThrow();
        expect(attemptModificationUpdatedAt).toThrow();
        expect(attemptModificationDeletedAt).toThrow();

        // Pero los valores originales deben permanecer inalterados
        expect(dto.id).toBe(mockId);
        expect(dto.name).toBe(mockName);
        expect(dto.createdAt).toBe(mockCreatedAt);
        expect(dto.updatedAt).toBe(mockUpdatedAt);
        expect(dto.deletedAt).toBe(mockDeletedAt);
      });
    });
  });
});