import React from "react";
import { KeyboardType, Text, TextInput, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";
import { dateMask } from "@utils/date";

type Props = {
  label?: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string | null;
  keyboardType?: KeyboardType;
  isPassword?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  showForgotPassword?: boolean;
  customStyle?: ViewStyle;
  mask?: "date";
};

const CPTextInput: React.FC<Props> = ({
  label,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  isPassword = false,
  autoCapitalize,
  showForgotPassword = false,
  customStyle,
  mask,
}) => {
  const handleChangeText = (text: string) => {
    onChangeText(mask === "date" ? dateMask(text) : text);
  };
  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.container, customStyle]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value ?? undefined}
          onChangeText={handleChangeText}
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
    </View>
  );
};

export default CPTextInput;
