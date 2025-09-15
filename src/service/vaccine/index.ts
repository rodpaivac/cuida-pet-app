import { VaccineDTO } from "@dtos/VaccineDTO";
import { api } from "@service/api";


export const getVaccinesApi = async (petId: string): Promise<VaccineDTO[]> => {
    const response = await api.get(`/vaccines/${petId}`);
    console.log(response.data)

    return response.data;
}

export const newVaccineApi = async (vaccine: VaccineDTO) => {
    const response = await api.post('/vaccine', {
        pet_id: vaccine.pet_id,
        title: vaccine.title,
        date: vaccine.date,
        vetname: vaccine.vetname,
        clinic: vaccine.clinic,
        nextdosedate: vaccine.nextdosedate,
        lot: vaccine.lot,
        description: vaccine.description,
        nextdosetaken: vaccine.nextdosetaken,
    });

    if (response.data) {
        return response.data.vaccine;
    }
}

export const editVaccineApi = async (vaccine: VaccineDTO) => {
    const response = await api.put(`/vaccine/${vaccine.id}`, {
        pet_id: vaccine.pet_id,
        title: vaccine.title,
        date: vaccine.date,
        vetname: vaccine.vetname,
        clinic: vaccine.clinic,
        nextdosedate: vaccine.nextdosedate,
        lot: vaccine.lot,
        description: vaccine.description,
        nextdosetaken: vaccine.nextdosetaken,
    });

    if (response.data) {
        return response.data.vaccine;
    }
}

export const repeatVaccineApi = async (newDose: VaccineDTO, previousDoseId: string) => {
    try {
        await newVaccineApi(newDose);
        const response = await api.patch(`/vaccine/${previousDoseId}/nextdosetaken`);

    } catch (error) {
        console.log('error', error)
    }
}


export const deleteVaccineApi = async (id: string): Promise<boolean> => {
    const response = await api.delete(`/delete-vaccine/${id}`);

    return response.status === 200
}

export const getNextVaccinesApi = async (userCpf: string) => {
    try {
        const response = await api.post("/vaccine/next", { cpf: userCpf });
        console.log("->> nextVaccines", response);


        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.log('error', error)
    }
}
