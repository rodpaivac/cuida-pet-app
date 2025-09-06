import { PetDTO } from "@dtos/PetDTO";
import { api } from "./api";
import { PETS } from "src/mock";

export const getPets = async (userId: string): Promise<PetDTO[]> => {
    // const response = await api.get("/pets");
    // return response.data;

    return PETS;

}