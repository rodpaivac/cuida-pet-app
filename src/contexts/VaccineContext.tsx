import { VaccineDTO } from "@dtos/VaccineDTO";
import { createContext, ReactNode, useState } from "react";

export type VaccineContextDataProps = {
  selectedVaccine: VaccineDTO;
  selectVaccine: (vaccine: VaccineDTO) => void;
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

  function selectVaccine(vaccine: VaccineDTO) {
    setSelectedVaccine(vaccine);
  }

  return (
    <VaccineContext.Provider value={{ selectedVaccine, selectVaccine }}>
      {children}
    </VaccineContext.Provider>
  );
}
