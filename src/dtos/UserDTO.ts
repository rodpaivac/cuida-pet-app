export type UserDTO = {
    name: string;
    email: string;
    avatar: string | null;
    phone: string;
    birthdate: Date;
    gender: string | GenderDTO;
    cpf: string;
    password: string | null;
}

export type GenderDTO = "man" | "woman" | "non-binary" | "other";
