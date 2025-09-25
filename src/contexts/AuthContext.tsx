import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
  storageTokenSave,
  storageTokenGet,
  storageTokenRemove,
} from "@storage/storageUser";
import {
  changePasswordApi,
  editUserApi,
  forgotPasswordApi,
  newUserApi,
  signInApi,
  verifyUserDataApi,
} from "@service/auth";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (cpf: string, password: string) => void;
  signOut: () => void;
  isLoadingUserStorageData: boolean;
  newUser: (user: UserDTO, image: FormData | null) => void;
  token: string | null;
  editUser: (user: UserDTO, image: FormData | null) => void;
  changePassword: (currentPassword: string, newPassword: string) => void;
  verifyUserData: (
    cpf: string,
    phone: string,
    email: string,
    birthdate: Date
  ) => void;
  forgotPassword: (cpf: string, newPassword: string) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);
  const [token, setToken] = useState<string | null>(null);

  async function signIn(cpf: string, password: string) {
    const response = await signInApi(cpf, password);
    if (!response) {
      return;
    }

    const userData = response.user;
    const token = response.token;

    try {
      setUser(userData);
      setToken(token);
      await storageUserSave(userData);
      await storageTokenSave(token);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      setToken(null);
      await storageUserRemove();
      await storageTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();
      const token = await storageTokenGet();

      if (userLogged && token) {
        setUser(userLogged);
        setToken(token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function newUser(user: UserDTO, image: FormData | null) {
    await newUserApi(user, image);
  }

  async function editUser(user: UserDTO, image: FormData | null) {
    const response = await editUserApi(user, image);
    setUser(response);
    await storageUserSave(response);
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    try {
      const response = await changePasswordApi(
        currentPassword,
        newPassword,
        user.cpf
      );
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function verifyUserData(
    cpf: string,
    phone: string,
    email: string,
    birthdate: Date
  ) {
    try {
      await verifyUserDataApi(cpf, phone, birthdate, email);
    } catch (error) {
      throw error;
    }
  }

  async function forgotPassword(cpf: string, newPassword: string) {
    try {
      await forgotPasswordApi(cpf, newPassword);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
        newUser,
        token,
        editUser,
        changePassword,
        verifyUserData,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
