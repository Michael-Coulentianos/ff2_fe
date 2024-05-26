export interface Note {
    noteId: string;
    noteUniqueIdentifier: string;
    title: string;
    partyId: string;
    location: string;
    description: string;
    attachment: string;
    createdDate: string;
    modifiedDate?: string;
    deletedDate?: string;
    createdBy: string;
    modifiedBy?: string;
    deletedBy?: string
    noteTypeId: string; 
    property?: any;
    [key: string]: any;
  }