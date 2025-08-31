import { createContext, ReactNode, useState } from "react";

import { PetDTO } from "@dtos/PetDTO";

export type PetContextDataProps = {
  selectedPet: PetDTO;
  selectPet: (pet: PetDTO) => void;
};

type PetContextProviderProps = {
  children: ReactNode;
};

export const PetContext = createContext<PetContextDataProps>(
  {} as PetContextDataProps
);

export function PetContextProvider({ children }: PetContextProviderProps) {
  const [selectedPet, setSelectedPet] = useState<PetDTO>({} as PetDTO);

  function selectPet(pet: PetDTO) {
    setSelectedPet(pet);
  }

  return (
    <PetContext.Provider value={{ selectedPet, selectPet }}>
      {children}
    </PetContext.Provider>
  );
}
