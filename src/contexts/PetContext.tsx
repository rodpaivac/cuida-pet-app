import { createContext, ReactNode, useEffect, useState } from "react";

import { PetDTO } from "@dtos/PetDTO";
import { useAuth } from "@hooks/useAuth";
import {
  deletePetApi,
  editPetApi,
  getPetsApi,
  newPetApi,
} from "@service/pets/index";

export type PetContextDataProps = {
  selectedPet: PetDTO;
  selectPet: (pet: PetDTO) => void;
  pets: PetDTO[];
  fetchPets: () => void;
  addPet: (pet: PetDTO) => void;
  editPet: (pet: PetDTO) => void;
  deletePet: (id: string) => void;
};

type PetContextProviderProps = {
  children: ReactNode;
};

export const PetContext = createContext<PetContextDataProps>(
  {} as PetContextDataProps
);

export function PetContextProvider({ children }: PetContextProviderProps) {
  const [selectedPet, setSelectedPet] = useState<PetDTO>({} as PetDTO);
  const [pets, setPets] = useState<PetDTO[]>([]);

  const { user } = useAuth();

  function selectPet(pet: PetDTO) {
    setSelectedPet(pet);
  }

  async function fetchPets() {
    const response = await getPetsApi(user.cpf);
    setPets(response);
  }

  async function addPet(pet: PetDTO) {
    const response = await newPetApi(pet);
    await fetchPets();
    return response;
  }

  async function editPet(pet: PetDTO) {
    const response = await editPetApi(pet);
    if (response) {
      setSelectedPet(response);
    }
    await fetchPets();
    return response;
  }

  async function deletePet(id: string) {
    const response = await deletePetApi(id);
    await fetchPets();
  }

  return (
    <PetContext.Provider
      value={{
        selectedPet,
        selectPet,
        pets,
        fetchPets,
        addPet,
        editPet,
        deletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
