import React, { useRef } from "react";
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
};

const CPLoginBottomSheet: React.FC<Props> = ({
  bottomSheetAnim,
  bottomSheetHeight,
  openBottomSheet,
  isExpanded,
}) => {
  const navigation = useNavigation();

  const renderExpandedSection = () => (
    <View style={styles.expandedSection}>
      <CPTextInput
        placeholder="e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CPTextInput
        placeholder="senha"
        isPassword
        showForgotPassword
        customStyle={{ marginTop: 15 }}
      />
      <View style={styles.buttonContainer}>
        <CPButton title="Entrar" onPress={() => navigation.navigate("Home")} />
      </View>
      <View style={styles.footerContainer}>
        <CPTextButton title="Criar conta" onPress={() => {}} />
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
