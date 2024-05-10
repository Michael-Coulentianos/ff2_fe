import { ContactPerson } from './ContactPerson.interface';
import { Address } from './Address.interface';

export interface Organization {
  id: number; 
  azureUserId: string;
  partyId: number;
  organizationId: number;
  partyIdentifier: string;
  name: string;
  vatNumber: string;
  legalEntityTypeName: string;
  legalEntityTypeId: number;
  registrationNumber: string;
  createdDate: string;
  contactPerson: ContactPerson[];
  sameAddress: boolean;
  physicalAddress: Address[];
  postalAddress: Address[];
}
