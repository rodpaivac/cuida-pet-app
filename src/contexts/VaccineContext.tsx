import { PetNextVaccineDTO, VaccineDTO } from "@dtos/VaccineDTO";
import { createContext, ReactNode, useState } from "react";
import { NEXT_VACCINES, VACCINES } from "src/mock";

export type VaccineContextDataProps = {
  selectedVaccine: VaccineDTO;
  selectVaccine: (vaccine: VaccineDTO) => void;
  selectedPetVaccines: VaccineDTO[];
  fetchPetVaccines: (petId: string) => void;
  petsNextVaccines: PetNextVaccineDTO[];
  fetchPetsNextVaccines: () => void;
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
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineDTO>(
    {} as VaccineDTO
  );
  const [selectedPetVaccines, setSelectedPetVaccines] = useState<VaccineDTO[]>(
    []
  );

  const [petsNextVaccines, setPetsNextVaccines] = useState<PetNextVaccineDTO[]>(
    []
  );

  function selectVaccine(vaccine: VaccineDTO) {
    setSelectedVaccine(vaccine);
  }

  async function fetchPetVaccines(petId: string) {
    //buscar na api
    setSelectedPetVaccines(VACCINES);
  }

  async function fetchPetsNextVaccines() {
    //buscar na api
    setPetsNextVaccines(NEXT_VACCINES);
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
      }}
    >
      {children}
    </VaccineContext.Provider>
  );
}
