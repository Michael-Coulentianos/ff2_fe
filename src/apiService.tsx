import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";
const API_KEY = process.env.REACT_APP_API_KEY || "";
const AZURE_USER_ID = process.env.REACT_APP_AZURE_USER_ID || "";

const api = axios.create({
  baseURL: "https://func-farmmanagement-api-dev.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "7E80B3AB-A941-4C36-BA76-6ECA579F3CCB",
    "X-AzureUserId": "fd78de01-3de4-4cd7-8080-27e9aa6b6008",
  },
});

export const createOrganization = async () => {
  try {
    const response = await api.post("/CreateOrganization", {
      Name: "ZZ2 Farms - Azure",
      VATNumber: "VAT2024/01/24",
      AzureUserId: "fd78de01-3de4-4cd7-8080-27e9aa6b6008",
      LegalEntityTypeId: 1,
      RegistrationNumber: "Reg2024/01/24",
      ContactPerson: {
        FullName: "Elias Siboyane",
        ContactNumber: "0730531673",
        EmailAddress: "elias.s@IQLogistica.com",
      },
      PhysicalAddress: {
        AddressLine1: "474 Lynnwood Street",
        AddressLine2: "Lynnwood",
        City: "Pretoria",
        Code: "0015",
      },
    });
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
      AzureUserId: AZURE_USER_ID,
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

export const getNotes = async () => {
  try {
    const response = await api.get("Notes", {});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
