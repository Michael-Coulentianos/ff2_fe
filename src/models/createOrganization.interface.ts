import { ContactPerson } from './contactPerson.interface';
import { Address } from './address.interface';

export interface CreateOrganization {
  id: string; 
  partyId: number;
  organizationId: number;
  partyIdentifier: string;
  azureUserId: string;
  name: string;
  vatNumber: string;
  legalEntityTypeName: string;
  legalEntityTypeId: number;
  registrationNumber: string;
  createdDate: string;
  contactPerson: ContactPerson;
  contactDetail: ContactPerson[];
  sameAddress: boolean;
  physicalAddress: Address;
  postalAddress: Address;
}
