interface ContactPerson {
  fullName: string;
  contactNumber: string;
  emailAddress: string;
}

interface PhysicalAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  code: string;
}

export interface Organization {
  organizationId?: string;
  name: string;
  vatNumber: string;
  azureUserId: string;
  legalEntityTypeId: number;
  registrationNumber: string;
  contactPerson: ContactPerson;
  physicalAddress: PhysicalAddress;
}
