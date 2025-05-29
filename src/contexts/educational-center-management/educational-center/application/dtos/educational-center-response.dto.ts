// src/contexts/educational-center-management/educational-center/application/dtos/educational-center-response.dto.ts

/**
 * EducationalCenterResponseDto es un Data Transfer Object (DTO)
 * que define la estructura de los datos que se enviarán como respuesta
 * a la capa de presentación después de una operación relacionada con
 * un EducationalCenter (ej. creación, consulta).
 *
 * Contiene solo los datos de salida relevantes, mapeados desde la entidad de dominio.
 */
export class EducationalCenterResponseDto {
  readonly id: string; // El ID del centro educativo (como string para compatibilidad JSON)
  readonly name: string; // El nombre del centro educativo
  readonly createdAt: Date; // La fecha de creación
  readonly updatedAt: Date | null; // La fecha de la última actualización
  readonly deletedAt: Date | null; // La fecha de borrado lógico

  constructor(
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    Object.freeze(this);
  }
}