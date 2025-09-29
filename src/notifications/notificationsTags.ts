import { UserDTO } from '@dtos/UserDTO';
import { OneSignal } from 'react-native-onesignal';

export function tagUserInfoCreate(user: UserDTO) {
    OneSignal.User.addTags({
        user_cpf: user.cpf,
        user_email: user.email,
        user_phone: user.phone,
        user_birthdate: user.birthdate,
        user_name: user.name,
        user_gender: user.gender
    });
}

export function tagUserInfoRemove() {
    OneSignal.User.removeTags([
        "user_cpf",
        "user_email",
        "user_phone",
        "user_birthdate",
        "user_name",
        "user_gender"
    ])
}