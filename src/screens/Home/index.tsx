import React, { useEffect, useState } from "react";
import CPContainer from "@components/CPContainer";
import { Text, View } from "react-native";
import { styles } from "./styles";
import CPButton from "@components/CPButton";
import CPPetCarousel from "@components/CPPetCarousel";
import { PetDTO } from "@dtos/PetDTO";
import { useNavigation } from "@react-navigation/native";
import { usePet } from "@hooks/usePet";
import CPContextualLoading from "@components/CPContextualLoading";
import { useAuth } from "@hooks/useAuth";
import { tagUserInfoCreate } from "@notifications/notificationsTags";
import { usePreviousRoute } from "@hooks/usePreviousRoute";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [finishedContextualLoading, setFinishedContextualLoading] =
    useState<boolean>(false);
  const navigation = useNavigation();
  const { selectPet, pets, fetchPets } = usePet();

  const { user } = useAuth();
  tagUserInfoCreate(user);

  // show contextual loading when previous screen is not Menu or NewPet
  const previousRoute = usePreviousRoute();

  const showContextualLoading =
    previousRoute != "Menu" &&
    previousRoute != "NewPet" &&
    !finishedContextualLoading;

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
    selectPet(pet, color);
    navigation.navigate("PetDetails");
  };

  const handleFetchPets = async () => {
    try {
      setIsLoading(true);
      await fetchPets();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPets();
  }, []);

  return (
    <>
      {showContextualLoading ? (
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
