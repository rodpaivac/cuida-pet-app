import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPTextInput from "@components/CPTextInput";
import { SpaceH, SpaceV } from "@components/Space";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";
import { useVaccine } from "@hooks/useVaccine";
import { dateToString } from "@utils/date";
import { scale } from "@utils/dimensions";
import { COLOR } from "@theme/colors";

type Route = RouteProp<ReactNavigation.RootParamList, "NewVaccine">;

const NewVaccine: React.FC = () => {
  const route = useRoute<Route>();
  const isEdit = route.params.edit;
  const isRepeat = route.params.repeat;

  const { selectedVaccine } = useVaccine();

  const [vaccineName, setVaccineName] = useState<string | null>(
    isEdit || isRepeat ? selectedVaccine.title : null
  );

  const [date, setDate] = useState<string | null>(
    isEdit ? dateToString(selectedVaccine.date) : null
  );

  const [vetName, setVetName] = useState<string | null>(
    isEdit ? selectedVaccine.vetName ?? null : null
  );
  const [clinic, setClinic] = useState<string | null>(
    isEdit ? selectedVaccine.clinic ?? null : null
  );
  const [nextDose, setNextDose] = useState<string | null>(
    isEdit ? dateToString(selectedVaccine.nextDoseDate) : null
  );
  const [lot, setLot] = useState<string | null>(
    isEdit ? selectedVaccine.lot ?? null : null
  );
  const [description, setDesciption] = useState<string | null>(
    isEdit ? selectedVaccine.description ?? null : null
  );

  const handleDelete = () => {
    Alert.alert("Atenção", "Deseja excluir esta vacina?", [
      { text: "Sim", style: "destructive", onPress: () => {} },
      { text: "Não", isPreferred: true, onPress: () => {} },
    ]);
  };

  const Footer = () => (
    <View style={styles.footer}>
      {isEdit && (
        <>
          <CPButton
            title="excluir"
            onPress={handleDelete}
            backgroundColor={COLOR.red}
            textColor={COLOR.sand}
            width={scale(180)}
          />
          <SpaceH amount={15} />
        </>
      )}
      <CPButton
        title="salvar"
        onPress={() => {}}
        width={isEdit ? scale(180) : undefined}
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
