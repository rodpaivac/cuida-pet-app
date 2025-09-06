import React, { useState } from "react";
import CPContainer from "@components/CPContainer";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Alert, Text, View } from "react-native";
import { styles } from "./styles";
import CPTextInput from "@components/CPTextInput";
import { SpaceH, SpaceV } from "@components/Space";
import CPRadioButton from "@components/CPRadioButton";
import CPButton from "@components/CPButton";
import CPPicker, { CPPickerItemType } from "@components/CPPicker";
import CPImagePicker from "@components/CPImagePicker";
import { usePet } from "@hooks/usePet";
import { dateToString } from "@utils/date";
import { SexDTO } from "@dtos/PetDTO";
import { COLOR } from "@theme/colors";
import { scale } from "@utils/dimensions";

type Route = RouteProp<ReactNavigation.RootParamList, "NewPet">;

const NewPet: React.FC = () => {
  const route = useRoute<Route>();
  const isEdit = route.params.edit;
  const { selectedPet } = usePet();

  const [isCastrated, setIsCastrated] = useState(
    isEdit ? selectedPet.castraded : false
  );
  const [isMicrochipped, setIsMicrochipped] = useState(
    isEdit ? selectedPet.microchipped : false
  );
  const [sex, setSex] = useState<SexDTO | null>(
    isEdit ? (selectedPet.sex as SexDTO) : null
  );
  const [species, setSpecies] = useState<string | null>(
    isEdit ? selectedPet.species : null
  );
  const [image, setImage] = useState<string | null>(null);

  const [birthdate, setBirthdate] = useState<string | null>(
    isEdit ? dateToString(selectedPet.birthdate) : null
  );
  const [name, setName] = useState<string | null>(
    isEdit ? selectedPet.name : null
  );
  const [breed, setBreed] = useState<string | null>(
    isEdit ? selectedPet.breed : null
  );
  const [weight, setWeight] = useState<string | null>(
    isEdit ? selectedPet.weight : null
  );
  const [color, setColor] = useState<string | null>(
    isEdit ? selectedPet.color : null
  );

  const speciesItems: CPPickerItemType[] = [
    { label: "cão", value: "cão" },
    { label: "gato", value: "gato" },
    { label: "ave", value: "ave" },
    { label: "roedor", value: "roedor" },
    { label: "lagomorfo", value: "lagomorfo" },
    { label: "réptil", value: "réptil" },
    { label: "peixe", value: "peixe" },
    { label: "anfíbio", value: "anfíbio" },
    { label: "invertebrado", value: "invertebrado" },
    { label: "equino", value: "equino" },
    { label: "caprino", value: "caprino" },
    { label: "suíno", value: "suíno" },
    { label: "outro", value: "outro" },
  ];

  const Header = () => (
    <View style={styles.headerContainer}>
      <CPImagePicker
        onSelect={(selectedImage) => setImage(selectedImage)}
        image={image}
        type="pet"
      />
    </View>
  );

  const CastratedSelection = () => (
    <View>
      <Text style={styles.label}>Castrado?</Text>
      <CPRadioButton
        text="sim"
        selected={isCastrated}
        onChange={(selected) => setIsCastrated(selected)}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="não"
        selected={!isCastrated}
        onChange={(selected) => setIsCastrated(!selected)}
      />
    </View>
  );

  const MicrochippedSelection = () => (
    <View>
      <Text style={styles.label}>Microchipado?</Text>
      <CPRadioButton
        text="sim"
        selected={isMicrochipped}
        onChange={(selected) => setIsMicrochipped(selected)}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="não"
        selected={!isMicrochipped}
        onChange={(selected) => setIsMicrochipped(!selected)}
      />
    </View>
  );

  const SexSelection = () => (
    <View>
      <Text style={styles.label}>Sexo</Text>
      <CPRadioButton
        text="macho"
        selected={sex === "macho"}
        onChange={(selected) => setSex("macho")}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="fêmea"
        selected={sex === "fêmea"}
        onChange={(selected) => setSex("fêmea")}
      />
    </View>
  );

  const SpeciesPicker = () => (
    <CPPicker
      label="espécie"
      placeholder="selecione a espécie do pet"
      items={speciesItems}
      onSelect={(itemValue, itemIndex) => setSpecies(itemValue)}
      selectedItem={species}
    />
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
    <View>
      {SpeciesPicker()}
      <SpaceV amount={15} />
      <CPTextInput
        label="nome"
        placeholder="nome do pet"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="raça"
        placeholder="raça do pet"
        value={breed}
        onChangeText={(text) => setBreed(text)}
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="peso (kg)"
        placeholder="peso do pet"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />
      <SpaceV amount={15} />

      <CPTextInput
        label="data de nascimento"
        placeholder="data de nascimento do pet"
        value={birthdate}
        onChangeText={(text) => setBirthdate(text)}
        mask="date"
        keyboardType="numeric"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="cor"
        placeholder="cor do pet"
        value={color}
        onChangeText={(text) => setColor(text)}
      />
      <SpaceV amount={15} />
      {SexSelection()}
      <SpaceV amount={15} />
      {CastratedSelection()}
      <SpaceV amount={15} />
      {MicrochippedSelection()}
    </View>
  );

  return (
    <CPContainer dark goBack title={isEdit ? "editar pet" : "adicionar pet"}>
      {Header()}
      {Body()}
      {Footer()}
    </CPContainer>
  );
};

export default NewPet;
