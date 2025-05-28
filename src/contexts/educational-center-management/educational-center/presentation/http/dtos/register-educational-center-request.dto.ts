// src/contexts/educational-center-management/educational-center/presentation/http/dtos/register-educational-center-request.dto.ts

import { IsNotEmpty, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * RegisterEducationalCenterRequestDto es un Data Transfer Object (DTO)
 * de la capa de Presentación. Se utiliza para la validación de las solicitudes HTTP
 * entrantes para el registro de un centro educativo.
 *
 * Contiene decoradores de 'class-validator' y '@nestjs/swagger' para la validación
 * y documentación automática de la API.
 */
export class RegisterEducationalCenterRequestDto {
  @ApiProperty({
    description: 'El nombre de un Centro Educativo',
    example: 'Awesome Learning Academy',
    maxLength: 250,
  })
  @IsString({ message: 'El nombre no puede ser un número.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @MinLength(3, { message: 'El nombre debe tener como mínimo 3 caracteres.' })
  @MaxLength(250, { message: 'El nombre no debe ser mayor a 250 caracteres.' })
  readonly name: string;
}