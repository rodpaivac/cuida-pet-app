import React, { useEffect, useState } from "react";

import CPContainer from "@components/CPContainer";
import { Text, View } from "react-native";
import { styles } from "./styles";
import CPButton from "@components/CPButton";
import CPPetCarousel from "@components/CPPetCarousel";
import { AppError } from "@utils/AppError";
import { getPets } from "@service/index";
import { PetDTO } from "@dtos/PetDTO";
import { useNavigation } from "@react-navigation/native";
import { usePet } from "@hooks/usePet";
import CPContextualLoading from "@components/CPContextualLoading";

const Home: React.FC = () => {
  const [pets, setPets] = useState<PetDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [finishedContextualLoading, setFinishedContextualLoading] =
    useState<boolean>(false);
  const navigation = useNavigation();
  const { selectPet } = usePet();

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.title}>meus pets</Text>
      <Text style={styles.subtitle}>selecione seu pet</Text>
    </View>
  );

  const Footer = () => (
    <View style={styles.footer}>
      <CPButton
        title="adicionar pet"
        onPress={() => navigation.navigate("NewPet", { edit: false })}
      />
    </View>
  );

  const Carousel = () => (
    <CPPetCarousel pets={pets} selectPet={handleSelectPet} />
  );

  const fetchPets = async () => {
    setIsLoading(true);
    try {
      const response = await getPets("user");
      setPets(response);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Tente novamente mais tarde.";
      console.log("title error", title);
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ContextualLoading = () => (
    <CPContextualLoading
      textLines={[
        "Analisando a saúde dos seus pets",
        "Atualizando o histórico de vacinas",
        "Verificando se há vacinas atrasadas",
      ]}
      onFinish={() => setFinishedContextualLoading(true)}
    />
  );

  const handleSelectPet = (pet: PetDTO, color: string) => {
    selectPet(pet);
    navigation.navigate("PetDetails", { color: color });
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <>
      {!finishedContextualLoading ? (
        ContextualLoading()
      ) : (
        <CPContainer isLoading={isLoading} header ignorePadding>
          {Header()}
          {Carousel()}
          {Footer()}
        </CPContainer>
      )}
    </>
  );
};

export default Home;
