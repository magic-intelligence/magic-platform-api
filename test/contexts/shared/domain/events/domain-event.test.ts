import { DomainEvent } from "src/shared/domain/events/domain-events";

// Clase de prueba concreta que extiende DomainEvent
class TestDomainEvent extends DomainEvent {
  constructor(aggregateId: bigint, public readonly customProperty: string = 'test') {
    super(aggregateId);
    Object.freeze(this.eventId);
  }
}

describe('DomainEvent', () => {
  // Escenario 1: Creación exitosa de un evento de dominio
  describe('Dado que se crea una instancia de un DomainEvent concreto', () => {
    const aggregateId = BigInt(12345);
    let event: TestDomainEvent;
    let initialDate: Date;

    beforeAll(() => {
      initialDate = new Date();
      jest.useFakeTimers().setSystemTime(initialDate);
      event = new TestDomainEvent(aggregateId);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    describe('Cuando el evento es instanciado con un aggregateId', () => {
      it('Entonces debería inicializar occurredOn con la fecha y hora actuales', () => {
        expect(event.occurredOn).toEqual(initialDate);
      });

      it('Entonces debería inicializar aggregateId con el valor proporcionado', () => {
        expect(event.aggregateId).toBe(aggregateId);
      });

      it('Entonces debería inicializar eventId como un UUID válido', () => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        expect(event.eventId).toMatch(uuidRegex);
        expect(typeof event.eventId).toBe('string');
        expect(event.eventId.length).toBeGreaterThan(0);
      });

      it('Entonces cada instancia debería tener un eventId único', () => {
        const anotherEvent = new TestDomainEvent(BigInt(67890));
        expect(event.eventId).not.toBe(anotherEvent.eventId);
      });
    });
  });
});