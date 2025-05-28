// src/contexts/educational-center-management/educational-center/application/use-cases/find-educational-center-by-id.use-case.ts

import { EducationalCenterRepository } from '../../domain/repositories/educational-center.repository';
import { EducationalCenterEntity } from '../../domain/entities/educational-center.entity';

/**
 * FindEducationalCenterByIdUseCase es un Caso de Uso (o Servicio de Aplicación)
 * que se encarga de la lógica de orquestación para buscar un centro educativo por su ID.
 *
 * Su responsabilidad es coordinar la recuperación de la entidad de dominio a través del repositorio.
 */
export class FindEducationalCenterByIdUseCase {
  constructor(
    // Inyectamos la interfaz del repositorio, manteniendo la Inversión de Dependencias.
    private readonly educationalCenterRepository: EducationalCenterRepository,
  ) {}

  /**
   * Ejecuta el caso de uso para encontrar un centro educativo por su ID.
   *
   * @param id El ID (BigInt) del centro educativo a buscar.
   * @returns Una Promesa que se resuelve con la entidad EducationalCenter si se encuentra,
   * o `null` si no existe.
   */
  public async execute(id: bigint): Promise<EducationalCenterEntity | null> {
    // La lógica de este caso de uso es directa: simplemente delega al repositorio.
    // Aunque simple, es un caso de uso distinto porque el controlador lo invoca,
    // y si la lógica de búsqueda se volviera más compleja (ej. comprobaciones de seguridad,
    // carga de relaciones específicas), este sería el lugar para gestionarlo.
    const educationalCenter = await this.educationalCenterRepository.findById(id);

    return educationalCenter;
  }
}