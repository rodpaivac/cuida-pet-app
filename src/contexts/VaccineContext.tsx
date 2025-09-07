import { VaccineDTO } from "@dtos/VaccineDTO";
import { usePet } from "@hooks/usePet";
import { createContext, ReactNode, useEffect, useState } from "react";
import { VACCINES } from "src/mock";

export type VaccineContextDataProps = {
  selectedVaccine: VaccineDTO;
  selectVaccine: (vaccine: VaccineDTO) => void;
  selectedPetVaccines: VaccineDTO[];
  fetchPetVaccines: (petId: string) => void;
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

  function selectVaccine(vaccine: VaccineDTO) {
    setSelectedVaccine(vaccine);
  }

  async function fetchPetVaccines(petId: string) {
    //buscar na api
    console.log("selectedPet id", petId);
    setSelectedPetVaccines(VACCINES);
  }

  return (
    <VaccineContext.Provider
      value={{
        selectedVaccine,
        selectVaccine,
        selectedPetVaccines,
        fetchPetVaccines,
      }}
    >
      {children}
    </VaccineContext.Provider>
  );
}
