import { PetNextVaccineDTO, VaccineDTO } from "@dtos/VaccineDTO";
import { useAuth } from "@hooks/useAuth";
import {
  deleteVaccineApi,
  editVaccineApi,
  getNextVaccinesApi,
  getVaccinesApi,
  newVaccineApi,
  repeatVaccineApi,
} from "@service/vaccine";
import { createContext, ReactNode, useState } from "react";
import { NEXT_VACCINES, VACCINES } from "src/mock";

export type VaccineContextDataProps = {
  selectedVaccine: VaccineDTO;
  selectVaccine: (vaccine: VaccineDTO) => void;
  selectedPetVaccines: VaccineDTO[];
  fetchPetVaccines: (petId: string) => void;
  petsNextVaccines: PetNextVaccineDTO[];
  fetchPetsNextVaccines: () => void;
  loading: boolean;
  newVaccine: (vaccine: VaccineDTO) => void;
  editVaccine: (vaccine: VaccineDTO) => void;
  repeatVaccine: (newDose: VaccineDTO, previousDoseId: string) => void;
  deleteVaccine: (id: string, petId: string) => void;
};

type VaccineContextProviderProps = {
  children: ReactNode;
};

export const VaccineContext = createContext<VaccineContextDataProps>(
  {} as VaccineContextDataProps
);

export function VaccineContextProvider({
  children,
}: VaccineContextProviderProps) {
  const { user } = useAuth();

  const [selectedVaccine, setSelectedVaccine] = useState<VaccineDTO>(
    {} as VaccineDTO
  );
  const [selectedPetVaccines, setSelectedPetVaccines] = useState<VaccineDTO[]>(
    []
  );

  const [petsNextVaccines, setPetsNextVaccines] = useState<PetNextVaccineDTO[]>(
    []
  );

  const [loading, setLoading] = useState(false);

  function selectVaccine(vaccine: VaccineDTO) {
    setSelectedVaccine(vaccine);
  }

  async function newVaccine(vaccine: VaccineDTO) {
    try {
      setLoading(true);
      const response = await newVaccineApi(vaccine);
      fetchPetVaccines(vaccine.pet_id);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  async function editVaccine(vaccine: VaccineDTO) {
    if (!vaccine.id || !vaccine.pet_id) {
      return;
    }
    try {
      setLoading(true);
      const response = await editVaccineApi(vaccine);
      await fetchPetVaccines(vaccine.pet_id);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  async function repeatVaccine(newDose: VaccineDTO, previousDoseId: string) {
    try {
      setLoading(true);
      await repeatVaccineApi(newDose, previousDoseId);
      await fetchPetVaccines(newDose.pet_id);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteVaccine(id: string, petId: string) {
    try {
      setLoading(true);
      await deleteVaccineApi(id);
      await fetchPetVaccines(petId);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function fetchPetVaccines(petId: string) {
    try {
      setLoading(true);
      const response = await getVaccinesApi(petId);
      setSelectedPetVaccines(response);
    } catch (error) {
      console.log("error", error);
      setSelectedPetVaccines([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPetsNextVaccines() {
    try {
      const response = await getNextVaccinesApi(user.cpf);
      setPetsNextVaccines(response);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <VaccineContext.Provider
      value={{
        selectedVaccine,
        selectVaccine,
        selectedPetVaccines,
        fetchPetVaccines,
        petsNextVaccines,
        fetchPetsNextVaccines,
        loading,
        newVaccine,
        editVaccine,
        repeatVaccine,
        deleteVaccine,
      }}
    >
      {children}
    </VaccineContext.Provider>
  );
}
