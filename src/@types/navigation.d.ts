import { Pet } from "@service/api.types";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Login: undefined;
            Home: undefined;
            PetDetails: PetDetailsRouteProp;
            VaccineHistory: VaccineHistoryRouteProp;
        }
    }
}

export type PetDetailsRouteProp = {
    pet: Pet,
    color: string;
}

export type VaccineHistoryRouteProp = {
    pet: Pet,
}