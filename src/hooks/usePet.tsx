import { useContext } from "react";
import { PetContext } from "@contexts/PetContext";

export function usePet() {
  const context = useContext(PetContext);
  return context;
}
