import React, { useState } from "react";
import CPContainer from "@components/CPContainer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Text, View } from "react-native";
import { styles } from "./styles";
import CPTextInput from "@components/CPTextInput";
import { SpaceH, SpaceV } from "@components/Space";
import CPRadioButton from "@components/CPRadioButton";
import CPButton from "@components/CPButton";
import CPPicker, { CPPickerItemType } from "@components/CPPicker";
import CPImagePicker from "@components/CPImagePicker";
import { usePet } from "@hooks/usePet";
import { dateToString, stringToDate } from "@utils/date";
import { PetDTO, SexDTO } from "@dtos/PetDTO";
import { COLOR } from "@theme/colors";
import { scale } from "@utils/dimensions";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type Route = RouteProp<ReactNavigation.RootParamList, "NewPet">;

const NewPet: React.FC = () => {
  const route = useRoute<Route>();
  const isEdit = route.params.edit;
  const { selectedPet, addPet, editPet, deletePet } = usePet();
  const { user } = useAuth();
  const imageUri = isEdit && selectedPet.image ? selectedPet.image : null;

  const navigation = useNavigation();

  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [isCastrated, setIsCastrated] = useState(
    isEdit ? selectedPet.castrated : false
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
  const [image, setImage] = useState<FormData | null>(null);

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

  const isBirthdateValid = !!birthdate && birthdate.length === 10;
  const buttonDisabled =
    !name ||
    !birthdate ||
    !breed ||
    !color ||
    !sex ||
    !species ||
    !weight ||
    !isBirthdateValid;

  const speciesItems: CPPickerItemType[] = [
    { label: "selecione uma espécie", value: null },
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
        imageUri={imageUri}
        type="pet"
      />
    </View>
  );

  const CastratedSelection = () => (
    <View>
      <Text style={styles.label}>Castrado? *</Text>
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
      <Text style={styles.label}>Microchipado? *</Text>
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
      <Text style={styles.label}>Sexo *</Text>
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
      label="espécie *"
      placeholder="selecione a espécie do pet"
      items={speciesItems}
      onSelect={(itemValue, itemIndex) => setSpecies(itemValue)}
      selectedItemValue={species}
    />
  );

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      if (selectedPet.id) {
        await deletePet(selectedPet.id);
        Alert.alert("Sucesso", "Pet excluído com sucesso.", [
          { text: "Ok", onPress: () => navigation.navigate("Home") },
        ]);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleDeleteAlert = () => {
    Alert.alert("Atenção", "Deseja excluir este pet?", [
      { text: "Sim", style: "destructive", onPress: () => handleDelete() },
      { text: "Não", isPreferred: true },
    ]);
  };

  const handleSave = async () => {
    if (
      !name ||
      !birthdate ||
      !breed ||
      !color ||
      !sex ||
      !species ||
      !weight ||
      !isBirthdateValid
    ) {
      return;
    }
    setIsSaveLoading(true);
    try {
      const pet: PetDTO = {
        id: selectedPet.id,
        name: name,
        birthdate: stringToDate(birthdate)!,
        breed: breed,
        castrated: isCastrated,
        color: color,
        microchipped: isMicrochipped,
        sex: sex,
        species: species,
        user_cpf: user.cpf,
        weight: weight,
        image: imageUri,
      };
      if (isEdit) {
        await editPet(pet, image);
        Alert.alert("Sucesso", "Pet editado com sucesso!", [
          { text: "Ok", onPress: () => navigation.goBack() },
        ]);
      } else {
        await addPet(pet, image);
        Alert.alert("Sucesso", "Pet adicionado com sucesso!", [
          { text: "Ok", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Tente novamente mais tarde.";
      console.log("title error", title);
      console.log("error", error);
    } finally {
      setIsSaveLoading(false);
    }
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
            loading={isDeleteLoading}
            disabled={isSaveLoading}
          />
          <SpaceH amount={15} />
        </>
      )}
      <CPButton
        title="salvar"
        onPress={() => handleSave()}
        width={isEdit ? scale(180) : undefined}
        loading={isSaveLoading}
        disabled={isDeleteLoading || buttonDisabled}
      />
    </View>
  );

  const Body = () => (
    <View>
      <CPTextInput
        label="nome *"
        placeholder="nome do pet"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <SpaceV amount={15} />
      {SpeciesPicker()}
      <SpaceV amount={15} />

      <CPTextInput
        label="raça *"
        placeholder="raça do pet"
        value={breed}
        onChangeText={(text) => setBreed(text)}
        autoCapitalize="none"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="peso aproximado (kg) *"
        placeholder="peso do pet"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />
      <SpaceV amount={15} />

      <CPTextInput
        label="data de nascimento *"
        placeholder="data de nascimento do pet"
        value={birthdate}
        onChangeText={(text) => setBirthdate(text)}
        mask="date"
        keyboardType="numeric"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="cor *"
        placeholder="cor do pet"
        value={color}
        onChangeText={(text) => setColor(text)}
        autoCapitalize="none"
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
