export interface Activity {
  activityId: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  field: string;
  cost: number;
  contractWorkCost: number;
  noteDetail: string;
  activityCategoryId: number;
  seasonStageId: number;
  partyId: number;
  azureUserId: string;
  properties?: any;
  [key: string]: any;
}
