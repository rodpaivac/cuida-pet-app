import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPTextInput from "@components/CPTextInput";
import { SpaceV } from "@components/Space";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";

type Route = RouteProp<ReactNavigation.RootParamList, "ForgotPassword">;

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuth();
  const route = useRoute<Route>();
  const cpf = route.params.cpf;
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const hideButton = !newPassword || !confirmation;
  const confirmed = newPassword && confirmation && newPassword === confirmation;

  const handlePress = async () => {
    if (!confirmed) {
      Alert.alert("Atenção", "Senhas não conferem");
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(cpf, newPassword);
      Alert.alert("Sucesso", "Senha redefinida com sucesso.", [
        { text: "Ok", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Atenção", "Não foi possível redefinir sua senha =(");
    } finally {
      setLoading(false);
    }
  };

  const Footer = () => (
    <View style={styles.footer}>
      {!hideButton && (
        <CPButton title="salvar" onPress={handlePress} dark loading={loading} />
      )}
    </View>
  );

  const Body = () => (
    <>
      <SpaceV amount={15} />
      <CPTextInput
        label="nova senha"
        placeholder="nova senha"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        isPassword
        dark
      />
      <SpaceV amount={15} />
      <CPTextInput
        label="confirme a nova senha"
        placeholder="confirme a nova senha"
        value={confirmation}
        onChangeText={(text) => setConfirmation(text)}
        isPassword
        dark
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

export default ForgotPassword;
