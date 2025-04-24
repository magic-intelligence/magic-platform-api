export class BranchOfficeCreatedEvent {
    constructor(
      public readonly name: string,
      public readonly educationalCenterId: bigint,
      public readonly addressPayload: {
        street: string;
        exteriorNumber: string;
        interiorNumber?: string;
        postalCode: string;
        state: string;
        city: string;
        district: string;
      }
    ) {}
  }