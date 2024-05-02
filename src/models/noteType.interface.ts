interface Property {
  key: string;
  value: string;
}

export interface NoteType {
    noteTypeId: number;
    name: string;
    description: string;
    properties: Property;
  }