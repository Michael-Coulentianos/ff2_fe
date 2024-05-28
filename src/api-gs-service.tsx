import axios from "axios";
import { FieldMetadata } from "./models/fieldMetadata.interface";

// Set up the axios instance with the base URL and default headers
const api = axios.create({
  baseURL: process.env.REACT_APP_GS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "code": process.env.REACT_APP_GS_API_KEY,
  },
});

const code = process.env.REACT_APP_GS_API_KEY;

// FARM APIS
export const getField = async (cropperRef: string): Promise<any> => {
  try {
    const response = await api.get<any>("field", {
      params: { cropperRef, code  },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch fields: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while fetching fields', error);
      return null;
    }
  }
};

export const updateField = async (field: FieldMetadata): Promise<any> => {
  try {
    const response = await api.put<FieldMetadata>("field", field, {
      params: { code  },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to update field: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while updating field', error);
      return null;
    }
  }
};

export const getFieldMetaData = async (fieldId: number): Promise<any> => {
  try {
    const response = await api.get<any>("field/metadata", {
      params: { fieldId, code  },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch field metadata: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while fetching field metadata', error);
      return null;
    }
  }
};

export const deactivateField = async (cropperRef: string): Promise<any> => {
  try {
    const response = await api.put<any>("field/deactivate", null, {
      params: { cropperRef, code  },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to deactivate field: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while deactivating field', error);
      return null;
    }
  }
};

// FIELDS APIS
export const getFields = async (partyId: string): Promise<any> => {
  try {
    const response = await api.get<any>("fields", {
      params: { partyId, code  },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch fields: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while fetching fields', error);
      return null;
    }
  }
};

export const getFieldsMetaData = async (partyId: string): Promise<any> => {
  try {
    const response = await api.get<any>("fields/metadata", {
      params: { partyId, code  },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch fields metadata: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while fetching fields metadata', error);
      return null;
    }
  }
};

// FARM LINK APIS
export const getLinkedFields = async (farmId: string): Promise<any> => {
  try {
    const response = await api.get<any>("farm/fields/linked", {
      params: { farmId, code },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch linked fields: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while fetching linked fields', error);
      return null;
    }
  }
};

export const getUnlinkedFields = async (partyId: string): Promise<any> => {
  try {
    const response = await api.get<any>("farm/fields/unlinked", {
      params: { partyId, code },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch unlinked fields: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while fetching unlinked fields', error);
      return null;
    }
  }
};

export const createFarmFieldLink = async (cropperRef: string, farmId: string): Promise<any> => {
  try {
    const response = await api.put<any>("farm/field/link", null, {
      params: { cropperRef, farmId, code },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to create farm-field link: ${error.response.data.message || error.message}`);
    } else {
      console.error('Something went wrong while creating farm-field link', error);
      return null;
    }
  }
};
