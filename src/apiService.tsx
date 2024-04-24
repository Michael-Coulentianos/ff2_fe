import axios from "axios";
import { Note } from './models/note.interface';
import { NoteType } from './models/noteType.interface';
import { Farm } from './models/farm.interface';
import { Organization } from './models/organization.interface';
import { ApiResponse } from './models/apiResponse.interface';

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

//Organisation CRUD APIs
export const createOrganisation = async (note: Partial<Organization>): Promise<Organization> => {
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

export const getOrganizationById = async (farmId: number): Promise<Organization[]> => {
  try {
    const response = await api.get<ApiResponse<Organization[]>>("OrganizationById");
    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`API call unsuccessful: ${response.data.message}`);
    }
    
    return response.data.details;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to retrieve organization: ${error.response.data.message || error.message}`);
    } else {
      throw new Error('Something went wrong while retrieving organization');
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

export const getFarm = async (farmId: number): Promise<Farm[]> => {
  try {
    const response = await api.get<Farm[]>(`/GetFarm/${farmId}`);
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
    return response.data; 
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to delete farm: ${error.response.data}`);
    } else {
      throw new Error('Something went wrong while deleting the farm');
    }
  }
};

export const getOrganizationFarmById = async (farmId: number): Promise<Farm> => {
  try {
    const response = await api.get<ApiResponse<Farm>>("OrganizationFarmById");
    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`API call unsuccessful: ${response.data.message}`);
    }
    return response.data.details;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(`Failed to retrieve organiszation farm details: ${error.response.data.message || error.message}`);
      } else {
        throw new Error('Something went wrong while retrieving organiszation farm details');
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
      throw new Error('Something went wrong while creating the note');
    }
  }
};

export const getNotes = async (): Promise<Note[]> => {
  try {
      const response = await api.get<ApiResponse<Note[]>>("Notes");
      if (response.data.statusCode === 200 && response.data.message === "SUCCESS") {
          return response.data.details;
      } else {
          throw new Error(`Failed to fetch notes: ${response.data.message}`);
      }
  } catch (error: any) {
      if (error.response) {
          throw new Error(`API Error: ${error.response.status} ${error.response.data}`);
      } else if (error.request) {
          throw new Error('No response received');
      } else {
          throw new Error('Error setting up request');
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
    const response = await api.delete(`RemoveNote`, {
      data: {
        NoteId: noteId,
        AzureUserId: "fd78de01-3de4-4cd7-8080-27e9aa6b6008"
      }
    });

    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`Deletion failed with message: ${response.data.message}`);
    }

    if (response.data.details) {
      console.log('Deletion details:', response.data.details);
    }

  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to delete note: ${error.response.data.error || error.response.data}`);
    } else if (error.request) {
      throw new Error('No response received during the deletion process');
    } else {
      throw new Error(`Error during the deletion process: ${error.message}`);
    }
  }
};


//NoteType CRUD APIs
export const getNoteTypes = async (): Promise<NoteType[]> => {
  try {
    const response = await api.get<ApiResponse<NoteType[]>>("NoteTypes");
    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`API call unsuccessful: ${response.data.message}`);
    }
    
    return response.data.details;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch note types: ${error.response.data.message || error.message}`);
    } else {
      throw new Error('Something went wrong while fetching note types');
    }
  }
};