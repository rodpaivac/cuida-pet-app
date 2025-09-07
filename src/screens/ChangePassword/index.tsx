import CPButton from "@components/CPButton";
import CPContainer from "@components/CPContainer";
import CPTextInput from "@components/CPTextInput";
import { SpaceV } from "@components/Space";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);

  const [confirmation, setConfirmation] = useState<string | null>(null);

  const hideButton = !currentPassword || !newPassword || !confirmation;
  const confirmed = newPassword && confirmation && newPassword === confirmation;

  const handlePress = () => {
    if (!confirmed) {
      Alert.alert("Atenção", "Senhas não conferem");
    }
  };

  const Footer = () => (
    <View style={styles.footer}>
      {!hideButton && <CPButton title="salvar" onPress={handlePress} dark />}
    </View>
  );

  const Body = () => (
    <>
      <CPTextInput
        label="senha atual"
        placeholder="senha atual"
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
        isPassword
        dark
      />
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
    <CPContainer goBack title="alterar senha">
      {Body()}
      {Footer()}
    </CPContainer>
  );
};

export default ChangePassword;
