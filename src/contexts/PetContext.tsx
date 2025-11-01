import { createContext, ReactNode, useEffect, useState } from "react";

import { PetDTO } from "@dtos/PetDTO";
import { useAuth } from "@hooks/useAuth";
import {
  deletePetApi,
  editPetApi,
  getPetsApi,
  newPetApi,
} from "@service/pets/index";
import { UploadImageData } from "@components/CPImagePicker";

export type PetContextDataProps = {
  selectedPet: PetDTO;
  selectPet: (pet: PetDTO, color: string) => void;
  pets: PetDTO[];
  fetchPets: () => void;
  addPet: (pet: PetDTO, image: UploadImageData | null) => void;
  editPet: (pet: PetDTO, image: UploadImageData | null) => void;
  deletePet: (id: string) => void;
  backgroundColor: string;
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
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  const { user } = useAuth();

  function selectPet(pet: PetDTO, color: string) {
    setSelectedPet(pet);
    setBackgroundColor(color);
  }

  async function fetchPets() {
    const response = await getPetsApi(user.cpf);
    setPets(response);
  }

  async function addPet(pet: PetDTO, image: UploadImageData | null) {
    await newPetApi(pet, image);
    await fetchPets();
  }

  async function editPet(pet: PetDTO, image: UploadImageData | null) {
    const response = await editPetApi(pet, image);
    if (response) {
      setSelectedPet(response);
    }
    await fetchPets();
  }

  async function deletePet(id: string) {
    await deletePetApi(id);
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
        backgroundColor,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
