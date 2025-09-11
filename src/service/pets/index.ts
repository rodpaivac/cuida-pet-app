import { PetDTO } from "@dtos/PetDTO";
import { api } from "@service/api";


export const getPetsApi = async (userId: string): Promise<PetDTO[]> => {
    const response = await api.post("/pets", { cpf: userId });

    return response.data;
}

export const newPetApi = async (pet: PetDTO, image: FormData | null): Promise<boolean> => {

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

    const id = response.data.id;

    if (image) {
        try {
            await updloadPetImageApi(id, image);

        } catch (error) {
            console.log(error)
        }
    }

    return response.status === 201;
}

export const editPetApi = async (pet: PetDTO, image: FormData | null): Promise<PetDTO | undefined> => {
    if (!pet.id) {
        return;
    }

    let newImageUrl = null;

    if (image) {
        try {
            newImageUrl = await updloadPetImageApi(pet.id, image);

        } catch (error) {
            console.log(error)
        }
    }

    const response = await api.put(`/edit-pet/${pet.id}`, {
        name: pet.name,
        breed: pet.breed,
        user_cpf: pet.user_cpf,
        weight: pet.weight,
        species: pet.species,
        image: newImageUrl ?? pet.image,
        birthdate: pet.birthdate,
        color: pet.color,
        sex: pet.sex,
        castrated: pet.castrated,
        microchipped: pet.microchipped,
    });



    console.log('edit pet', response.data)

    if (response.data) {
        return response.data;

    }
    return;
}

export const deletePetApi = async (id: string): Promise<boolean> => {
    const response = await api.delete(`/delete-pet/${id}`);

    return response.status === 200
}

const updloadPetImageApi = async (petId: string, image: FormData) => {
    if (!petId || !image) {
        return;
    }
    const response = await api.post(`/upload-pet-image/${petId}`, image,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    if (response.data.url) {
        return response.data.url
    }
}