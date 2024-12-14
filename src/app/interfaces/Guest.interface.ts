import { Family } from "./Family.interface";

export interface Guest {
  readonly id: number;
  readonly allergies?: string;
  readonly child: boolean;
  readonly family: Family;
  readonly familyId: number;
  readonly firstName: string;
  readonly foodSelection: string;
  readonly lastName: string;
  readonly needsHighChair: boolean;
}
