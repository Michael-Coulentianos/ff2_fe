import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";
const API_KEY = process.env.REACT_APP_API_KEY || "";
const AZURE_USER_ID = process.env.REACT_APP_AZURE_USER_ID || "";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

export const createOrganization = async () => {
  try {
    const response = await api.post("/CreateOrganization", {
      Name: "ZZ2 Farms - Azure",
      VATNumber: "VAT2024/01/24",
      AzureUserId: AZURE_USER_ID,
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
