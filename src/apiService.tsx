import axios from "axios";
import { CreateOrganization } from "./models/createOrganization.interface";
import { LegalEntity } from "./models/legalEntity.interface";
import { NoteType } from "./models/noteType.interface";
import { ResponseApi } from "./models/ResponseApi.interface";
import { UserProfile } from "./models/userProfile.interface";
import { Activity } from "./models/activity.interface";
import { Farm } from "./models/farm.interface";
import { Note } from "./models/note.interface";
import { Organization } from "./models/organization.interface";

const api = axios.create({
  baseURL: process.env.REACT_APP_FFM_BASE_URL + '/api/',
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_API_KEY,
  },
});

let azureUserId = '';

export const setAzureUserId = (userId) => {
  api.interceptors.request.use(config => {
    config.headers['X-AzureUserId'] = userId;
    return config;
  }, error => {
    return Promise.reject(error);
  });

  azureUserId = userId;
}

//User Profile CRUD APIs
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get<ResponseApi<UserProfile>>("UserDetails");
    
    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`API call unsuccessful: ${response.data.message}`);
    }
    return response.data.details;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to retrieve user details: ${error.response.data.message || error.message}`);
    } else {
      throw new Error('Something went wrong while retrieving user detials');
    }
  }
};

export const updateUserProfile = async (userProfile: Partial<UserProfile>): Promise<ResponseApi<string>> => {
  try {
    userProfile.azureUserId = azureUserId ? azureUserId : '';
    const response = await api.put<ResponseApi<string>>("/UpdateUserProfile", userProfile);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to update user details: ${error.response.data}`);
    } else {
      throw new Error("Something went wrong while updating the user details");
    }
  }
};

//Organisation CRUD APIs
export const createOrganization = async (organization: Partial<CreateOrganization>): Promise<CreateOrganization> => {
  try {
    organization.azureUserId = azureUserId ? azureUserId : '';

    console.log(organization);
    const response = await api.post<ResponseApi<any>>("/CreateOrganization", organization);
    console.log(response);
    
    return response.data.details;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to create organization: ${error.response.data}`);
    } else {
      throw new Error("Something went wrong while creating the organization");
    }
  }
};

export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await api.get<ResponseApi<Organization[]>>("Organizations");
    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`API call unsuccessful: ${response.data.message}`);
    }

    return response.data.details;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to retrieve organizations: ${error.response.data.message || error.message}`);
    } else {
      throw new Error('Something went wrong while retrieving organizations');
    }
  }
};

export const updateOrganization = async (organization: Partial<Organization>): Promise<ResponseApi<string>> => {
  try {
    organization.azureUserId = azureUserId ? azureUserId : '';
    const response = await api.put<ResponseApi<string>>("/UpdateOrganization", organization);
    console.log(organization);
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to update organization: ${error.response.data}`);
    } else {
      throw new Error("Something went wrong while updating the organization");
    }
  }
};

export const deleteOrganization = async (partyId: number): Promise<void> => {
  try {
    const response = await api.delete(`RemoveOrganization`, {
      data: {
        PartyId: partyId,
        AzureUserId: azureUserId,
      },
    });

    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`Deletion failed with message: ${response.data.message}`);
    }

    if (response.data.details) {
      console.log('Deletion details:', response.data.details);
    }

  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to delete organization: ${error.response.data.error || error.response.data}`);
    } else if (error.request) {
      throw new Error('No response received during the deletion process');
    } else {
      throw new Error(`Error during the deletion process: ${error.message}`);
    }
  }
};

export const getOrganizationById = async (OrganizationId: number): Promise<Organization[]> => {
  try {
    const config = {
      headers: {
        "x-OrganizationId": OrganizationId
      }
    };

    const response = await api.get<ResponseApi<Organization[]>>("OrganizationById", config);
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
export const createFarm = async (farm: Partial<Farm>): Promise<Farm> => {
  try {
    const response = await api.post<ResponseApi<Farm>>("/CreateOrganization",farm);
    return response.data.details;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to create farm: ${error.response.data}`);
    } else {
      throw new Error("Something went wrong while creating the farm");
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
      throw new Error("Something went wrong while retrieving the farm");
    }
  }
};

export const updateFarm = async (farm: Farm): Promise<Farm> => {
  try {
    const response = await api.put<Farm>(`/UpdateFarm/${farm.farmId}`, farm);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to update farm: ${error.response.data}`);
    } else {
      throw new Error("Something went wrong while updating the farm");
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
    const config = {
      headers: {
        "x-FarmId": farmId
      }
    };
    
    const response = await api.get<ResponseApi<Farm>>("OrganizationFarmById", config);
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
export const createNote = async(note: Partial<any>): Promise<ResponseApi<any>> => {
  
  const formData = new FormData();
  formData.append('NoteTypeId', note.noteTypeId ?? '');
  formData.append('Title', note.title ?? '');
  formData.append('Location', note.location ?? '');
  formData.append('Description', note.description ?? '');
  formData.append('PartyId', note.partyId ?? '');
  formData.append('AzureUserId', azureUserId);
  formData.append('Property', note.property);

  if(note.attachment){
    formData.append('Attachment', note.attachment);
  }
  try {
    const response = await fetch('https://func-farmmanagement-api-dev.azurewebsites.net/api/AddNote', {
      method: 'POST',
      headers: {
        'x-api-key': '7E80B3AB-A941-4C36-BA76-6ECA579F3CCB',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result: ResponseApi<string> = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error during note create:', error);
    throw new Error(`Error creating note: ${error.message || 'Unknown error'}`);
  }
};

export const getNotes = async (): Promise<Note[]> => {
  try {
      const response = await api.get<ResponseApi<Note[]>>("Notes");
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

export const getNoteById = async (noteId: number): Promise<Note> => {
  try {
    const config = {
      headers: {
        "x-NoteId": noteId
      }
    };

      const response = await api.get<ResponseApi<Note>>("NoteById", config);
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

export const updateNote = async(note: Partial<any>): Promise<ResponseApi<any>> => {
  console.log(note);
  const formData = new FormData();
  formData.append('NoteTypeId', note.noteTypeId ?? '');
  formData.append('NoteId', note.noteId ?? '');
  formData.append('Title', note.title ?? '');
  formData.append('Location', note.location ?? '');
  formData.append('Description', note.description ?? '');
  formData.append('PartyId', note.partyId ?? '');
  formData.append('AzureUserId', azureUserId);
  formData.append('Property', note.property);
  
  try {
    const response = await fetch('https://func-farmmanagement-api-dev.azurewebsites.net/api/UpdateNote', {
      method: 'PUT',
      headers: {
        'x-api-key': '7E80B3AB-A941-4C36-BA76-6ECA579F3CCB',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'User-Agent': 'YourAppNameHere'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result: ResponseApi<string> = await response.json();
    result.details = note.noteId ?? '';

    console.log('Update successful:', result);
    return result;
  } catch (error: any) {
    console.error('Error during note update:', error);
    throw new Error(`Error updating note: ${error.message || 'Unknown error'}`);
  }
};

export const deleteNote = async (noteId: number): Promise<void> => {
  try {
    const response = await api.delete(`RemoveNote`, {
      data: {
        NoteId: noteId,
        AzureUserId: azureUserId,
      },
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
    const response = await api.get<ResponseApi<NoteType[]>>("NoteTypes");
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

export const getNoteTypeById = async (noteTypeId: number): Promise<NoteType> => {
  try {
    const config = {
      headers: {
        "x-NoteTypeId": noteTypeId
      }
    };

    const response = await api.get<ResponseApi<NoteType>>("NoteTypeById", config);
    if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
      throw new Error(`API call unsuccessful: ${response.data.message}`);
    }

    return response.data.details;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`Failed to fetch note type: ${error.response.data.message || error.message}`);
    } else {
      throw new Error('Something went wrong while fetching note type');
    }
  }
};

//LegalEntities CRUD APIs
export const getLegalEntities = async (): Promise<LegalEntity[]> => {
  try {
      const response = await api.get<ResponseApi<LegalEntity[]>>("LegalEntities");

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }

      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to fetch legal entity types: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while fetching legal entity types', error);
          return []; 
      }
  }
};

//Activity CRUD APIs
export const getActivityCategories = async (): Promise<any[]> => {
  try {
      const response = await api.get<ResponseApi<any[]>>("ActivityCategories");

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }

      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to fetch legal entity types: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while fetching legal entity types', error);
          return []; 
      }
  }
};

export const getSeasonStages = async (): Promise<any[]> => {
  try {
      const response = await api.get<ResponseApi<any[]>>("SeasonStages");

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }

      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to fetch legal entity types: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while fetching legal entity types', error);
          return []; 
      }
  }
};

export const getActivityStatuses = async (): Promise<any[]> => {
  try {
      const response = await api.get<ResponseApi<any[]>>("ActivityStatuses");

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }
      
      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to fetch legal entity types: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while fetching legal entity types', error);
          return []; 
      }
  }
};

export const getActivityById = async (): Promise<any[]> => {
  try {
      const response = await api.get<ResponseApi<any[]>>("ActivityById");

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }
      
      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to fetch legal entity types: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while fetching legal entity types', error);
          return []; 
      }
  }
};

export const getActivities = async (): Promise<Activity[]> => {
  try {
      const response = await api.get<ResponseApi<Activity[]>>("Activities");

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }
      
      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to fetch activities: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while fetching activities', error);
          return []; 
      }
  }
};

export const createActivity = async (activity: Partial<any>): Promise<any[]> => {
  try {
    activity.azureUserId = azureUserId;
    console.log(activity);
      const response = await api.post<ResponseApi<any>>("CreateActivity", activity);
      console.log(response);

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }

      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to create a activity: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while creating activity', error);
          return []; 
      }
  }
};

export const updateActivity = async (activity: Partial<Activity>): Promise<any[]> => {
  try {
      const response = await api.post<ResponseApi<any>>("ActivityStatuses", activity);

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }

      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to fetch legal entity types: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while fetching legal entity types', error);
          return []; 
      }
  }
};

export const deleteActivity = async (activityId: number): Promise<void> => {
  try {
    const response = await api.delete(`RemoveActivity`, {
      data: {
        ActivityId: activityId,
        AzureUserId: azureUserId,
      },
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

//Field iFrame APIs
export const getFieldiFrame = async (activityId: string): Promise<any[]> => {
  try {
      const response = await api.post<ResponseApi<any>>("ActivityStatuses");

      if (response.data.statusCode !== 200 || response.data.message !== "SUCCESS") {
          throw new Error(`API call unsuccessful: ${response.data.message}`);
      }

      return response.data.details || [];
  } catch (error: any) {
      if (error.response && error.response.data) {
          throw new Error(`Failed to fetch legal entity types: ${error.response.data.message || error.message}`);
      } else {
          console.error('Something went wrong while fetching legal entity types', error);
          return []; 
      }
  }
};