export type PetDTO = {
    id?: string;
    name: string;
    breed: string;
    user_cpf: string;
    weight: string;
    species: Species | string;
    image?: string | null;
    birthdate: Date;
    color: string;
    sex: SexDTO;
    castrated: boolean;
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