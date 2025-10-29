import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPImagePicker from "@components/CPImagePicker";
import CPRadioButton from "@components/CPRadioButton";
import CPTextInput from "@components/CPTextInput";
import { SpaceV } from "@components/Space";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { styles } from "./styles";
import { useAuth } from "@hooks/useAuth";
import { GenderDTO, UserDTO } from "@dtos/UserDTO";
import { dateToString, stringToDate } from "@utils/date";
import { useNavigation } from "@react-navigation/native";

const EditUser: React.FC = () => {
  const { user, editUser } = useAuth();
  const navigation = useNavigation();
  const imageUri = user.avatar;

  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState<GenderDTO>(
    (user.gender as GenderDTO) ?? null
  );
  const [selectedImage, setSelectedImage] = useState<FormData | null>(null);
  const [name, setName] = useState<string | null>(user.name ?? null);
  const [phone, setPhone] = useState<string | null>(user.phone ?? null);
  const [email, setEmail] = useState<string | null>(user.email ?? null);
  const [cpf, setCpf] = useState<string>(user.cpf);
  const [birthdate, setBirthdate] = useState<string | null>(
    dateToString(user.birthdate) ?? null
  );

  const handleSave = async () => {
    if (!name || !email || !phone || !birthdate || !gender) {
      return;
    }

    try {
      setLoading(true);
      const userData: UserDTO = {
        name: name,
        phone: phone,
        email: email,
        cpf: cpf,
        birthdate: stringToDate(birthdate)!,
        password: null,
        avatar: imageUri,
        gender: gender,
      };
      await editUser(userData, selectedImage);
      Alert.alert("Sucesso", "Seus dados foram atualizados com sucesso", [
        { text: "Ok", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Atenção", "Não foi possível alterar seus dados =(");
    } finally {
      setLoading(false);
    }
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <CPImagePicker
        onSelect={(selectedImage) => setSelectedImage(selectedImage)}
        imageUri={imageUri}
        type="user"
      />
    </View>
  );

  const GenderSelection = () => (
    <View>
      <Text style={styles.label}>Gênero *</Text>
      <CPRadioButton
        text="masculino"
        selected={gender === "man"}
        onChange={(selected) => setGender("man")}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="feminino"
        selected={gender === "woman"}
        onChange={(selected) => setGender("woman")}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="não-binário"
        selected={gender === "non-binary"}
        onChange={(selected) => setGender("non-binary")}
      />
      <SpaceV amount={10} />
      <CPRadioButton
        text="outro"
        selected={gender === "other"}
        onChange={(selected) => setGender("other")}
      />
    </View>
  );

  const Footer = () => (
    <View style={styles.footer}>
      <CPButton
        title="salvar"
        onPress={() => handleSave()}
        loading={loading}
        disabled={!name || !email || !phone || !birthdate || !gender}
      />
    </View>
  );

  const Body = () => (
    <View>
      <CPTextInput
        label="nome *"
        placeholder="nome completo do usuário"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="cpf *"
        placeholder="cpf do usuário"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
        keyboardType="numeric"
        mask="cpf"
        disabled
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="telefone *"
        placeholder="telefone do usuário"
        keyboardType="numeric"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        mask="phone"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="email *"
        placeholder="email do usuário"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="data de nascimento *"
        placeholder="data de nascimento do usuário"
        value={birthdate}
        onChangeText={(text) => setBirthdate(text)}
        mask="date"
        keyboardType="numeric"
      />
      <SpaceV amount={15} />
      {GenderSelection()}
    </View>
  );

  return (
    <CPContainer dark goBack title={"editar conta"}>
      {Header()}
      {Body()}
      {Footer()}
    </CPContainer>
  );
};

export default EditUser;
