export type VaccineDTO = {
    id: number,
    title: string,
    date: Date,
    vetName?: string,
    clinic?: string,
    nextDoseDate?: Date,
    lot?: string,
    description?: string;
}