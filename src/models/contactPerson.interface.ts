import { Contacts } from "./contacts.interface";

export interface ContactPerson {
  contactPersonId: number;
  contactPersonUniqueIdentifier: string;
  fullName: string;
  contacts: Contacts[];
}