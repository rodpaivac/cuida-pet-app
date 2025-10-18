import { PetDTO } from "@dtos/PetDTO";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Login: undefined;
            Home: undefined;
            PetDetails: undefined;
            VaccineHistory: undefined;
            Menu: undefined;
            NewPet: NewPetRouteProp;
            EditUser: undefined;
            NewUser: undefined;
            NewVaccine: NewVaccineRouteProp;
            RepeatDose: undefined;
            ForgotPassword: ForgotPasswordRouteProp;
            ChangePassword: undefined;
            UserDataConfirmation: undefined;
            Notifications: undefined;
            NextVaccines: undefined;
        }
    }
}


export type NewPetRouteProp = {
    edit: boolean;
}

export type NewVaccineRouteProp = {
    edit: boolean;
    repeat: boolean;
}

export type ForgotPasswordRouteProp = {
    cpf: string;
}




