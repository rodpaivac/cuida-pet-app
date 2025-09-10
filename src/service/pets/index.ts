import { PetDTO } from "@dtos/PetDTO";
import { api } from "@service/api";


export const getPetsApi = async (userId: string): Promise<PetDTO[]> => {
    const response = await api.post("/pets", { cpf: userId });

    return response.data;
}

export const newPetApi = async (pet: PetDTO): Promise<boolean> => {
    const response = await api.post("/new-pet", {
        name: pet.name,
        breed: pet.breed,
        user_cpf: pet.user_cpf,
        weight: pet.weight,
        species: pet.species,
        image: pet.image,
        birthdate: pet.birthdate,
        color: pet.color,
        sex: pet.sex,
        castrated: pet.castrated,
        microchipped: pet.microchipped,
    });

    console.log('res status', response.status)

    return response.status === 201;
}

export const editPetApi = async (pet: PetDTO): Promise<PetDTO | undefined> => {
    const response = await api.put(`/edit-pet/${pet.id}`, {
        name: pet.name,
        breed: pet.breed,
        user_cpf: pet.user_cpf,
        weight: pet.weight,
        species: pet.species,
        image: pet.image,
        birthdate: pet.birthdate,
        color: pet.color,
        sex: pet.sex,
        castrated: pet.castrated,
        microchipped: pet.microchipped,
    });

    if (response.data) {
        return response.data;

    }
    return;
}

export const deletePetApi = async (id: string): Promise<boolean> => {
    const response = await api.delete(`/delete-pet/${id}`);

    return response.status === 200
}