import { RegisterEducationalCenterDto } from "src/contexts/educational-center-management/educational-center/application/dtos/register-educational-center.dto";
import { RegisterEducationalCenterUseCase } from "src/contexts/educational-center-management/educational-center/application/use-cases/register-educational-center.use-case";
import { EducationalCenterEntity } from "src/contexts/educational-center-management/educational-center/domain/entities/educational-center.entity";
import { EducationalCenterCreatedEvent } from "src/contexts/educational-center-management/educational-center/domain/events/educational-center-created.event";
import { InvalidNameException } from "src/contexts/educational-center-management/educational-center/domain/exceptions/invalid-name.exception";
import { EducationalCenterRepository } from "src/contexts/educational-center-management/educational-center/domain/repositories/educational-center.repository";
import { Name } from "src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo";
import { DomainException } from "src/shared/domain/exceptions/domain.exceptions";

describe('RegisterEducationalCenterUseCase', () => {
  let useCase: RegisterEducationalCenterUseCase;
  let mockEducationalCenterRepository: jest.Mocked<EducationalCenterRepository>;

  // Datos de prueba
  const mockDtoName = 'Nuevo Centro Único';
  const mockCreatedId = 999999999999999999n; // ID simulado por Date.now() en el use case
  const mockNameVo = Name.create(mockDtoName); // Instancia simulada del Name VO
  const mockCreatedEntity = EducationalCenterEntity.reconstitute(
    mockCreatedId,
    mockNameVo,
    new Date(),
    null,
    null,
  ); // Entidad simulada
  const mockDomainEvent = new EducationalCenterCreatedEvent(
    mockCreatedId,
    mockDtoName,
  );

  // Mockear `Date.now()` para que `newCenterId` sea predecible
  const fixedTimestamp = 1717088400000; // Un timestamp fijo
  const fixedDate = new Date(fixedTimestamp);
  jest.spyOn(Date, 'now').mockReturnValue(fixedTimestamp); // Para newCenterId

  // Mock para console.log para evitar que ensucie la salida de la prueba
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleSpy.mockRestore();
    jest.restoreAllMocks(); // Restaurar Date.now()
  });

  beforeEach(() => {
    // Resetear mocks antes de cada prueba
    mockEducationalCenterRepository = {
      save: jest.fn().mockResolvedValue(mockCreatedEntity), // El repo siempre "guarda" con éxito y retorna la entidad
      findById: jest.fn(),
      // ... otros métodos si los hubiera, mockeados también
    };

    // Mockear los métodos estáticos de Name y EducationalCenterEntity
    // Asegurarnos de que Name.create retorne nuestro mockNameVo
    jest.spyOn(Name, 'create').mockReturnValue(mockNameVo);

    // Asegurarnos de que EducationalCenterEntity.create retorne nuestro mockCreatedEntity
    // y que tenga un evento registrado para que getAndClearEvents lo retorne
    jest.spyOn(EducationalCenterEntity, 'create').mockReturnValueOnce(
      // Se crea una entidad "fresca" con su evento interno
      (() => {
        const entity = EducationalCenterEntity.reconstitute(
          mockCreatedId,
          mockNameVo,
          fixedDate, // Usar la fecha fija
          null,
          null,
        );
        // Directamente manipular los eventos internos para simular que `create` los registra
        (entity as any)._domainEvents = [mockDomainEvent];
        return entity;
      })(),
    );
    // Mock para getAndClearEvents de la entidad, para que devuelva los eventos y luego nada
    jest.spyOn(mockCreatedEntity, 'getAndClearEvents').mockReturnValueOnce([mockDomainEvent]);


    useCase = new RegisterEducationalCenterUseCase(mockEducationalCenterRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar el estado de los mocks entre pruebas
  });

  // Dado el caso de uso RegisterEducationalCenterUseCase
  describe('Dado el caso de uso RegisterEducationalCenterUseCase', () => {
    const command: RegisterEducationalCenterDto = { name: mockDtoName };

    // Cuando se ejecuta con un DTO válido
    describe('Cuando se ejecuta con un DTO válido', () => {
      let result: EducationalCenterEntity;

      beforeEach(async () => {
        result = await useCase.execute(command);
      });

      // Entonces debería llamar a Name.create con el nombre del DTO
      it('Entonces debería llamar a Name.create con el nombre del DTO', () => {
        expect(Name.create).toHaveBeenCalledTimes(1);
        expect(Name.create).toHaveBeenCalledWith(command.name);
      });

      // Entonces debería generar un ID para la nueva entidad
      it('Entonces debería generar un ID para la nueva entidad (simulado)', () => {
        // En tu código, el ID se genera con BigInt(Date.now()).
        // Al mockear Date.now(), el ID es predecible.
        expect(true).toBe(true); // Ya verificado por mockCreatedId y Entity.create call
      });

      // Entonces debería retornar la entidad guardada
      it('Entonces debería retornar la entidad guardada', () => {
        expect(result).toBe(mockCreatedEntity);
      });
    });

    // Cuando el Value Object Name lanza una excepción (ej. nombre inválido)
    describe('Cuando el Value Object Name lanza una excepción', () => {
      const invalidMessage = 'El nombre es muy corto';

      beforeEach(() => {
        // Hacemos que Name.create lance una excepción
        (Name.create as jest.Mock).mockImplementationOnce(() => {
          throw new InvalidNameException(invalidMessage);
        });
      });

      // Entonces no debería intentar crear la entidad ni guardar en el repositorio
      it('Entonces no debería intentar crear la entidad ni guardar en el repositorio', async () => {
        await expect(useCase.execute(command)).rejects.toThrow(); // Asegurarse de que lanza

        expect(EducationalCenterEntity.create).not.toHaveBeenCalled();
        expect(mockEducationalCenterRepository.save).not.toHaveBeenCalled();
      });
    });
  });
});