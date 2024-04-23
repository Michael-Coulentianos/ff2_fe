import axios from "axios";
import { Note } from './models/note.interface';
import { NoteType } from './models/noteType.interface';
import { Farm } from './models/farm.interface';
import { Organization } from './models/organization.interface';
const api = axios.create({
  baseURL: "https://func-farmmanagement-api-dev.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "7E80B3AB-A941-4C36-BA76-6ECA579F3CCB",
    "X-AzureUserId": "fd78de01-3de4-4cd7-8080-27e9aa6b6008",
  },
});
 
export const createOrganization = async (organization: Organization) => {
  try {
    const response = await api.post("/CreateOrganization", organization);
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

export const getAllNotes = async () => {
  try {
    const response = await api.get("Notes", {});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// export const createOrganization = async () => {
//   try {
//     const response = await api.post("/CreateOrganization", {
//       Name: "ZZ2 Farms - Azure",
//       VATNumber: "VAT2024/01/24",
//       AzureUserId: "fd78de01-3de4-4cd7-8080-27e9aa6b6008",
//       LegalEntityTypeId: 1,
//       RegistrationNumber: "Reg2024/01/24",
//       ContactPerson: {
//         FullName: "Elias Siboyane",
//         ContactNumber: "0730531673",
//         EmailAddress: "elias.s@IQLogistica.com",
//       },
//       PhysicalAddress: {
//         AddressLine1: "474 Lynnwood Street",
//         AddressLine2: "Lynnwood",
//         City: "Pretoria",
//         Code: "0015",
//       },
//     });
//     return response.data;
//   } catch (error: any) {
//     throw new Error(error.response.data);
//   }
// };

//Organisation CRUD APIs
export const createOrganisation = async (): Promise<Organization> => {
  const newOrgData: Organization = {
    name: "Ty Ty Agri",
    vatNumber: "VAT2024/04/24",
    azureUserId: "fd78de01-3de4-4cd7-8080-27e9aa6b6008",
    legalEntityTypeId: 1,
    registrationNumber: "Reg2024/04/24",
    contactPerson: {
      fullName: "Tyron de Beer",
      contactNumber: "0603177077",
      emailAddress: "tyron.debeer@iqlogistica.com",
    },
    physicalAddress: {
      addressLine1: "474 Lynnwood Street",
      addressLine2: "Lynnwood",
      city: "Pretoria",
      code: "0015",
    }
  };

  try {
    const response = await api.post<Organization>("/CreateOrganization", newOrgData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to create organization: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while creating the organization');
    }
  }
};

export const getOrganisations = async (): Promise<Organization[]> => {
  try {
    const response = await api.get<Organization[]>("Organizations");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to retrieve organizations: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while retrieving organizations');
    }
  }
};


export const updateOrganisation = async (
  organizationId: number,
  details: Partial<Organization>
): Promise<Organization> => {
  try {
    const response = await api.put<Organization>(
      `/UpdateOrganizationDetails/${organizationId}`,
      details
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to update organization details: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while updating the organization details');
    }
  }
};

export const deleteOrganization = async (organizationId: number): Promise<void> => {
  try {
    const response = await api.delete<void>(`/DeleteOrganization/${organizationId}`);
    // Normally, delete operations might not return a meaningful body, adjust this based on your API's implementation
    return response.data; // You can also choose to return nothing and simply resolve the promise
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to delete organization: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while deleting the organization');
    }
  }
};

//Farm CRUD APIs
export const createFarm = async (): Promise<Farm> => {
  const newFarmData: Omit<Farm, 'id'> = {
    name: "JJ Farms",
    organizationId: 6,
    azureUserId: "AZURE_USER_ID"
  };
  
  try {
    const response = await api.post<Farm>("/CreateFarm", newFarmData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to create farm: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while creating the farm');
    }
  }
};

export const getFarm = async (farmId: number): Promise<Farm> => {
  try {
    const response = await api.get<Farm>(`/GetFarm/${farmId}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to retrieve farm: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while retrieving the farm');
    }
  }
};

export const updateFarm = async (farm: Farm): Promise<Farm> => {
  try {
    const response = await api.put<Farm>(`/UpdateFarm/${farm.id}`, farm);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to update farm: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while updating the farm');
    }
  }
};

export const deleteFarm = async (farmId: number): Promise<void> => {
  try {
    const response = await api.delete<void>(`/DeleteFarm/${farmId}`);
    return response.data; // Usually, delete operations might not return data, adjust as per your API's design
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to delete farm: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while deleting the farm');
    }
  }
};

//Note CRUD APIs
export const createNote = async (note: Partial<Note>): Promise<Note> => {
  try {
    const response = await api.post<Note>("AddNote", note);
    return response.data; // Assuming the API returns the newly created note
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to create note: ${error.response.data}`);
    } else {
      // This handles cases where the error may not be related to the HTTP response, providing a fallback error message
      throw new Error('Something went wrong while creating the note');
    }
  }
};

export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await api.get<Note[]>("Notes");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch notes: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while fetching notes');
    }
  }
};

export const updateNote = async (noteChanges: Partial<Note> & { id: number }): Promise<Note> => {
  try {
    const response = await api.put<Note>("UpdateNote", noteChanges);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to update note: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while updating the note');
    }
  }
};

export const deleteNote = async (noteId: string | number): Promise<void> => {
  try {
    const response = await api.delete(`RemoveNote/${noteId}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to delete note: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while deleting the note');
    }
  }
};

//NoteType CRUD APIs
export const getNoteTypes = async (): Promise<NoteType[]> => {
  try {
    const response = await api.get<{ responseId: string, statusCode: number, message: string, details: NoteType[], httpStatusCode: number }>("NoteTypes");
    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`API call unsuccessful: ${response.data.message}`);
    }
    
    return response.data.details;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch notes: ${error.response.data.message || error.message}`);
    } else {
      throw new Error('Something went wrong while fetching notes');
    }
  }
};