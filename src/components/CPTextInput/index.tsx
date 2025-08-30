import React from "react";
import { KeyboardType, Text, TextInput, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";

type Props = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  keyboardType?: KeyboardType;
  isPassword?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  showForgotPassword?: boolean;
  customStyle?: ViewStyle;
};

const CPTextInput: React.FC<Props> = ({
  placeholder,
  onChangeText,
  value,
  keyboardType,
  isPassword = false,
  autoCapitalize,
  showForgotPassword = false,
  customStyle,
}) => {
  return (
    <>
      <View style={[styles.container, customStyle]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLOR.gray}
          keyboardType={keyboardType}
          secureTextEntry={isPassword}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {showForgotPassword && (
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </View>
      )}
    </>
  );
};

export default CPTextInput;
