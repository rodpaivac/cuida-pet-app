
export type Pet = {
    id: number;
    name: string;
    breed: string;
    user_email: string;
    weight: number;
    species: string;
    image?: string;
    birthdate: Date;
    color: string;
    sex: string;
    castraded: boolean;
    microchipped: boolean;
};

export type Vaccine = {
    id: number,
    title: string,
    date: Date,
    vetName?: string,
    clinic?: string,
    nextDoseDate?: Date,
    lot?: string,
    description?: string;
}