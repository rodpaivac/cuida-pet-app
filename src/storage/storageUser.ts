import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";

import { TOKEN_STORAGE, USER_STORAGE } from "./storageConfig";

export async function storageTokenSave(token: string) {
    await AsyncStorage.setItem(TOKEN_STORAGE, token);
}

export async function storageTokenGet() {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE);
    return token;
}

export async function storageTokenRemove() {
    await AsyncStorage.removeItem(TOKEN_STORAGE);
}

export async function storageUserSave(user: UserDTO) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
    const storage = await AsyncStorage.getItem(USER_STORAGE);
    const user: UserDTO = storage ? JSON.parse(storage) : {};
    return user;
}

export async function storageUserRemove() {
    await AsyncStorage.removeItem(USER_STORAGE);
}   
