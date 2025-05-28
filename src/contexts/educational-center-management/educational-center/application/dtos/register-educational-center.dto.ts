/**
 * RegisterEducationalCenterDto es un Data Transfer Object (DTO)
 * que define la estructura de los datos de entrada para el caso de uso
 * de registro de un centro educativo.
 *
 * Contiene solo los datos necesarios para la operación, sin lógica de negocio.
 */
export class RegisterEducationalCenterDto{
    /**
     * El nombre del centro educativo que se va a registrar.
     */
    readonly name: string;

    constructor(name: string){
        this.name = name;
    }
}