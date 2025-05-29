import { RegisterEducationalCenterDto } from "src/contexts/educational-center-management/educational-center/application/dtos/register-educational-center.dto";

describe('RegisterEducationalCenterDto', () => {
  const mockName = 'Colegio ABC';

  // Dado un RegisterEducationalCenterDto
  describe('Dado un RegisterEducationalCenterDto', () => {
    let dto: RegisterEducationalCenterDto;

    // Cuando se crea una nueva instancia del DTO
    describe('Cuando se crea una nueva instancia del DTO', () => {
      beforeEach(() => {
        dto = new RegisterEducationalCenterDto(mockName);
      });

      // Entonces debería tener la propiedad 'name' correctamente asignada
      it("Entonces debería tener la propiedad 'name' correctamente asignada", () => {
        expect(dto.name).toBe(mockName);
      });

      // Entonces sus propiedades deberían ser de solo lectura
      it('Entonces sus propiedades deberían ser de solo lectura', () => {
        const attemptModification = () => {
          // @ts-ignore: Intentar modificar una propiedad readonly para la prueba
          dto.name = 'Nuevo Nombre';
        };

        // En TypeScript, `readonly` previene la asignación en tiempo de compilación.
        // En tiempo de ejecución, si no se usa `Object.freeze`, la asignación podría ser ignorada
        // o fallar si el objeto está congelado. Para un DTO, basta con la protección de `readonly`.
        // Esta prueba solo verifica que la asignación no altere el valor original si fuera posible.
        // Un DTO generalmente no usa Object.freeze porque se espera que sea un objeto simple.
        expect(attemptModification).toThrow(); // Esperamos un TypeError por quere reasignar el valor a la propiedad
        expect(dto.name).toBe(mockName); // El valor debería permanecer el original debido a `readonly`
      });
    });
  });
});