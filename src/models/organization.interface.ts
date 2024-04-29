import { ContactPerson } from './contactPerson.interface';
import { Address } from './address.interface';

export interface Organization {
  id: string; 
  partyId: number;
  organizationId: number;
  partyIdentifier: string;
  name: string;
  vatNumber: string;
  legalEntityTypeName: string;
  LegalEntityTypeId: number;
  registrationNumber: string;
  createdDate: string;
  contactPerson: ContactPerson[];
  sameAddress: boolean;
  physicalAddress: Address[];
  postalAddress: Address[];
}
