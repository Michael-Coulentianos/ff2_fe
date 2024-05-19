interface note {
  noteId: number;
}

export interface Activity {
  activityId: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  field: string;
  cost: number;
  contractWorkCost: number;
  notes: note[];
  category: string;
  activityCategoryId: number;
  seasonStage: string;
  seasonStageId: number;
  organisationName: string;
  organizationId: number;
  partyId: number;
  activityStatusId: number;
  azureUserId: string;
  status: string;
  propery?: any;
  properties?: any;
}
