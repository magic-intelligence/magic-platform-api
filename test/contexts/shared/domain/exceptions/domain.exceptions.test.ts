import { DomainException } from "src/shared/domain/exceptions/domain.exceptions";

// Creamos una clase de prueba que extiende DomainException para poder instanciarla
class TestDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}

describe('DomainException', () => {
  let exception: TestDomainException;
  const errorMessage = 'Este es un mensaje de excepción de dominio de prueba.';

  // Dado una implementación concreta de DomainException
  describe('Dado una implementación concreta de DomainException', () => {
    // Escenario 1: Creación básica y propiedades

    // Cuando se crea una nueva instancia
    describe('Cuando se crea una nueva instancia', () => {
      beforeEach(() => {
        exception = new TestDomainException(errorMessage);
      });

      // Entonces debería ser una instancia de Error
      it('Entonces debería ser una instancia de Error', () => {
        expect(exception).toBeInstanceOf(Error);
      });

      // Entonces debería ser una instancia de DomainException
      it('Entonces debería ser una instancia de DomainException', () => {
        expect(exception).toBeInstanceOf(DomainException);
      });

      // Entonces debería tener el mensaje correcto
      it('Entonces debería tener el mensaje correcto', () => {
        expect(exception.message).toBe(errorMessage);
      });

      // Entonces su propiedad de nombre debería ser el nombre de la clase
      it('Entonces su propiedad de nombre debería ser el nombre de la clase', () => {
        expect(exception.name).toBe('TestDomainException');
      });
    });

    // Escenario 2: Verificación del stack trace con una cadena de llamadas

    // Cuando la excepción es lanzada desde dentro de una función
    describe('Cuando la excepción es lanzada desde dentro de una función', () => {
      const throwTestException = () => {
        throw new TestDomainException(errorMessage);
      };

      // Entonces el stack trace debería incluir la función que la llamó
      it('Entonces el stack trace debería incluir la función que la llamó', () => {
        try {
          throwTestException();
        } catch (e) {
          const caughtException = e as TestDomainException;
          expect(caughtException.stack).toBeDefined();
          expect(caughtException.stack).toContain('throwTestException');
        }
      });
    });
  });
});