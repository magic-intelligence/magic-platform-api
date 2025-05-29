import { EducationalCenterCreatedEvent } from "src/contexts/educational-center-management/educational-center/domain/events/educational-center-created.event";
import { DomainEvent } from "src/shared/domain/events/domain-events";

describe('EducationalCenterCreatedEvent', () => {
  const mockEducationalCenterId = 123n; // Usamos 'n' para bigint
  const mockEducationalCenterName = 'Test Educational Center';

  // Dado un EducationalCenterCreatedEvent
  describe('Dado un EducationalCenterCreatedEvent', () => {
    let event: EducationalCenterCreatedEvent;
    let initialOccurredOn: Date;
    let initialEventId: string;

    // Cuando se crea una nueva instancia del evento
    describe('Cuando se crea una nueva instancia del evento', () => {
      beforeAll(() => {
        // Mockear Date y crypto.randomUUID para resultados predecibles y evitar variaciones en las pruebas
        const fixedDate = new Date('2025-05-29T10:00:00.000Z');
        const fixedUuid = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';

        jest.spyOn(global, 'Date').mockImplementation(() => fixedDate as any);
        jest.spyOn(crypto, 'randomUUID').mockReturnValue(fixedUuid);

        event = new EducationalCenterCreatedEvent(
          mockEducationalCenterId,
          mockEducationalCenterName,
        );

        initialOccurredOn = event.occurredOn;
        initialEventId = event.eventId;
      });

      afterAll(() => {
        // Restaurar los mocks después de todas las pruebas en este bloque
        jest.restoreAllMocks();
      });

      // Entonces debería ser una instancia de DomainEvent
      it('Entonces debería ser una instancia de DomainEvent', () => {
        expect(event).toBeInstanceOf(DomainEvent);
      });


      // Entonces debería tener el nombre del centro educativo correcto
      it('Entonces debería tener el nombre del centro educativo correcto', () => {
        expect(event.name).toBe(mockEducationalCenterName);
      });

      // Entonces debería tener un ID de evento definido
      it('Entonces debería tener un ID de evento definido', () => {
        expect(event.eventId).toBeDefined();
        expect(typeof event.eventId).toBe('string');
        expect(event.eventId).toBe('a1b2c3d4-e5f6-7890-1234-567890abcdef'); // Verifica el UUID mockeado
      });

    });
  });
});