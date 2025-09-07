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
  disabled?: boolean;
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
  disabled = false,
}) => {
  const handleChangeText = (text: string) => {
    onChangeText(mask === "date" ? dateMask(text) : text);
  };
  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.container,
          customStyle,
          { borderColor: disabled ? COLOR.gray : COLOR.sand },
        ]}
      >
        <TextInput
          style={[
            styles.textInput,
            { color: disabled ? COLOR.gray : COLOR.sand },
          ]}
          placeholder={placeholder}
          value={value ?? undefined}
          onChangeText={handleChangeText}
          placeholderTextColor={COLOR.gray}
          keyboardType={keyboardType}
          secureTextEntry={isPassword}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
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
