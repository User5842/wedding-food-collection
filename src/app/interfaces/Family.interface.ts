import { Guest } from "./Guest.interface";

export interface Family {
  readonly id: number;
  readonly familyName: string;
  readonly guests: Guest[];
  readonly responseRecorded: boolean;
}
