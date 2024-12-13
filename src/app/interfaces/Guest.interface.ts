export interface Guest {
  readonly id: number;
  readonly allergies?: string;
  readonly child: boolean;
  readonly familyId: number;
  readonly firstName: string;
  readonly foodSelection: string;
  readonly lastName: string;
  readonly memberId: number;
  readonly needsHighChair: boolean;
}
