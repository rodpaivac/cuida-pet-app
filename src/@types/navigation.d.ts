import { PetDTO } from "@dtos/PetDTO";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Login: undefined;
            Home: undefined;
            PetDetails: PetDetailsRouteProp;
            VaccineHistory: undefined;
            Menu: undefined;
            NewPet: NewPetRouteProp;
            EditUser: undefined;
            NewUser: undefined;
            NewVaccine: NewVaccineRouteProp;
            RepeatDose: undefined;
            ForgotPassword: undefined;
            ChangePassword: undefined;
            UserDataConfirmation: undefined;
            Notifications: undefined;
        }
    }
}

export type PetDetailsRouteProp = {
    color: string;
}

export type NewPetRouteProp = {
    edit: boolean;
}

export type NewVaccineRouteProp = {
    edit: boolean;
    repeat: boolean;
}




