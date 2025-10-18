import CPContainer from "@components/CPContainer";
import { useVaccine } from "@hooks/useVaccine";
import React, { useEffect } from "react";
import { Image, SectionList, Text, View } from "react-native";
import { styles } from "./styles";
import paw from "@assets/icons/paw.png";

const NextVaccines: React.FC = () => {
  const { fetchPetsNextVaccines, petsNextVaccines, loading } = useVaccine();

  useEffect(() => {
    fetchPetsNextVaccines();
  }, []);

  const SectionHeader = (month: string) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{month}</Text>
        <Image source={paw} style={styles.icon} />
      </View>
    );
  };

  const Item = (item: string) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Seus pets estão com as vacinas em dia!
      </Text>
    </View>
  );

  return (
    <CPContainer
      dark
      goBack
      title="próximas vacinas"
      noScroll
      isLoading={loading}
    >
      <SectionList
        sections={petsNextVaccines ?? []}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section }) => SectionHeader(section.title)}
        renderItem={({ item }) => Item(item)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyComponent()}
      />
    </CPContainer>
  );
};

export default NextVaccines;
