// src/contexts/educational-center-management/educational-center/infrastructure/persistence/typeorm/repositories/typeorm-educational-center.repository.ts

import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'; // Decoradores de NestJS para inyección
import { Injectable } from '@nestjs/common'; // Decorador de NestJS para hacer la clase inyectable
import { EducationalCenterOrmEntity } from '../entities/educational-center-orm-entity';
import { Name } from 'src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo';
import { EducationalCenterRepository } from 'src/contexts/educational-center-management/educational-center/domain/repositories/educational-center.repository';
import { EducationalCenterEntity } from 'src/contexts/educational-center-management/educational-center/domain/entities/educational-center.entity';

/**
 * TypeOrmEducationalCenterRepository es la implementación concreta de la interfaz
 * EducationalCenterRepository. Es parte de la capa de infraestructura y se encarga
 * de la persistencia de los objetos EducationalCenter utilizando TypeORM.
 *
 * Actúa como un adaptador entre el dominio puro y el ORM.
 */
@Injectable() // Hace que esta clase sea inyectable por el sistema de inyección de dependencias de NestJS
export class TypeOrmEducationalCenterRepository implements EducationalCenterRepository {
  private readonly typeOrmRepository: Repository<EducationalCenterOrmEntity>;

  constructor(
    @InjectRepository(EducationalCenterOrmEntity) // Inyecta el repositorio de TypeORM para EducationalCenterOrmEntity
    typeOrmRepository: Repository<EducationalCenterOrmEntity>,
  ) {
    this.typeOrmRepository = typeOrmRepository;
  }

  /**
   * Guarda o actualiza un centro educativo en la base de datos.
   * Realiza la conversión entre la entidad de dominio y la entidad ORM.
   *
   * @param center La instancia de EducationalCenter a guardar.
   */
  async save(center: EducationalCenterEntity): Promise<EducationalCenterEntity> {
    // 1. Convertir la entidad de dominio a la entidad ORM.
    // Usamos el ID del dominio si existe para una actualización,
    // o creamos una nueva entidad ORM si es una nueva inserción.
    let ormEntity = await this.typeOrmRepository.findOne({
      where: { id: center.educationalCenterId as any }, // TypeORM puede necesitar un cast para bigint en algunos casos
    });

    if (ormEntity) {
      // Actualizar entidad existente
      ormEntity.name = center.name.value;
      ormEntity.updatedAt = center.updatedAt;
      ormEntity.deletedAt = center.deletedAt;
    } else {
      // Crear nueva entidad
      ormEntity = this.typeOrmRepository.create({
        // NO asignamos el ID aquí si es autogenerado por la DB (bigserial).
        // TypeORM lo manejará automáticamente en la inserción.
        name: center.name.value,
        createdAt: center.createdAt,
        updatedAt: center.updatedAt,
        deletedAt: center.deletedAt,
      });
    }

    // 2. Persistir la entidad ORM en la base de datos.
    const savedOrmEntity = await this.typeOrmRepository.save(ormEntity);

    // 3. Opcional: Si el ID de la entidad de dominio es mutable o si necesitas el ID real
    // inmediatamente después de una inserción (para un nuevo agregado con ID autogenerado),
    // podrías "actualizar" la entidad de dominio con el ID real de la base de datos.
    // Sin embargo, para mantener la inmutabilidad de la entidad de dominio,
    // y dado que el caso de uso devuelve la instancia creada, el ID real será
    // conocido por la capa de aplicación/presentación al recuperar la entidad
    // o al procesar un evento de dominio si el ID real es parte del evento.
    // Para `bigserial`, el ID final solo se conocerá después del `save`.
    // Si necesitas el ID inmediatamente después de la creación, la respuesta del
    // caso de uso debería ser un DTO de salida que el repositorio pueda mapear y devolver.
    // Aquí el `void` en `save` significa que no se devuelve el agregado modificado.
    // Si necesitaras el ID, el método `save` del repositorio debería devolver `EducationalCenter`
    // y el caso de uso actualizaría su referencia.
    // 4. Reconstituir la entidad de dominio desde la entidad ORM.
    // Usamos el método de fábrica 'reconstitute' para crear la entidad de dominio
    // a partir de datos ya existentes, sin emitir eventos de dominio.
    return EducationalCenterEntity.reconstitute(
      savedOrmEntity.id,
      Name.create(savedOrmEntity.name), // Reconstruimos el Value Object Name
      savedOrmEntity.createdAt,
      savedOrmEntity.updatedAt,
      savedOrmEntity.deletedAt,
    );
  }

  /**
   * Busca un centro educativo por su ID en la base de datos.
   * Realiza la conversión de la entidad ORM a la entidad de dominio.
   *
   * @param id El ID del centro educativo.
   * @returns Una Promesa que se resuelve con la instancia de EducationalCenter
   * si se encuentra, o `null` si no existe.
   */
  async findById(id: bigint): Promise<EducationalCenterEntity | null> {
    // 1. Buscar la entidad ORM en la base de datos.
    const ormEntity = await this.typeOrmRepository.findOne({
      where: { id: id as any }, // TypeORM y BigInt
    });

    if (!ormEntity) {
      return null;
    }

    // 2. Reconstituir la entidad de dominio desde la entidad ORM.
    // Usamos el método de fábrica 'reconstitute' para crear la entidad de dominio
    // a partir de datos ya existentes, sin emitir eventos de dominio.
    return EducationalCenterEntity.reconstitute(
      ormEntity.id,
      Name.create(ormEntity.name), // Reconstruimos el Value Object Name
      ormEntity.createdAt,
      ormEntity.updatedAt,
      ormEntity.deletedAt,
    );
  }
}