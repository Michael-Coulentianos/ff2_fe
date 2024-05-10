import { Contacts } from "./Contacts.interface";

export interface ContactPerson {
  contactPersonId: number;
  contactPersonUniqueIdentifier: string;
  fullName: string;
  contacts: Contacts;
}