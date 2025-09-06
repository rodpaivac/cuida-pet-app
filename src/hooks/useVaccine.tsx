import { useContext } from "react";
import { VaccineContext } from "@contexts/VaccineContext";

export function useVaccine() {
  const context = useContext(VaccineContext);
  return context;
}
