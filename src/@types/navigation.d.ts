import { PetDTO } from "@dtos/PetDTO";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Login: undefined;
            Home: undefined;
            PetDetails: PetDetailsRouteProp;
            VaccineHistory: undefined;
            Menu: undefined;
        }
    }
}

export type PetDetailsRouteProp = {
    color: string;
}

