import React, { useEffect, useState } from "react";

import CPContainer from "@components/CPContainer";
import { api } from "@service/api";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import CPButton from "@components/CPButton";
import CPPetCarousel from "@components/CPPetCarousel";
import CPLoading from "@components/CPLoading";

const Home: React.FC = () => {
  const [pets, setPets] = useState([]);
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
      const response = await api.get("/pets");
      setPets(response.data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <CPContainer isLoading={isLoading} header>
      {renderHeader()}
      {renderCarousel()}
      {renderFooter()}
    </CPContainer>
  );
};

export default Home;
