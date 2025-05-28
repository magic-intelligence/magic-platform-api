// src/contexts/educational-center-management/educational-center/presentation/http/controllers/educational-center.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'; // Para documentación de Swagger (opcional, pero buena práctica)
import { RegisterEducationalCenterUseCase } from '../../../application/use-cases/register-educational-center.use-case';
import { FindEducationalCenterByIdUseCase } from '../../../application/use-cases/find-educational-center-by-id.use-case';
import { RegisterEducationalCenterDto } from '../../../application/dtos/register-educational-center.dto'; // DTO de entrada de la aplicación
import { EducationalCenterResponseDto } from '../../../application/dtos/educational-center-response.dto'; // DTO de salida de la aplicación
import { EducationalCenterMapper } from '../../../application/mappers/educational-center.mapper';

// DTOs específicos de presentación para validación con class-validator (opcional, pero es común)
import { RegisterEducationalCenterRequestDto } from '../dtos/register-educational-center-request.dto';
import { ParamIdDto } from 'src/shared/presentation/http/dtos/param-id.dto';
import { InvalidNameException } from '../../../domain/exceptions/invalid-name.exception';

/**
 * EducationalCenterController es el controlador de NestJS que maneja las solicitudes HTTP
 * relacionadas con la gestión de centros educativos.
 *
 * Es parte de la capa de Presentación y actúa como un Adaptador que convierte
 * solicitudes HTTP en llamadas a Casos de Uso de la capa de Aplicación.
 */
@ApiTags('Educational Centers') // Etiqueta para Swagger
@Controller('educational-centers') // Ruta base para este controlador
export class EducationalCenterController {
  constructor(
    // Inyectamos los Casos de Uso. El controlador no tiene lógica de negocio.
    private readonly registerEducationalCenterUseCase: RegisterEducationalCenterUseCase,
    private readonly findEducationalCenterByIdUseCase: FindEducationalCenterByIdUseCase, // Se inyectará aquí
  ) {}

  /**
   * Endpoint para registrar un nuevo centro educativo.
   *
   * @param registerDto Los datos del centro educativo a registrar.
   * @returns El DTO de respuesta del centro educativo creado.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED) // Código de estado HTTP 201 para creación exitosa
  @ApiOperation({ summary: 'Registrar un nuevo centro educativo.' })
  @ApiResponse({
    status: 201,
    description: 'El centro educativo se ha creado correctamente.',
    type: EducationalCenterResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 409, description: 'Educational center already exists.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async registerEducationalCenter(
    @Body() registerRequestDto: RegisterEducationalCenterRequestDto, // Usamos un DTO de Request para validación
  ): Promise<EducationalCenterResponseDto> {
    try {
      // 1. Convertir el DTO de Request (validado por la capa de presentación)
      // al DTO de la capa de Aplicación.
      const registerAppDto = new RegisterEducationalCenterDto(registerRequestDto.name);

      // 2. Ejecutar el Caso de Uso (que contiene la orquestación de la lógica de negocio).
      const educationalCenter = await this.registerEducationalCenterUseCase.execute(registerAppDto);
        
      // 3. Mapear la entidad de dominio resultante a un DTO de respuesta para la API.
      return EducationalCenterMapper.toResponseDto(educationalCenter);
    } catch (error) {
      // *** TRADUCCIÓN DE EXCEPCIONES DE DOMINIO A EXCEPCIONES HTTP DE NESTJS ***
      if (error instanceof InvalidNameException) {
        throw new BadRequestException(error.message); // Mapea InvalidNameException a 400 Bad Request
      }

      // Codigo de error que lanza typeorm cuando ya existe un centro educativo con el mismo nombre
      if(error?.code === '23505')
        throw new ConflictException('Ya existe un centro educativo con ese nombre.'); // Mapea errores de conflicto de la base de datos (ej. duplicados) a 409 Conflict
      // Otros tipos de errores de dominio si existieran
      // if (error instanceof AnotherDomainException) { /* ... */ }
      // Si es un error desconocido o no esperado, relanzarlo o lanzar un InternalServerErrorException
      throw error; // Deja que el filtro global de excepciones lo maneje como 500
    }
  }

  /**
   * Endpoint para buscar un centro educativo por su ID.
   *
   * @param params El DTO que contiene el ID del centro educativo.
   * @returns El DTO de respuesta del centro educativo encontrado.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar un centro educativo por su ID.' })
  @ApiResponse({
    status: 200,
    description: 'The educational center found.',
    type: EducationalCenterResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Educational center not found.' })
  async findEducationalCenterById(
    @Param() params: ParamIdDto,
  ): Promise<EducationalCenterResponseDto> {
    try {
      // 1. El DTO de parámetro ya ha sido validado por la capa de presentación (ej. con class-validator).
    const centerId = BigInt(params.id); // Convertimos el string a BigInt para el dominio

    // 2. Ejecutar el Caso de Uso para encontrar el centro.
    const educationalCenter =
      await this.findEducationalCenterByIdUseCase.execute(centerId);

    if (!educationalCenter) {
      // Lanzar una excepción de NestJS que se mapee a un 404
      throw new NotFoundException('Centro educativo no encontrado.'); // O una excepción personalizada de NestJS
    }

    // 3. Mapear la entidad de dominio a un DTO de respuesta.
    return EducationalCenterMapper.toResponseDto(educationalCenter);
    } catch (error) {
      throw error; // Deja que el filtro global de excepciones lo maneje
    }
  }

  // Otros endpoints como PUT para actualización, DELETE para borrado, etc.
}
