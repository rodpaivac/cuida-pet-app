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

export type PetNextVaccineDTO = {
    //month/year
    title: string;
    //day + pet name + vaccine name
    data: string[]
}