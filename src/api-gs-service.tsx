import axios from "axios";

// Set up the axios instance with the base URL and default headers
const api = axios.create({
  baseURL: 'https://func-geospatial-dev.azurewebsites.net/api',
  headers: {
    "Content-Type": "application/json",
    "apiKey": 'Rt0SPeq_qEgW965i4tqGMJ78nKjLRSmRmyYG9Ql3tpGDAzFuEWpToQ==',
  },
});

// FARM APIS
export const getField = async (cropperRef: string): Promise<any> => {
  try {
    const response = await api.get<any>("field", {
      params: { cropperRef },
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

export const updateField = async (field: any, cropperRef: string): Promise<any> => {
  try {
    const response = await api.put<any>("field", field, {
      params: { cropperRef },
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

export const getFieldMetaData = async (cropperRef: string): Promise<any> => {
  try {
    const response = await api.get<any>("field/metadata", {
      params: { cropperRef },
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
      params: { cropperRef },
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
      params: { partyId },
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
      params: { partyId },
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
export const getLinkedField = async (farmId: string): Promise<any> => {
  try {
    const response = await api.get<any>("farm/fields/linked", {
      params: { farmId },
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
    const code = 'Rt0SPeq_qEgW965i4tqGMJ78nKjLRSmRmyYG9Ql3tpGDAzFuEWpToQ==';
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
      params: { cropperRef, farmId },
    });
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
