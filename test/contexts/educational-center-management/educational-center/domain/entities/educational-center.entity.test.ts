// Mock de DomainEvent si necesitas controlar su comportamiento en pruebas específicas

import { EducationalCenterEntity } from "src/contexts/educational-center-management/educational-center/domain/entities/educational-center.entity";
import { EducationalCenterCreatedEvent } from "src/contexts/educational-center-management/educational-center/domain/events/educational-center-created.event";
import { Name } from "src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo";
import { DomainEvent } from "src/shared/domain/events/domain-events";

describe('EducationalCenterEntity (Entidad Agregado Raíz)', () => {
  let mockDate: Date;

  beforeAll(() => {
    // Congelamos el tiempo para pruebas con fechas deterministas
    mockDate = new Date('2023-01-15T10:00:00.000Z');
    jest.useFakeTimers().setSystemTime(mockDate);
  });

  afterAll(() => {
    // Restauramos los temporizadores después de todas las pruebas
    jest.useRealTimers();
  });

  // Escenario 1: Creación de un nuevo Centro Educativo a través del método de fábrica 'create'
  describe('Dado un ID y un Nombre válidos para un nuevo centro educativo', () => {
    const educationalCenterId = BigInt(1);
    const nameValue = 'Mi Nueva Universidad';
    const nameVO = Name.create(nameValue);

    describe('Cuando se invoca el método estático "create"', () => {
      let educationalCenter: EducationalCenterEntity;

      beforeEach(() => {
        educationalCenter = EducationalCenterEntity.create(educationalCenterId, nameVO);
      });

      it('Entonces debería retornar una nueva instancia de EducationalCenterEntity', () => {
        expect(educationalCenter).toBeInstanceOf(EducationalCenterEntity);
      });

      it('Entonces las propiedades deberían inicializarse correctamente', () => {
        expect(educationalCenter.educationalCenterId).toBe(educationalCenterId);
        expect(educationalCenter.name).toEqual(nameVO);
        expect(educationalCenter.createdAt).toEqual(mockDate);
        expect(educationalCenter.updatedAt).toBeNull();
        expect(educationalCenter.deletedAt).toBeNull();
      });

      it('Entonces debería registrar un EducationalCenterCreatedEvent', () => {
        const events = educationalCenter.getAndClearEvents();
        expect(events.length).toBe(1);
        const createdEvent = events[0] as EducationalCenterCreatedEvent;
        expect(createdEvent).toBeInstanceOf(EducationalCenterCreatedEvent);
        expect(createdEvent.aggregateId).toBe(educationalCenterId);
        expect(createdEvent.name).toBe(nameValue);
        expect(createdEvent.occurredOn).toEqual(mockDate);
        expect(createdEvent.eventId).toBeDefined(); // UUID generado
      });

      it('Entonces la lista de eventos debería quedar vacía después de obtenerlos', () => {
        educationalCenter.getAndClearEvents(); // Se obtienen y se limpian
        expect(educationalCenter.getAndClearEvents().length).toBe(0);
      });
    });
  });

  // Escenario 2: Reconstitución de un Centro Educativo desde la persistencia
  describe('Dado un conjunto de datos persistidos de un centro educativo', () => {
    const educationalCenterId = BigInt(2);
    const nameValue = 'Centro Reconstituido';
    const nameVO = Name.create(nameValue);
    const createdAt = new Date('2022-01-01T00:00:00.000Z');
    const updatedAt = new Date('2022-06-01T00:00:00.000Z');
    const deletedAt = null;

    describe('Cuando se invoca el método estático "reconstitute"', () => {
      let educationalCenter: EducationalCenterEntity;

      beforeEach(() => {
        educationalCenter = EducationalCenterEntity.reconstitute(
          educationalCenterId,
          nameVO,
          createdAt,
          updatedAt,
          deletedAt,
        );
      });

      it('Entonces debería retornar una instancia de EducationalCenterEntity con los datos proporcionados', () => {
        expect(educationalCenter).toBeInstanceOf(EducationalCenterEntity);
        expect(educationalCenter.educationalCenterId).toBe(educationalCenterId);
        expect(educationalCenter.name).toEqual(nameVO);
        expect(educationalCenter.createdAt).toEqual(createdAt);
        expect(educationalCenter.updatedAt).toEqual(updatedAt);
        expect(educationalCenter.deletedAt).toBeNull();
      });

      it('Entonces NO debería registrar ningún evento de dominio', () => {
        const events = educationalCenter.getAndClearEvents();
        expect(events.length).toBe(0);
      });
    });
  });

  // Escenario 3: Actualización del nombre del Centro Educativo
  describe('Dado una instancia existente de EducationalCenterEntity', () => {
    const initialId = BigInt(3);
    const initialName = Name.create('Nombre Inicial');
    let educationalCenter: EducationalCenterEntity;
    let newName: Name;

    beforeEach(() => {
      // Usamos una nueva fecha para cada beforeEach para que _updatedAt sea consistente
      jest.setSystemTime(mockDate);
      educationalCenter = EducationalCenterEntity.create(initialId, initialName);
      educationalCenter.getAndClearEvents(); // Limpiamos el evento de creación
      newName = Name.create('Nuevo Nombre Actualizado');
      jest.setSystemTime(new Date(mockDate.getTime() + 10000)); // Avanzamos el tiempo para la actualización
    });

    describe('Cuando se invoca el método "updateName" con un nombre diferente', () => {
      beforeEach(() => {
        educationalCenter.updateName(newName);
      });

      it('Entonces el nombre de la entidad debería actualizarse', () => {
        expect(educationalCenter.name).toEqual(newName);
      });

      it('Entonces la fecha de actualización (updatedAt) debería ser la actual', () => {
        expect(educationalCenter.updatedAt).toEqual(new Date(mockDate.getTime() + 10000));
      });

      it('Entonces debería registrar un EducationalCenterCreatedEvent (o el evento de actualización adecuado)', () => {
        // Nota: En tu implementación actual, updateName registra EducationalCenterCreatedEvent.
        // Si tienes un EducationalCenterNameUpdatedEvent, sería más preciso.
        const events = educationalCenter.getAndClearEvents();
        expect(events.length).toBe(1);
        const updatedEvent = events[0] as EducationalCenterCreatedEvent;
        expect(updatedEvent).toBeInstanceOf(EducationalCenterCreatedEvent);
        expect(updatedEvent.aggregateId).toBe(initialId);
        expect(updatedEvent.name).toBe(newName.value); // El nuevo nombre
        expect(updatedEvent.occurredOn).toEqual(new Date(mockDate.getTime() + 10000));
      });
    });

    describe('Cuando se invoca el método "updateName" con el mismo nombre existente', () => {
      beforeEach(() => {
        jest.setSystemTime(new Date(mockDate.getTime() + 10000)); // Avanzamos el tiempo
        educationalCenter.updateName(initialName); // Intentamos actualizar con el mismo nombre
      });

      it('Entonces el nombre de la entidad NO debería cambiar', () => {
        expect(educationalCenter.name).toEqual(initialName);
      });

      it('Entonces la fecha de actualización (updatedAt) NO debería cambiar', () => {
        // En este caso, createdAt y updatedAt serían iguales si no hubo un evento inicial.
        // Asumo que ya lo limpiamos antes de esta prueba.
        expect(educationalCenter.updatedAt).toBeNull(); // Porque no hubo un cambio efectivo
      });

      it('Entonces NO debería registrar ningún evento de dominio', () => {
        const events = educationalCenter.getAndClearEvents();
        expect(events.length).toBe(0);
      });
    });
  });

  // Escenario 4: Borrado lógico (softDelete) del Centro Educativo
  describe('Dado una instancia de EducationalCenterEntity no eliminada', () => {
    const initialId = BigInt(4);
    const initialName = Name.create('Centro a Eliminar');
    let educationalCenter: EducationalCenterEntity;

    beforeEach(() => {
      jest.setSystemTime(mockDate);
      educationalCenter = EducationalCenterEntity.create(initialId, initialName);
      educationalCenter.getAndClearEvents(); // Limpiamos evento de creación
      jest.setSystemTime(new Date(mockDate.getTime() + 20000)); // Avanzamos el tiempo para la eliminación
    });

    describe('Cuando se invoca el método "softDelete"', () => {
      beforeEach(() => {
        educationalCenter.softDelete();
      });

      it('Entonces deletedAt debería establecerse a la fecha y hora actuales', () => {
        expect(educationalCenter.deletedAt).toEqual(new Date(mockDate.getTime() + 20000));
      });

      it('Entonces updatedAt debería establecerse a la fecha y hora actuales', () => {
        expect(educationalCenter.updatedAt).toEqual(new Date(mockDate.getTime() + 20000));
      });

      // Puedes añadir aquí la expectativa de un evento de dominio como EducationalCenterDeletedEvent
      // it('Entonces debería registrar un EducationalCenterDeletedEvent', () => {
      //   const events = educationalCenter.getAndClearEvents();
      //   expect(events.length).toBe(1);
      //   expect(events[0]).toBeInstanceOf(EducationalCenterDeletedEvent);
      //   expect((events[0] as EducationalCenterDeletedEvent).aggregateId).toBe(initialId);
      // });
    });

    describe('Cuando se invoca el método "softDelete" en una entidad ya eliminada', () => {
      beforeEach(() => {
        educationalCenter.softDelete(); // Primera eliminación
        jest.setSystemTime(new Date(mockDate.getTime() + 30000)); // Avanzamos el tiempo
        educationalCenter.softDelete(); // Segunda eliminación
      });

      it('Entonces deletedAt y updatedAt NO deberían cambiar de su primer valor', () => {
        expect(educationalCenter.deletedAt).toEqual(new Date(mockDate.getTime() + 20000));
        expect(educationalCenter.updatedAt).toEqual(new Date(mockDate.getTime() + 20000));
      });

      it('Entonces NO debería registrar ningún evento de dominio adicional', () => {
        educationalCenter.getAndClearEvents(); // Limpiamos el evento de la primera eliminación si existiera
        const events = educationalCenter.getAndClearEvents();
        expect(events.length).toBe(0);
      });
    });
  });

  // Escenario 5: Restauración de un Centro Educativo (deshacer borrado lógico)
  describe('Dado una instancia de EducationalCenterEntity eliminada lógicamente', () => {
    const initialId = BigInt(5);
    const initialName = Name.create('Centro Eliminado');
    let educationalCenter: EducationalCenterEntity;
    let deleteDate: Date;

    beforeEach(() => {
      jest.setSystemTime(mockDate);
      educationalCenter = EducationalCenterEntity.create(initialId, initialName);
      educationalCenter.getAndClearEvents(); // Limpiamos evento de creación
      deleteDate = new Date(mockDate.getTime() + 15000);
      jest.setSystemTime(deleteDate);
      educationalCenter.softDelete(); // Simulamos la eliminación
      educationalCenter.getAndClearEvents(); // Limpiamos el posible evento de eliminación
      jest.setSystemTime(new Date(mockDate.getTime() + 25000)); // Avanzamos el tiempo para la restauración
    });

    describe('Cuando se invoca el método "restore"', () => {
      beforeEach(() => {
        educationalCenter.restore();
      });

      it('Entonces deletedAt debería ser nulo', () => {
        expect(educationalCenter.deletedAt).toBeNull();
      });

      it('Entonces updatedAt debería establecerse a la fecha y hora actuales', () => {
        expect(educationalCenter.updatedAt).toEqual(new Date(mockDate.getTime() + 25000));
      });

      // Puedes añadir aquí la expectativa de un evento de dominio como EducationalCenterRestoredEvent
      // it('Entonces debería registrar un EducationalCenterRestoredEvent', () => {
      //   const events = educationalCenter.getAndClearEvents();
      //   expect(events.length).toBe(1);
      //   expect(events[0]).toBeInstanceOf(EducationalCenterRestoredEvent);
      //   expect((events[0] as EducationalCenterRestoredEvent).aggregateId).toBe(initialId);
      // });
    });

    describe('Cuando se invoca el método "restore" en una entidad no eliminada', () => {
      beforeEach(() => {
        educationalCenter.restore(); // Primero la restauramos
        educationalCenter.getAndClearEvents(); // Limpiamos el posible evento de restauración
        jest.setSystemTime(new Date(mockDate.getTime() + 35000)); // Avanzamos el tiempo
        educationalCenter.restore(); // Intentamos restaurar de nuevo
      });

      it('Entonces deletedAt debería permanecer nulo', () => {
        expect(educationalCenter.deletedAt).toBeNull();
      });

      it('Entonces updatedAt NO debería cambiar de su valor de la última restauración', () => {
        expect(educationalCenter.updatedAt).toEqual(new Date(mockDate.getTime() + 25000)); // Fecha de la primera restauración
      });

      it('Entonces NO debería registrar ningún evento de dominio adicional', () => {
        const events = educationalCenter.getAndClearEvents();
        expect(events.length).toBe(0);
      });
    });
  });

  // Escenario 6: Validación de getAndClearEvents
  describe('Dado una instancia de EducationalCenterEntity con eventos registrados', () => {
    const educationalCenterId = BigInt(6);
    const nameVO = Name.create('Centro con Eventos');
    let educationalCenter: EducationalCenterEntity;

    beforeEach(() => {
      jest.setSystemTime(mockDate);
      educationalCenter = EducationalCenterEntity.create(educationalCenterId, nameVO);
      // La creación ya registra un evento.
      // Puedes añadir más eventos si quieres simular operaciones adicionales
      educationalCenter.updateName(Name.create('Nombre modificado'));
    });

    describe('Cuando se invoca "getAndClearEvents" por primera vez', () => {
      let events: DomainEvent[];
      beforeEach(() => {
        events = educationalCenter.getAndClearEvents();
      });

      it('Entonces debería devolver todos los eventos registrados', () => {
        expect(events.length).toBe(2); // EducationalCenterCreatedEvent + EducationalCenterCreatedEvent (de updateName)
        expect(events[0]).toBeInstanceOf(EducationalCenterCreatedEvent);
        expect(events[1]).toBeInstanceOf(EducationalCenterCreatedEvent);
      });

      it('Entonces la lista interna de eventos debería quedar vacía', () => {
        expect(educationalCenter.getAndClearEvents().length).toBe(0);
      });
    });

    describe('Cuando se invoca "getAndClearEvents" por segunda vez consecutiva', () => {
      it('Entonces debería devolver un array vacío', () => {
        educationalCenter.getAndClearEvents(); // Primera llamada que vacía
        const events = educationalCenter.getAndClearEvents(); // Segunda llamada
        expect(events.length).toBe(0);
      });
    });
  });
});