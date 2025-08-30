import CPContainer from "@components/CPContainer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ageCalc } from "@utils/age";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import edit_light from "@assets/icons/edit_light.png";
import petImage from "@assets/images/pet.jpg";
import vaccine from "@assets/icons/vaccine.png";

import { styles } from "./styles";

type Route = RouteProp<ReactNavigation.RootParamList, "PetDetails">;

type InfoItemProps = {
  tlRadius: number;
  trRadius: number;
  blRadius: number;
  brRadius: number;
  label: string;
  value?: string;
  color: string;
};

const PetDetails: React.FC = () => {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const pet = route.params.pet;
  const bgColor = route.params.color;
  const age = ageCalc(pet.birthdate);

  const Header = () => (
    <View style={[styles.header, { backgroundColor: bgColor }]}>
      <View style={styles.headerRow}>
        <View style={styles.headerColumn}>
          <View>
            <Text style={styles.name}>{pet.name}</Text>
            <Text style={styles.age}>
              {age} {age === 1 ? "ano" : "anos"}
            </Text>
          </View>
          <Image style={styles.pawIcon} source={edit_light} />
        </View>
        <Image style={styles.petImage} source={petImage} />
      </View>
    </View>
  );

  const Button = () => {
    return (
      <Pressable
        style={styles.vaccinesButton}
        onPress={() => navigation.navigate("VaccineHistory", { pet: pet })}
      >
        <Image source={vaccine} style={styles.vaccineIcon} />
        <Text style={styles.buttonText}>vacinas</Text>
      </Pressable>
    );
  };

  const InfoBody = () => (
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
            value={`${pet.weight.toString()} kg`}
          />
          <InfoItem
            color={bgColor}
            tlRadius={30}
            trRadius={0}
            blRadius={30}
            brRadius={30}
            label="microchipado"
            value={pet.microchipped ? "sim" : "não"}
          />
          <InfoItem
            color={bgColor}
            tlRadius={30}
            trRadius={30}
            blRadius={0}
            brRadius={30}
            label="cor"
            value={pet.color}
          />
          <InfoItem
            color={bgColor}
            tlRadius={30}
            trRadius={30}
            blRadius={30}
            brRadius={0}
            label="castrado"
            value={pet.castraded ? "sim" : "não"}
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
            value={`${pet.birthdate.getDay()}/${pet.birthdate.getMonth()}/${pet.birthdate.getFullYear()}`}
          />
          <InfoItem
            color={bgColor}
            tlRadius={30}
            trRadius={0}
            blRadius={30}
            brRadius={30}
            label="sexo"
            value={pet.sex}
          />
          <InfoItem
            color={bgColor}
            tlRadius={30}
            trRadius={0}
            blRadius={0}
            brRadius={30}
            label="raça"
            value={pet.breed}
          />

          {Button()}
        </View>
      </View>
    </View>
  );

  return (
    <CPContainer goBack>
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
