export type VaccineDTO = {
    id: string,
    title: string,
    date: Date,
    vetName?: string,
    clinic?: string,
    nextDoseDate?: Date,
    lot?: string,
    description?: string;
    nextDoseTaken?: boolean;
}