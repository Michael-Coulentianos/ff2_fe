interface Metadata {
    irrDry: string; 
}

export interface FieldMetadata {
    cropperRef?: string;
    fieldId?: number;
    coords: string;
    partyId: string;
    name: string;
    metadata: Metadata;
} 