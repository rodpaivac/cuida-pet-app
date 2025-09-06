import { GenderDTO, UserDTO } from "@dtos/UserDTO";
import { api } from "@service/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storageUser";
import { USER } from "src/mock";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void; //retornar Promise<void> depois que integrar com backend
  signOut: () => void;
  isLoadingUserStorageData: boolean;
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

  //async
  function signIn(email: string, password: string) {
    const userData = USER;
    setUser(userData);
    storageUserSave(userData);

    //-> integrar com backend
    // Integração com backend -> Contextos no React Native -> Buscando dados do usuário no back-end

    //try{
    //const {data} = await api.post('/sessions, {email, password'});

    //  if(data.user){
    //      setUser(data.user)
    //  }
    //}catch(eror){
    //  throw error
    //}
  }

  function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
