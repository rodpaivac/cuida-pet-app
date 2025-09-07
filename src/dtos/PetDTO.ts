export type PetDTO = {
    id: string;
    name: string;
    breed: string;
    user_email: string;
    weight: string;
    species: Species;
    image?: string;
    birthdate: Date;
    color: string;
    sex: string;
    castraded: boolean;
    microchipped: boolean;
};

export type SexDTO = "macho" | "fêmea";


export type Species = "cão"
    | "gato"
    | "ave"
    | "roedor"
    | "lagomorfo"
    | "réptil"
    | "peixe"
    | "anfíbio"
    | "invertebrado"
    | "equino"
    | "caprino"
    | "suíno"
    | "outro";