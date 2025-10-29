import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPTextInput from "@components/CPTextInput";
import { SpaceV } from "@components/Space";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
import { removeCpfMask, removePhoneMask } from "@utils/masks";
import { stringToDate } from "@utils/date";

const UserDataConfirmation: React.FC = () => {
  const { verifyUserData } = useAuth();

  const [email, setEmail] = useState<string | null>(null);
  const [cpf, setCpf] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const hideButton = !email || !cpf || !birthdate || !phone;

  const handlePress = async () => {
    if (!phone || !birthdate || !cpf || !email) {
      Alert.alert("Atenção", "Todos os campos são obrigatórios");
      return;
    }

    try {
      setLoading(true);
      await verifyUserData(
        removeCpfMask(cpf),
        removePhoneMask(phone),
        email,
        stringToDate(birthdate)!
      );
      navigation.navigate("ForgotPassword", { cpf: removeCpfMask(cpf) });
    } catch (error) {
      console.log("error", error);
      Alert.alert(
        "Atenção",
        "Não foi possível verificar seus dados pessoais =("
      );
    } finally {
      setLoading(false);
    }
  };
  const Footer = () => (
    <View style={styles.footer}>
      {!hideButton && (
        <CPButton
          title="prosseguir"
          onPress={handlePress}
          dark
          loading={loading}
        />
      )}
    </View>
  );

  const Body = () => (
    <>
      <SpaceV amount={15} />
      <Text style={styles.title}>
        Verifique seus dados pessoas para redefinir a sua senha:
      </Text>
      <CPTextInput
        label="CPF *"
        placeholder="CPF do usuário"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
        dark
        keyboardType="numeric"
        mask="cpf"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="email *"
        placeholder="email do usuário"
        value={email}
        onChangeText={(text) => setEmail(text)}
        dark
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="telefone *"
        placeholder="telefone do usuário"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        dark
        keyboardType="numeric"
        mask="phone"
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="data de nascimento *"
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
    <CPContainer goBack title="verificação de dados">
      {Body()}
      {Footer()}
    </CPContainer>
  );
};

export default UserDataConfirmation;
