export type PetDTO = {
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