import { InvalidNameException } from "src/contexts/educational-center-management/educational-center/domain/exceptions/invalid-name.exception";
import { DomainException } from "src/shared/domain/exceptions/domain.exceptions";

describe('InvalidNameException', () => {
  const errorMessage = 'El nombre proporcionado no es válido. Debe tener entre 3 y 100 caracteres.';

  // Dado una InvalidNameException
  describe('Dado una InvalidNameException', () => {
    let exception: InvalidNameException;

    // Cuando se crea una nueva instancia de la excepción
    describe('Cuando se crea una nueva instancia de la excepción', () => {
      beforeEach(() => {
        exception = new InvalidNameException(errorMessage);
      });

      // Entonces debería ser una instancia de DomainException
      it('Entonces debería ser una instancia de DomainException', () => {
        expect(exception).toBeInstanceOf(DomainException);
      });

      // Entonces debería ser una instancia de Error
      it('Entonces debería ser una instancia de Error', () => {
        expect(exception).toBeInstanceOf(Error);
      });

      // Entonces debería tener el mensaje correcto
      it('Entonces debería tener el mensaje correcto', () => {
        expect(exception.message).toBe(errorMessage);
      });

      // Entonces su propiedad de nombre debería ser 'InvalidNameException'
      it("Entonces su propiedad de nombre debería ser 'InvalidNameException'", () => {
        expect(exception.name).toBe('InvalidNameException');
      });

      // Entonces debería capturar el stack trace
      it('Entonces debería capturar el stack trace', () => {
        expect(exception.stack).toBeDefined();
        expect(exception.stack).toContain('InvalidNameException');
        // Aseguramos que el stack trace no incluya el constructor de la clase base DomainException en la cima,
        // sino el de la clase concreta.
        expect(exception.stack).not.toContain('DomainException');
      });
    });

    // Cuando la excepción es lanzada desde una función
    describe('Cuando la excepción es lanzada desde una función', () => {
      const throwInvalidNameException = (msg: string) => {
        throw new InvalidNameException(msg);
      };

      // Entonces el stack trace debería incluir la función que la lanzó
      it('Entonces el stack trace debería incluir la función que la lanzó', () => {
        try {
          throwInvalidNameException(errorMessage);
        } catch (e) {
          const caughtException = e as InvalidNameException;
          expect(caughtException.stack).toBeDefined();
          expect(caughtException.stack).toContain('throwInvalidNameException');
        }
      });
    });
  });
});