export type UserDTO = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    phone: string;
    birthdate: Date;
    gender: GenderDTO;
    cpf: string;
}

export type GenderDTO = "man" | "woman" | "non-binary" | "other";
