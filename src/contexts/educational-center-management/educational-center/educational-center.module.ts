import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalCenterOrmEntity } from './infraestruture/persistence/typeorm/entities/educational-center-orm-entity';
import { EducationalCenterController } from './presentation/http/controllers/educational-center.controller';
import {
  EDUCATIONAL_CENTER_REPOSITORY,
  EducationalCenterRepository,
} from './domain/repositories/educational-center.repository';
import { TypeOrmEducationalCenterRepository } from './infraestruture/persistence/typeorm/repositories/typeorm-educational-center.repository';
import { RegisterEducationalCenterUseCase } from './application/use-cases/register-educational-center.use-case';
import { FindEducationalCenterByIdUseCase } from './application/use-cases/find-educational-center-by-id.use-case';

/**
 * EducationalCenterModule es el módulo de NestJS que agrupa todos los componentes
 * relacionados con la gestión de centros educativos.
 *
 * Se encarga de la configuración de la inyección de dependencias para este contexto,
 * enlazando las interfaces de dominio con sus implementaciones de infraestructura.
 */
@Module({
  imports: [
    // Importa las entidades de TypeORM que este módulo utilizará.
    // Esto es crucial para que TypeORM sepa qué tablas debe gestionar.
    TypeOrmModule.forFeature([EducationalCenterOrmEntity]),
  ],
  controllers: [
    // Los controladores que manejan las solicitudes HTTP para este módulo.
    EducationalCenterController,
  ],
  providers: [
    // Define los proveedores de servicios y cómo se inyectan las dependencias.

    // --- Implementación del Repositorio de Infraestructura ---
    // Proporciona la implementación concreta de EducationalCenterRepository.
    // Aquí es donde enlazamos la interfaz de dominio (EducationalCenterRepository)
    // con su implementación de infraestructura (TypeOrmEducationalCenterRepository).
    {
      provide: EDUCATIONAL_CENTER_REPOSITORY, // El "token" o la "interfaz" que se pide
      useClass: TypeOrmEducationalCenterRepository, // La clase concreta que se provee
    },
    {
      provide: RegisterEducationalCenterUseCase, // Provee el caso de uso
      useFactory: (repo: EducationalCenterRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new RegisterEducationalCenterUseCase(repo);
      },
      inject: [EDUCATIONAL_CENTER_REPOSITORY], // Declara la dependencia para el factory
    },
    {
      provide: FindEducationalCenterByIdUseCase, // Provee el caso de uso
      useFactory: (repo: EducationalCenterRepository) => {
        // NestJS inyecta el repo aquí basado en el token
        return new FindEducationalCenterByIdUseCase(repo);
      },
      inject: [EDUCATIONAL_CENTER_REPOSITORY], // Declara la dependencia para el factory
    },

    // --- Casos de Uso (Servicios de Aplicación) ---
    // NestJS es lo suficientemente inteligente para inyectar automáticamente
    // la implementación correcta del repositorio (TypeOrmEducationalCenterRepository)
    // en los constructores de estos casos de uso, porque ya la hemos provisto arriba.
    // RegisterEducationalCenterUseCase,
    // FindEducationalCenterByIdUseCase,

    // Mappers y DTOs no necesitan ser proveedores si son clases estáticas o DTOs puros.
    // EducationalCenterMapper // Si tuviera métodos no estáticos o dependencias inyectables.
  ],
  exports: [
    // Exporta los proveedores y módulos que otras partes de la aplicación (otros módulos)
    // podrían necesitar. Por ejemplo, si otro módulo necesita usar RegisterEducationalCenterUseCase.
    RegisterEducationalCenterUseCase,
    FindEducationalCenterByIdUseCase,
  ],
})
export class EducationalCenterModule {}
