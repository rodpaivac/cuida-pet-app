import CPContainer from "@components/CPContainer";
import { ageCalc } from "@utils/age";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import arrowDown from "@assets/icons/arrow-down.png";
import arrowUp from "@assets/icons/arrow-up.png";

import { styles } from "./styles";
import { COLOR } from "@theme/colors";
import { SpaceH } from "@components/Space";
import Collapsible from "react-native-collapsible";
import { usePet } from "@hooks/usePet";
import { VaccineDTO } from "@dtos/VaccineDTO";
import { VACCINES } from "src/mock";
import { useNavigation } from "@react-navigation/native";
import { useVaccine } from "@hooks/useVaccine";
import { dateToString, isBeforeToday, isOneMonthFromToday } from "@utils/date";
import CPBadge from "@components/CPBadge";

const VaccineHistory: React.FC = () => {
  const { selectedPet } = usePet();
  const age = ageCalc(selectedPet.birthdate);
  const { fetchPetVaccines } = useVaccine();

  const navigation = useNavigation();

  useEffect(() => {
    fetchPetVaccines(selectedPet.id);
  }, []);

  const Header = () => (
    <View>
      <View>
        <Text style={styles.name}>{selectedPet.name}</Text>
        <Text style={styles.age}>
          {age} {age === 1 ? "ano" : "anos"}
        </Text>
      </View>
      {AddVaccineButton()}
    </View>
  );

  const AddVaccineButton = () => (
    <Pressable
      style={styles.addVaccineButton}
      onPress={
        () => navigation.navigate("RepeatDose")
        // navigation.navigate("NewVaccine", { edit: false, repeat: false })
      }
    >
      <Text style={styles.buttonText}>adicionar vacina</Text>
    </Pressable>
  );

  return (
    <CPContainer noScroll goBack title="histórico de vacinas">
      <FlatList
        data={VACCINES}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={Header()}
        renderItem={({ item }) => <VaccineItem vaccine={item} />}
      />
    </CPContainer>
  );
};

type VaccineItemProps = {
  vaccine: VaccineDTO;
};

const VaccineItem: React.FC<VaccineItemProps> = ({ vaccine }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const { selectVaccine } = useVaccine();

  const date = dateToString(vaccine.date);
  const nextDoseDate = dateToString(vaccine.nextDoseDate);

  const missedVaccine =
    isBeforeToday(vaccine.nextDoseDate) && !vaccine.nextDoseTaken;
  const vaccineIsNear = isOneMonthFromToday(vaccine.nextDoseDate);

  type Action = "edit" | "remove";

  const ActionButton = (action: Action) => {
    const handlePress = () => {
      if (action === "edit") {
        selectVaccine(vaccine);
        navigation.navigate("NewVaccine", { edit: true, repeat: false });
      } else {
        Alert.alert("Atenção", "Deseja excluir esta vacina?", [
          { text: "Sim", style: "destructive", onPress: () => {} },
          { text: "Não", isPreferred: true, onPress: () => {} },
        ]);
      }
    };

    return (
      <Pressable
        onPress={handlePress}
        style={[
          styles.actionButton,
          { backgroundColor: action == "edit" ? COLOR.green1 : COLOR.red },
        ]}
      >
        <Text
          style={[
            styles.actionButtonText,
            { color: action == "edit" ? COLOR.darkBrown : COLOR.sand },
          ]}
        >
          {action == "edit" ? "editar" : "excluir"}
        </Text>
      </Pressable>
    );
  };

  const RepeatDoseButton = () => {
    const handlePress = () => {
      selectVaccine(vaccine);
      navigation.navigate("NewVaccine", { edit: false, repeat: true });
    };

    return (
      <Pressable style={styles.repeatButton} onPress={handlePress}>
        <Text style={[styles.actionButtonText, { color: COLOR.sand }]}>
          repetir dose
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.vaccineItemContainer,
        {
          borderWidth: missedVaccine || vaccineIsNear ? 2 : 1,
          borderColor: missedVaccine
            ? COLOR.red
            : vaccineIsNear
            ? COLOR.yellow
            : COLOR.secondary,
        },
      ]}
    >
      <Pressable
        style={styles.vaccineItemHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View>
          <View style={styles.row}>
            <Text
              style={[
                styles.vaccineTitle,
                {
                  color: missedVaccine
                    ? COLOR.red
                    : vaccineIsNear
                    ? COLOR.yellow
                    : COLOR.darkBrown,
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {vaccine.title}
            </Text>

            {missedVaccine ? (
              <CPBadge text={"atrasada"} />
            ) : (
              vaccineIsNear && (
                <CPBadge text={"próxima"} backgroundColor={COLOR.yellow} />
              )
            )}
          </View>

          <Text
            style={[
              styles.vaccineDate,
              {
                color: missedVaccine
                  ? COLOR.red
                  : vaccineIsNear
                  ? COLOR.yellow
                  : COLOR.darkBrown,
              },
            ]}
          >
            {date}
          </Text>
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

          {!vaccine.nextDoseTaken && RepeatDoseButton()}

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
