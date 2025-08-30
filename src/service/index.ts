import { api } from "./api";
import { Pet } from "./api.types";

export const getPets = async (userId: string): Promise<Pet[]> => {
    // const response = await api.get("/pets");
    // return response.data;
    const mock: Pet[] = [{
        id: 1,
        name: "Urias",
        breed: "SRD",
        user_email: "exemplo@teste.com",
        weight: 16.5,
        species: "cão",
        image: undefined,
        birthdate: new Date("2019-01-01"),
        color: "caramelo",
        sex: "fêmea",
        castraded: false,
        microchipped: false,
    },
    {
        id: 2,
        name: "Alfredo",
        breed: "SRD",
        user_email: "exemplo@teste.com",
        weight: 3,
        species: "gato",
        image: undefined,
        birthdate: new Date("2021-01-01"),
        color: "preto",
        sex: "macho",
        castraded: true,
        microchipped: false,
    },
    {
        id: 3,
        name: "Lola",
        breed: "SRD",
        user_email: "exemplo@teste.com",
        weight: 5,
        species: "cão",
        image: undefined,
        birthdate: new Date("2017-01-01"),
        color: "caramelo",
        sex: "fêmea",
        castraded: true,
        microchipped: false,
    },
    {
        id: 4,
        name: "Pretinha",
        breed: "SRD",
        user_email: "exemplo@teste.com",
        weight: 11,
        species: "cão",
        image: undefined,
        birthdate: new Date("2018-01-01"),
        color: "preto",
        sex: "fêmea",
        castraded: true,
        microchipped: false,
    },
    {
        id: 5,
        name: "Bob",
        breed: "Poodle",
        user_email: "exemplo@teste.com",
        weight: 5,
        species: "cão",
        image: undefined,
        birthdate: new Date("2024-01-01"),
        color: "branco",
        sex: "macho",
        castraded: false, // não foi informado como castrado
        microchipped: true,
    },
    ]
    return mock;

}