import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPImagePicker, { UploadImageData } from "@components/CPImagePicker";
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
import { removeCpfMask, removePhoneMask } from "@utils/masks";
import { validateCPF } from "@utils/validation";

const NewUser: React.FC = () => {
  const { newUser } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<GenderDTO | null>(null);
  const [image, setImage] = useState<UploadImageData | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [cpf, setCpf] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState<
    string | null
  >(null);

  const [birthdate, setBirthdate] = useState<string | null>(null);

  const [isCpfValid, setIsCpfValid] = useState<boolean | null>(null);
  const isPhoneValid = !!phone && phone.length === 15;
  const isBirthdateValid = !!birthdate && birthdate.length === 10;

  const cpfError = isCpfValid !== null && isCpfValid === false;

  const buttonDisabled =
    !name ||
    !email ||
    !phone ||
    !birthdate ||
    !gender ||
    !cpf ||
    !password ||
    !passwordConfirmation ||
    !isCpfValid ||
    !isPhoneValid ||
    !isBirthdateValid;

  const handleSaveUser = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !birthdate ||
      !gender ||
      !cpf ||
      !password ||
      !passwordConfirmation
    ) {
      return;
    }

    if (password != passwordConfirmation) {
      Alert.alert("Atenção", "As senhas não conferem.");
      return;
    }

    const user: UserDTO = {
      name: name,
      email: email,
      phone: removePhoneMask(phone),
      birthdate: stringToDate(birthdate)!,
      gender: gender,
      cpf: removeCpfMask(cpf),
      avatar: null,
      password: password,
    };
    try {
      setLoading(true);
      await newUser(user, image);
      Alert.alert("Sucesso", "Usuário criado com sucesso!", [
        { text: "Ok", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const onCpfChange = (text: string) => {
    setCpf(text);
    if (text.length === 14) {
      setIsCpfValid(validateCPF(text));
    } else {
      setIsCpfValid(null);
    }
  };

  const onPhoneChange = (text: string) => {
    setPhone(text);
  };

  const onBirthdateChange = (text: string) => {
    setBirthdate(text);
  };

  const Header = () => (
    <View style={styles.headerContainer}>
      <CPImagePicker
        onSelect={(selectedImage) => setImage(selectedImage)}
        imageUri={null}
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
        onPress={() => handleSaveUser()}
        loading={loading}
        disabled={buttonDisabled}
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
        onChangeText={onCpfChange}
        mask="cpf"
        keyboardType="numeric"
        error={cpfError}
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="telefone *"
        placeholder="telefone do usuário"
        keyboardType="numeric"
        value={phone}
        onChangeText={onPhoneChange}
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
        onChangeText={onBirthdateChange}
        mask="date"
        keyboardType="numeric"
      />
      <SpaceV amount={15} />
      {GenderSelection()}
      <SpaceV amount={15} />
      <CPTextInput
        label="senha *"
        placeholder="digite uma senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        isPassword
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="confirmar senha *"
        placeholder="confirme sua senha"
        value={passwordConfirmation}
        onChangeText={(text) => setPasswordConfirmation(text)}
        autoCapitalize="none"
        isPassword
      />
    </View>
  );

  return (
    <CPContainer dark goBack title={"criar conta"}>
      {Header()}
      {Body()}
      {Footer()}
    </CPContainer>
  );
};

export default NewUser;
