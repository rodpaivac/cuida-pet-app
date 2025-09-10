import { NotificationDTO } from "@dtos/NotificationDTO";
import { PetDTO } from "@dtos/PetDTO";
import { GenderDTO, UserDTO } from "@dtos/UserDTO";
import { PetNextVaccineDTO, VaccineDTO } from "@dtos/VaccineDTO";

export const PETS: PetDTO[] = [{
    id: '1',
    name: "Urias",
    breed: "SRD",
    user_cpf: "11499367627",
    weight: "16.5",
    species: "cão",
    image: undefined,
    birthdate: new Date("2019-01-01"),
    color: "caramelo",
    sex: "fêmea",
    castrated: false,
    microchipped: false,
},
{
    id: '2',
    name: "Alfredo",
    breed: "SRD",
    user_cpf: "11499367627",
    weight: "3",
    species: "gato",
    image: undefined,
    birthdate: new Date("2021-01-01"),
    color: "preto",
    sex: "macho",
    castrated: true,
    microchipped: false,
},
{
    id: '3',
    name: "Lola",
    breed: "SRD",
    user_cpf: "11499367627",
    weight: "5",
    species: "cão",
    image: undefined,
    birthdate: new Date("2017-01-01"),
    color: "caramelo",
    sex: "fêmea",
    castrated: true,
    microchipped: false,
},
{
    id: '4',
    name: "Pretinha",
    breed: "SRD",
    user_cpf: "11499367627",
    weight: "11",
    species: "cão",
    image: undefined,
    birthdate: new Date("2018-01-01"),
    color: "preto",
    sex: "fêmea",
    castrated: true,
    microchipped: false,
},
{
    id: '5',
    name: "Bob",
    breed: "Poodle",
    user_cpf: "11499367627",
    weight: "5",
    species: "cão",
    image: undefined,
    birthdate: new Date("2024-01-01"),
    color: "branco",
    sex: "macho",
    castrated: false, // não foi informado como castrado
    microchipped: true,
},
];

export const USER: UserDTO = {
    id: "1",
    name: "Rodrigo Paiva",
    email: "rodpaivac@gmail.com",
    avatar:
        "https://img.freepik.com/premium-photo/ai-generated-images-build-user-profile-page_1290175-101.jpg",
    phone: "31989120414",
    birthdate: new Date("1995-09-20"),
    gender: "man" as GenderDTO,
    cpf: '11499367627'
};

export const VACCINES: VaccineDTO[] = [
    {
        id: '1',
        title: "Antirrábica",
        date: new Date("2025-03-15"),
        vetName: "Dra. Ana Silva",
        clinic: "Clínica Vet Vida",
        nextDoseDate: new Date("2026-03-15"),
        lot: "L12345",
        nextDoseTaken: false
    },

    {
        id: '2',
        title: "V10",
        date: new Date("2024-10-01"),
        vetName: "Dr. Carlos Pereira",
        clinic: "Amigos dos Pets",
        nextDoseDate: new Date("2025-10-01"),
        lot: "V10-5678",
        description: "Vacina gerou inchaço na pele",
        nextDoseTaken: false
    },
    {
        id: '5',
        title: "Antirrábica",
        date: new Date("2024-03-15"),
        vetName: "Dra. Ana Silva",
        clinic: "Clínica Vet Vida",
        nextDoseDate: new Date("2025-03-15"),
        lot: "L12345",
        nextDoseTaken: true
    },
    {
        id: '3',
        title: "Giárdia",
        date: new Date("2023-08-05"),
        nextDoseDate: new Date("2024-08-05"),
        clinic: "Pet+ Saúde",
        lot: "G-00921",
        nextDoseTaken: false
    },
    {
        id: '4',
        title: "Leishmaniose",
        date: new Date("2022-09-20"),
        nextDoseDate: new Date("2023-09-20"),
        clinic: "Pet+ Saúde",
        lot: "G-00921",
        nextDoseTaken: false
    },
];

export const NOTIFICATIONS: NotificationDTO[] = [
    {
        id: '1',
        title: "Vacina próxima",
        message: "Urias precisa tomar uma vacina em breve.",
        date: new Date()
    },
    {
        id: '2',
        title: "Vacina atrasada",
        message: "Alfredo está com uma vacina atrasada.",
        date: new Date()
    }
]

export const NEXT_VACCINES: PetNextVaccineDTO[] = [
    {
        title: 'Novembro/ 2025',
        data: ['10 - Urias: Antirrábica', '30 - Alfredo: V10']
    },
    {
        title: 'Janeiro/ 2026',
        data: ['07 - Bob: Antirrábica']
    },
    {
        title: 'Março/ 2026',
        data: ['16 - Pretinha: Leishmaniose']
    },
    {
        title: 'Agosto/ 2026',
        data: ['12 - Lola: Antirrábica']
    },
    {
        title: 'Setembro/ 2026',
        data: ['07 - Alfredo: Antirrábica']
    },

    {
        title: 'Outubro/ 2026',
        data: ['07 - Alfredo: Antirrábica']
    },
    {
        title: 'Novembro/ 2026',
        data: ['07 - Alfredo: Antirrábica']
    },
    {
        title: 'Dezembro/ 2026',
        data: ['07 - Alfredo: Antirrábica']
    },
    {
        title: 'Janeiro/ 2027',
        data: ['07 - Alfredo: Antirrábica']
    }
]