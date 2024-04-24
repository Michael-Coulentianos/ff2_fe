interface ContactPerson {
  contactPersonId: number;
  contactPersonUniqueIdentifier: string;
  fullName: string;
  contactNumber: string;
  emailAddress: string;
  contactType: string;
}

interface Address {
  addressId: number;
  addressUniqueIdentifier: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  code: string;
}

export interface Organization {
  partyId: number;
  organizationId: number;
  partyIdentifier: string;
  name: string;
  vatNumber: string;
  legalEntityTypeName: string;
  registrationNumber: string;
  createdDate: string;
  contactPerson: ContactPerson[];
  sameAddress: boolean;
  physicalAddress: Address[];
  postalAddress: Address[];
}
