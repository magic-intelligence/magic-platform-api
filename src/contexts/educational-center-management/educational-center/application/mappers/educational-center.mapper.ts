// src/contexts/educational-center-management/educational-center/application/mappers/educational-center.mapper.ts

import { EducationalCenterEntity } from '../../domain/entities/educational-center.entity';
import { EducationalCenterResponseDto } from '../dtos/educational-center-response.dto';

/**
 * EducationalCenterMapper es una clase que se encarga de transformar
 * la entidad de dominio EducationalCenter en un DTO de respuesta
 * apto para la capa de presentación.
 *
 * Los mappers son esenciales para evitar que la capa de presentación
 * dependa directamente de los objetos de dominio.
 */
export class EducationalCenterMapper {
  /**
   * Convierte una entidad de dominio EducationalCenter a un DTO de respuesta.
   *
   * @param entity La entidad EducationalCenter a mapear.
   * @returns Un EducationalCenterResponseDto.
   */
  public static toResponseDto(entity: EducationalCenterEntity): EducationalCenterResponseDto {
    return new EducationalCenterResponseDto(
      entity.educationalCenterId.toString(), // Convertimos BigInt a string para la serialización JSON
      entity.name.value,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  // public static toResponseListDto(entities:EducationalCenterEntity[]):{educationalCenters:EducationalCenterResponseDto[]}{
  //   if(!entities) return {
  //     educationalCenters:[]
  //   };
  //   return {
  //     educationalCenters: entities.map(item => this.toResponseDto(item) )
  //   }
  // }

  // Si necesitamos mapear colecciones, podríamos tener:
  // public static toResponseDtos(entities: EducationalCenter[]): EducationalCenterResponseDto[] {
  //   return entities.map(entity => this.toResponseDto(entity));
  // }

  // Si en algún momento necesitamos convertir un DTO de entrada a una entidad de dominio,
  // también podríamos tener métodos como:
  // public static toDomainEntity(dto: RegisterEducationalCenterDto): EducationalCenter {
  //   // Esto es menos común ya que los casos de uso construyen las entidades
  //   // a partir de los DTOs y Value Objects.
  //   throw new Error('Not implemented: Conversion from DTO to Domain Entity often handled by Use Case.');
  // }
}