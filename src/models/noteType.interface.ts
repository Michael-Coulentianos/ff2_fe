export interface NoteType {
    noteTypeId: number;
    name: string;
    description: string;
    properties: Array<{ key: string, value: string }>;
  }