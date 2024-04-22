import axios from "axios";

const api = axios.create({
  baseURL: "https://func-farmmanagement-api-dev.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "7E80B3AB-A941-4C36-BA76-6ECA579F3CCB",
    "X-AzureUserId": "fd78de01-3de4-4cd7-8080-27e9aa6b6008",
  },
});
interface ContactPerson {
  FullName?: string;
  ContactNumber?: string;
  EmailAddress?: string;
}

interface PhysicalAddress {
  AddressLine1?: string;
  AddressLine2?: string;
  City?: string;
  Code?: string;
}

interface Organization {
  Name?: string;
  VatNumber?: string;
  AzureUserId?: string;
  // LegalEntityTypeId?: number;
  RegistrationNumber?: string;
  ContactPerson?: ContactPerson;
  PhysicalAddress?: PhysicalAddress;
}
 
export const createOrganization = async (organization: Organization) => {
  try {
    const response = await api.post("/CreateOrganization", organization);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const updateOrganizationDetails = async (
  organizationId: number,
  details: any
) => {
  try {
    const response = await api.put(
      `/UpdateOrganizationDetails/${organizationId}`,
      details
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const createFarm = async () => {
  try {
    const response = await api.post("/CreateFarm", {
      name: "JJ Farms",
      OrganizationId: 6,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getOrganizations = async () => {
  try {
    const response = await api.get("Organizations", {});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

interface Note {
  NoteTypeId: string;
  Title: string;
  PartyId: string;
  Location: string;
  Description: string;
  Attachment: any;
}

export const createNote = async (note: Note) => {
  try {
    const response = await api.post("AddNote", note);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getNotes = async () => {
  try {
    const response = await api.get("Notes", {});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const removeNote = async (NoteId: any) => {
  try {
    const response = await api.delete(`RemoveNote/${NoteId}`, {});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
