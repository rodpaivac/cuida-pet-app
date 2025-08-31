import CPContainer from "@components/CPContainer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ageCalc } from "@utils/age";
import React, { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import arrowDown from "@assets/icons/arrow-down.png";
import arrowUp from "@assets/icons/arrow-up.png";

import { styles } from "./styles";
import { COLOR } from "@theme/colors";
import { SpaceH } from "@components/Space";
import Collapsible from "react-native-collapsible";
import { Vaccine } from "@service/api.types";

type Route = RouteProp<ReactNavigation.RootParamList, "VaccineHistory">;

const VaccineHistory: React.FC = () => {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const pet = route.params.pet;
  const age = ageCalc(pet.birthdate);

  const vaccineMock: Vaccine[] = [
    {
      id: 1,
      title: "Antirrábica",
      date: new Date("2024-03-15"),
      vetName: "Dra. Ana Silva",
      clinic: "Clínica Vet Vida",
      nextDoseDate: new Date("2025-03-15"),
      lot: "L12345",
    },
    {
      id: 2,
      title: "V10",
      date: new Date("2023-05-10"),
      vetName: "Dr. Carlos Pereira",
      clinic: "Amigos dos Pets",
      nextDoseDate: new Date("2025-05-10"),
      lot: "V10-5678",
      description: "Vacina gerou inchaço na pele",
    },
    {
      id: 3,
      title: "Giárdia",
      date: new Date("2024-08-05"),
      clinic: "Pet+ Saúde",
      lot: "G-00921",
    },
  ];

  const Header = () => (
    <View>
      <View>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.age}>
          {age} {age === 1 ? "ano" : "anos"}
        </Text>
      </View>
      {AddVaccineButton()}
    </View>
  );

  const AddVaccineButton = () => (
    <Pressable style={styles.addVaccineButton}>
      <Text style={styles.buttonText}>adicionar vacina</Text>
    </Pressable>
  );

  return (
    <CPContainer noScroll goBack title="histórico de vacinas">
      <FlatList
        data={vaccineMock}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={Header()}
        renderItem={({ item }) => <VaccineItem vaccine={item} />}
      />
    </CPContainer>
  );
};

type VaccineItemProps = {
  vaccine: Vaccine;
};

const VaccineItem: React.FC<VaccineItemProps> = ({ vaccine }) => {
  const [expanded, setExpanded] = useState(false);

  const date = vaccine.date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  const nextDoseDate = vaccine.nextDoseDate
    ? vaccine.nextDoseDate.toLocaleDateString("pt-BR", { timeZone: "UTC" })
    : null;

  type Action = "edit" | "remove";

  const ActionButton = (action: Action) => (
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
          <Text style={styles.vaccineTitle}>{vaccine.title}</Text>
          <Text style={styles.vaccineDate}>{date}</Text>
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
          {vaccine.description && (
            <View style={styles.infoRow}>
              <Text style={styles.vaccineInfoLabel}>Descrição</Text>
              <Text style={styles.vaccineInfoValue}>{vaccine.description}</Text>
            </View>
          )}
          {vaccine.vetName && (
            <View style={styles.infoRow}>
              <Text style={styles.vaccineInfoLabel}>Veterinário(a)</Text>
              <Text style={styles.vaccineInfoValue}>{vaccine.vetName}</Text>
            </View>
          )}
          {vaccine.clinic && (
            <View style={styles.infoRow}>
              <Text style={styles.vaccineInfoLabel}>Clínica</Text>
              <Text style={styles.vaccineInfoValue}>{vaccine.clinic}</Text>
            </View>
          )}
          {vaccine.nextDoseDate && (
            <View style={styles.infoRow}>
              <Text style={styles.vaccineInfoLabel}>Próxima dose</Text>
              <Text style={styles.vaccineInfoValue}>{nextDoseDate}</Text>
            </View>
          )}
          {vaccine.lot && (
            <View style={styles.infoRow}>
              <Text style={styles.vaccineInfoLabel}>Lote</Text>
              <Text style={styles.vaccineInfoValue}>{vaccine.lot}</Text>
            </View>
          )}

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
