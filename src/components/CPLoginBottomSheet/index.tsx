import React, { useRef, useState } from "react";
import { Animated, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import CPButton from "@components/CPButton";
import { useNavigation } from "@react-navigation/native";
import { screenHeight, verticalScale } from "@utils/dimensions";
import CPTextInput from "@components/CPTextInput";
import CPTextButton from "@components/CPTextButton";

type Props = {
  bottomSheetAnim: Animated.Value;
  bottomSheetHeight: number;
  openBottomSheet: () => void;
  isExpanded: boolean;
  onSignIn: (email: string, password: string) => void;
};

const CPLoginBottomSheet: React.FC<Props> = ({
  bottomSheetAnim,
  bottomSheetHeight,
  openBottomSheet,
  isExpanded,
  onSignIn,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const renderExpandedSection = () => (
    <View style={styles.expandedSection}>
      <CPTextInput
        placeholder="e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <CPTextInput
        placeholder="senha"
        isPassword
        showForgotPassword
        onForgotPasswordPress={() =>
          navigation.navigate("UserDataConfirmation")
        }
        customStyle={{ marginTop: 15 }}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <CPButton title="Entrar" onPress={() => onSignIn(email, password)} />
      </View>
      <View style={styles.footerContainer}>
        <CPTextButton
          title="Criar conta"
          onPress={() => navigation.navigate("NewUser")}
        />
      </View>
    </View>
  );

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            top: bottomSheetAnim,
            height: bottomSheetHeight,
          },
        ]}
      >
        <Text style={styles.text}>Monitore a saúde do seu pet</Text>
        {isExpanded ? (
          renderExpandedSection()
        ) : (
          <CPButton title="Iniciar" onPress={() => openBottomSheet()} />
        )}
      </Animated.View>
    </>
  );
};

export default CPLoginBottomSheet;
