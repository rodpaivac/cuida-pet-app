import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPTextInput from "@components/CPTextInput";
import { SpaceH, SpaceV } from "@components/Space";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";
import { useVaccine } from "@hooks/useVaccine";
import { dateToString, stringToDate } from "@utils/date";
import { scale } from "@utils/dimensions";
import { COLOR } from "@theme/colors";
import { usePet } from "@hooks/usePet";
import { VaccineDTO } from "@dtos/VaccineDTO";

type Route = RouteProp<ReactNavigation.RootParamList, "NewVaccine">;

const NewVaccine: React.FC = () => {
  const route = useRoute<Route>();
  const isEdit = route.params.edit;
  const isRepeat = route.params.repeat;

  const navigation = useNavigation();

  const {
    selectedVaccine,
    newVaccine,
    editVaccine,
    repeatVaccine,
    deleteVaccine,
  } = useVaccine();
  const { selectedPet } = usePet();

  const [vaccineName, setVaccineName] = useState<string | null>(
    isEdit || isRepeat ? selectedVaccine.title : null
  );

  const [date, setDate] = useState<string | null>(
    isEdit ? dateToString(selectedVaccine.date) : null
  );

  const [vetName, setVetName] = useState<string | null>(
    isEdit ? selectedVaccine.vetname ?? null : null
  );
  const [clinic, setClinic] = useState<string | null>(
    isEdit ? selectedVaccine.clinic ?? null : null
  );
  const [nextDose, setNextDose] = useState<string | null>(
    isEdit ? dateToString(selectedVaccine.nextdosedate) : null
  );
  const [lot, setLot] = useState<string | null>(
    isEdit ? selectedVaccine.lot ?? null : null
  );
  const [description, setDesciption] = useState<string | null>(
    isEdit ? selectedVaccine.description ?? null : null
  );

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    if (
      !selectedPet.id ||
      !vaccineName ||
      !date ||
      !vetName ||
      !clinic ||
      !nextDose
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }
    const vaccine: VaccineDTO = {
      pet_id: selectedPet.id,
      id: isEdit ? selectedVaccine.id : undefined,
      title: vaccineName,
      date: stringToDate(date)!,
      vetname: vetName,
      clinic: clinic,
      nextdosedate: stringToDate(nextDose)!,
      lot: lot ?? undefined,
      description: description ?? undefined,
      nextdosetaken: isEdit ? selectedVaccine.nextdosetaken : false,
    };
    try {
      if (isEdit) {
        await editVaccine(vaccine);
        Alert.alert("Sucesso", "Vacina editada com sucesso.", [
          { text: "Ok", onPress: () => navigation.goBack() },
        ]);
      } else {
        isRepeat
          ? await repeatVaccine(vaccine, selectedVaccine.id!)
          : await newVaccine(vaccine);
        Alert.alert("Sucesso", "Vacina cadastrada com sucesso.", [
          { text: "Ok", onPress: () => navigation.navigate("VaccineHistory") },
        ]);
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert(
        "Atenção",
        `Erro ao ${isEdit ? "editar" : "cadastrar"} vacina =(`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteVaccine(selectedVaccine.id!, selectedPet.id!);
      Alert.alert("Sucesso", "Vacina removida com sucesso", [
        { text: "Ok", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Atenção", "Não foi possível remover a vacina =(");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlert = () => {
    Alert.alert("Atenção", "Deseja excluir esta vacina?", [
      { text: "Sim", style: "destructive", onPress: () => handleDelete() },
      { text: "Não", isPreferred: true, onPress: () => {} },
    ]);
  };

  const Footer = () => (
    <View style={styles.footer}>
      {isEdit && (
        <>
          <CPButton
            title="excluir"
            onPress={handleDeleteAlert}
            backgroundColor={COLOR.red}
            textColor={COLOR.sand}
            width={scale(180)}
            loading={loading}
          />
          <SpaceH amount={15} />
        </>
      )}
      <CPButton
        title="salvar"
        onPress={() => handleSave()}
        width={isEdit ? scale(180) : undefined}
        loading={loading}
      />
    </View>
  );

  const Body = () => (
    <>
      <CPTextInput
        label="Nome da vacina"
        placeholder="Nome da vacina"
        onChangeText={(text) => setVaccineName(text)}
        value={vaccineName}
        disabled={isRepeat}
      />
      <SpaceV amount={10} />

      <CPTextInput
        label="Data"
        placeholder="Data da dose"
        onChangeText={(text) => setDate(text)}
        value={date}
        mask="date"
        keyboardType="numeric"
      />
      <SpaceV amount={10} />

      <CPTextInput
        label="Descrição"
        placeholder="Descrição da vacina"
        onChangeText={(text) => setDesciption(text)}
        value={description}
      />
      <SpaceV amount={10} />

      <CPTextInput
        label="Nome do(a) veterinário(a)"
        placeholder="Nome do(a) veterinário(a)"
        onChangeText={(text) => setVetName(text)}
        value={vetName}
      />
      <SpaceV amount={10} />

      <CPTextInput
        label="Clínica"
        placeholder="Nome da clínica"
        onChangeText={(text) => setClinic(text)}
        value={clinic}
      />
      <SpaceV amount={10} />

      <CPTextInput
        label="Próxima dose"
        placeholder="Data da próxima dose"
        onChangeText={(text) => setNextDose(text)}
        value={nextDose}
        mask="date"
        keyboardType="numeric"
      />
      <SpaceV amount={10} />

      <CPTextInput
        label="Lote/Código"
        placeholder="Lote ou código da vacina"
        onChangeText={(text) => setLot(text)}
        value={lot}
      />
    </>
  );

  return (
    <CPContainer
      dark
      goBack
      title={
        isEdit ? "editar vacina" : isRepeat ? "repetir dose" : "nova vacina"
      }
    >
      {Body()}
      {Footer()}
    </CPContainer>
  );
};

export default NewVaccine;
