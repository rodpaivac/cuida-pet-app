import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPTextInput from "@components/CPTextInput";
import { SpaceV } from "@components/Space";
import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

const UserDataConfirmation: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [cpf, setCpf] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  const navigation = useNavigation();

  const hideButton = !email || !cpf || !birthdate || !phone;

  const handlePress = () => {
    navigation.navigate("ForgotPassword");
  };
  const Footer = () => (
    <View style={styles.footer}>
      {!hideButton && (
        <CPButton title="prosseguir" onPress={handlePress} dark />
      )}
    </View>
  );

  const Body = () => (
    <>
      <SpaceV amount={15} />
      <CPTextInput
        label="email"
        placeholder="email do usuário"
        value={email}
        onChangeText={(text) => setEmail(text)}
        dark
        keyboardType="email-address"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="CPF"
        placeholder="CPF do usuário"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
        dark
        keyboardType="numeric"
        mask="cpf"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="telefone"
        placeholder="telefone do usuário"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        dark
        keyboardType="numeric"
        mask="phone"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="data de nascimento"
        placeholder="data de nascimento do usuário"
        value={birthdate}
        onChangeText={(text) => setBirthdate(text)}
        dark
        keyboardType="numeric"
        mask="date"
      />
    </>
  );

  return (
    <CPContainer goBack title="esqueci minha senha">
      {Body()}
      {Footer()}
    </CPContainer>
  );
};

export default UserDataConfirmation;
