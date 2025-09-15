export type VaccineDTO = {
    pet_id: string;
    id?: string,
    title: string,
    date: Date,
    vetname?: string,
    clinic?: string,
    nextdosedate?: Date,
    lot?: string,
    description?: string;
    nextdosetaken?: boolean;
}

export type PetNextVaccineDTO = {
    //month de year
    title: string;
    //day - pet name: vaccine name
    data: string[]
}