import CPContainer from "@components/CPContainer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ageCalc } from "@utils/age";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import editLight from "@assets/icons/edit-light.png";
import petImage from "@assets/images/pet.jpg";
import vaccine from "@assets/icons/vaccine.png";

import { styles } from "./styles";
import { usePet } from "@hooks/usePet";
import { dateToString } from "@utils/date";

type Route = RouteProp<ReactNavigation.RootParamList, "PetDetails">;

type InfoItemProps = {
  tlRadius: number;
  trRadius: number;
  blRadius: number;
  brRadius: number;
  label: string;
  value?: string | null;
  color: string;
};

const PetDetails: React.FC = () => {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const bgColor = route.params.color;
  const { selectedPet } = usePet();
  const age = ageCalc(selectedPet.birthdate);

  const Header = () => (
    <View style={[styles.header, { backgroundColor: bgColor }]}>
      <View style={styles.headerRow}>
        <View style={styles.headerColumn}>
          <View>
            <Text style={styles.name}>{selectedPet.name}</Text>
            <Text style={styles.age}>
              {age} {age === 1 ? "ano" : "anos"}
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("NewPet", { edit: true })}
          >
            <Image style={styles.pawIcon} source={editLight} />
          </Pressable>
        </View>
        <Image style={styles.petImage} source={petImage} />
      </View>
    </View>
  );

  const VaccineButton = () => {
    return (
      <Pressable
        style={styles.vaccinesButton}
        onPress={() => navigation.navigate("VaccineHistory")}
      >
        <Image source={vaccine} style={styles.vaccineIcon} />
        <Text style={styles.buttonText}>vacinas</Text>
      </Pressable>
    );
  };

  const InfoBody = () => {
    const birthdate = dateToString(selectedPet.birthdate);

    return (
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <InfoItem
              color={bgColor}
              tlRadius={0}
              trRadius={30}
              blRadius={30}
              brRadius={0}
              label="peso"
              value={`${selectedPet.weight.toString()} kg`}
            />
            <InfoItem
              color={bgColor}
              tlRadius={30}
              trRadius={0}
              blRadius={30}
              brRadius={30}
              label="microchipado"
              value={selectedPet.microchipped ? "sim" : "não"}
            />
            <InfoItem
              color={bgColor}
              tlRadius={30}
              trRadius={30}
              blRadius={0}
              brRadius={30}
              label="cor"
              value={selectedPet.color}
            />
            <InfoItem
              color={bgColor}
              tlRadius={30}
              trRadius={30}
              blRadius={30}
              brRadius={0}
              label="castrado"
              value={selectedPet.castraded ? "sim" : "não"}
            />
          </View>
          <View style={styles.infoColumn}>
            <InfoItem
              color={bgColor}
              tlRadius={0}
              trRadius={30}
              blRadius={30}
              brRadius={0}
              label="nascimento"
              value={birthdate}
            />
            <InfoItem
              color={bgColor}
              tlRadius={30}
              trRadius={0}
              blRadius={30}
              brRadius={30}
              label="sexo"
              value={selectedPet.sex}
            />
            <InfoItem
              color={bgColor}
              tlRadius={30}
              trRadius={0}
              blRadius={0}
              brRadius={30}
              label="raça"
              value={selectedPet.breed}
            />

            {VaccineButton()}
          </View>
        </View>
      </View>
    );
  };

  return (
    <CPContainer goBack title="detalhes do pet">
      {Header()}
      {InfoBody()}
    </CPContainer>
  );
};

const InfoItem: React.FC<InfoItemProps> = ({
  tlRadius,
  trRadius,
  blRadius,
  brRadius,
  label,
  value,
  color,
}) => (
  <View
    style={[
      styles.infoItem,
      {
        backgroundColor: color,
        borderTopLeftRadius: tlRadius,
        borderTopRightRadius: trRadius,
        borderBottomLeftRadius: blRadius,
        borderBottomRightRadius: brRadius,
      },
    ]}
  >
    <Text style={styles.infoItemValue}>{value ?? "-"}</Text>
    <Text style={styles.infoItemLabel}>{label}</Text>
  </View>
);

export default PetDetails;
