import React, { useEffect, useState } from "react";

import CPContainer from "@components/CPContainer";
import { Text, View } from "react-native";
import { styles } from "./styles";
import CPButton from "@components/CPButton";
import CPPetCarousel from "@components/CPPetCarousel";
import { AppError } from "@utils/AppError";
import { getPets } from "@service/index";
import { Pet } from "@service/api.types";

const Home: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>meus pets</Text>
      <Text style={styles.subtitle}>selecione seu pet</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <CPButton title="adicionar pet" onPress={() => {}} />
    </View>
  );

  const renderCarousel = () => <CPPetCarousel pets={pets} />;

  const fetchPets = async () => {
    setIsLoading(true);
    try {
      const response = await getPets("user");
      setPets(response);
      console.log("response", response);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Tente novamente mais tarde.";
      console.log("title error", title);
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <CPContainer isLoading={isLoading} header ignorePadding>
      {renderHeader()}
      {renderCarousel()}
      {renderFooter()}
    </CPContainer>
  );
};

export default Home;
