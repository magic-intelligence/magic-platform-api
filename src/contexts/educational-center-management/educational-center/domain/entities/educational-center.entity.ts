import { DomainEvent } from "src/shared/domain/events/domain-events";
import { Name } from "../values-objects/name.vo";
import { EducationalCenterCreatedEvent } from "../events/educational-center-created.event";

export class EducationalCenterEntity {
    private readonly _educationalCenterId: bigint;
    private _name: Name;
    private readonly _createdAt: Date;
    private _updatedAt: Date | null;
    private _deletedAt: Date | null;
      private _domainEvents: DomainEvent[] = []; // Colección de eventos de dominio

    private constructor(
    educationalCenterId: bigint,
    name: Name,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    ) {
        this._educationalCenterId = educationalCenterId;
        this._name = name;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
    }

    /**
   * Crea una nueva instancia de EducationalCenter.
   * Este es un método de fábrica para asegurar la creación controlada del agregado.
   * Un evento de dominio EducationalCenterCreatedEvent se registra internamente.
   *
   * @param educationalCenterId El ID único del centro educativo.
   * @param name El nombre del centro educativo.
   * @returns Una nueva instancia de EducationalCenter.
   */
  static create(educationalCenterId: bigint, name: Name): EducationalCenterEntity {
    const educationalCenter = new EducationalCenterEntity(
      educationalCenterId,
      name,
      new Date(), // createdAt
      null, // updatedAt
      null, // deletedAt
    );
    // Registra el evento de dominio.
    educationalCenter.recordEvent(new EducationalCenterCreatedEvent(educationalCenter.educationalCenterId, educationalCenter.name.value));
    return educationalCenter;
  }

  /**
   * Reconstituye una instancia de EducationalCenter desde la persistencia.
   * No emite eventos ya que representa un estado ya existente.
   *
   * @param educationalCenterid El ID único del centro educativo.
   * @param name El nombre del centro educativo.
   * @param createdAt La fecha de creación.
   * @param updatedAt La fecha de la última actualización.
   * @param deletedAt La fecha de borrado lógico.
   * @returns Una instancia de EducationalCenter reconstituida.
   */
  static reconstitute(
    educationalCenterid: bigint,
    name: Name,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ): EducationalCenterEntity {
    return new EducationalCenterEntity(educationalCenterid, name, createdAt, updatedAt, deletedAt);
  }

  // Getters
  get educationalCenterId(): bigint {
    return this._educationalCenterId;
  }

  get name(): Name {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  /**
   * Obtiene y borra los eventos de dominio registrados.
   * Este método será llamado por la capa de aplicación o infraestructura
   * después de que el agregado sea persistido o sus operaciones completadas.
   */
  public getAndClearEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = []; // Limpiar los eventos después de haberlos obtenido
    return events;
  }

  // Métodos de comportamiento del dominio
  public updateName(newName: Name): void {
    if (this._name.equals(newName)) {
      return; // No hay cambio, no se hace nada
    }
    this._name = newName;
    this._updatedAt = new Date();
    this.recordEvent(new EducationalCenterCreatedEvent(this.educationalCenterId, this._name.value)); // Un evento de ejemplo
  }

  public softDelete(): void {
    if (this._deletedAt) {
      return; // Ya está marcado como eliminado
    }
    this._deletedAt = new Date();
    this._updatedAt = new Date(); // Actualizamos también la fecha de actualización
    // this.recordEvent(new EducationalCenterDeletedEvent(this.id));
  }

  public restore(): void {
    if (!this._deletedAt) {
      return; // No está eliminado
    }
    this._deletedAt = null;
    this._updatedAt = new Date();
    // this.recordEvent(new EducationalCenterRestoredEvent(this.id));
  }

  /**
   * Registra un evento de dominio para ser despachado posteriormente.
   * @param event El evento de dominio a registrar.
   */
  private recordEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }
}
