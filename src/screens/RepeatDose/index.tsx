import CPContainer from "@components/CPContainer";
import { useVaccine } from "@hooks/useVaccine";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { VaccineDTO } from "@dtos/VaccineDTO";
import { dateToString } from "@utils/date";
import CPRadioButton from "@components/CPRadioButton";
import CPButton from "@components/CPButton";
import { COLOR } from "@theme/colors";
import { scale } from "@utils/dimensions";
import { SpaceH } from "@components/Space";
import { useNavigation } from "@react-navigation/native";

const RepeatDose: React.FC = () => {
  const { selectedPetVaccines } = useVaccine();
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineDTO>();
  const [notRepeatedVaccines, setNotRepeatedVaccines] =
    useState<VaccineDTO[]>();
  const navigation = useNavigation();
  const { selectVaccine } = useVaccine();

  const repeatDoseDisabled = selectedVaccine === undefined;

  useEffect(() => {
    getNotRepeatedVaccines();
  }, []);

  const getNotRepeatedVaccines = () => {
    const data = selectedPetVaccines.filter(
      (element) => !element.nextDoseTaken
    );
    setNotRepeatedVaccines(data);
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Você está repetindo uma dessas vacinas?</Text>
      <Text style={styles.subtitle}>Se sim, selecione uma vacina.</Text>
      <Text style={styles.subtitle}>Senão, adicione uma nova.</Text>
    </View>
  );

  const Footer = () => (
    <View style={styles.footerContainer}>
      <CPButton
        title="nova vacina"
        onPress={() =>
          navigation.navigate("NewVaccine", { edit: false, repeat: false })
        }
        backgroundColor={COLOR.green1}
        width={scale(180)}
      />
      <SpaceH amount={15} />
      <CPButton
        title="repetir dose"
        onPress={() => {
          selectVaccine(selectedVaccine!);
          !repeatDoseDisabled &&
            navigation.navigate("NewVaccine", { edit: false, repeat: true });
        }}
        backgroundColor={COLOR.green3}
        width={scale(180)}
        textColor={COLOR.sand}
        disabled={repeatDoseDisabled}
      />
    </View>
  );

  const SelectableVaccineItem = (vaccine: VaccineDTO) => {
    const date = dateToString(vaccine.date);

    return (
      <Pressable
        style={styles.vaccineItemContainer}
        onPress={() => setSelectedVaccine(vaccine)}
      >
        <View style={styles.vaccineItemHeader}>
          <View>
            <Text style={styles.vaccineTitle}>{vaccine.title}</Text>
            <Text style={styles.vaccineDate}>{date}</Text>
          </View>
          <CPRadioButton
            dark
            selected={selectedVaccine?.id === vaccine.id}
            onChange={() => setSelectedVaccine(vaccine)}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <CPContainer dark goBack title="nova vacina" noScroll>
      <FlatList
        ListHeaderComponent={() => Header()}
        data={notRepeatedVaccines}
        renderItem={({ item }) => SelectableVaccineItem(item)}
        keyExtractor={(item) => item.id}
        ListFooterComponent={Footer()}
        showsVerticalScrollIndicator={false}
      />
    </CPContainer>
  );
};

export default RepeatDose;
