import CPContainer from "@components/CPContainer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ageCalc } from "@utils/age";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import arrowDown from "@assets/icons/arrow-down.png";
import arrowUp from "@assets/icons/arrow-up.png";

import { styles } from "./styles";
import { COLOR } from "@theme/colors";
import { SpaceH } from "@components/Space";
import Collapsible from "react-native-collapsible";

type Route = RouteProp<ReactNavigation.RootParamList, "VaccineHistory">;

const VaccineHistory: React.FC = () => {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const pet = route.params.pet;
  const age = ageCalc(pet.birthdate);

  const Header = () => (
    <View>
      <View>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.age}>
          {age} {age === 1 ? "ano" : "anos"}
        </Text>
      </View>
    </View>
  );

  const AddVaccineButton = () => (
    <Pressable style={styles.addVaccineButton}>
      <Text style={styles.buttonText}>adicionar vacina</Text>
    </Pressable>
  );

  return (
    <CPContainer goBack title="histórico de vacinas">
      {Header()}
      {AddVaccineButton()}
      <VaccineItem />
    </CPContainer>
  );
};

const VaccineItem: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  type ButtonAction = "edit" | "remove";

  const ActionButton = (action: ButtonAction) => (
    <Pressable
      style={[
        styles.actionButton,
        { backgroundColor: action == "edit" ? COLOR.green1 : COLOR.purple },
      ]}
    >
      <Text style={styles.actionButtonText}>
        {action == "edit" ? "editar" : "excluir"}
      </Text>
    </Pressable>
  );
  return (
    <View style={styles.vaccineItemContainer}>
      <Pressable
        style={styles.vaccineItemHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View>
          <Text style={styles.vaccineTitle}>Raiva</Text>
          <Text style={styles.vaccineInfo}>01/01/2025</Text>
        </View>
        <View style={styles.chevronIconContainer}>
          <Image
            style={styles.chevronIcon}
            source={expanded ? arrowUp : arrowDown}
          />
        </View>
      </Pressable>
      <Collapsible collapsed={!expanded}>
        <View style={styles.collapsedContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.vaccineInfo}>Veterinário(a)</Text>
            <Text style={styles.vaccineInfo}>Carol</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.vaccineInfo}>Clínica</Text>
            <Text style={styles.vaccineInfo}>Petz</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.vaccineInfo}>Lote</Text>
            <Text style={styles.vaccineInfo}>00001-0001-0001-001</Text>
          </View>
          <View style={styles.infoRow}>
            {ActionButton("edit")}
            <SpaceH amount={10} />
            {ActionButton("remove")}
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

export default VaccineHistory;
