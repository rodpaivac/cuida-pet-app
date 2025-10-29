import React from "react";
import {
  KeyboardType,
  Pressable,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";
import { cpfMask, dateMask, phoneMask } from "@utils/masks";

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
  mask?: "date" | "cpf" | "phone";
  disabled?: boolean;
  onForgotPasswordPress?: () => void;
  dark?: boolean;
  onSubmitEditing?: () => void;
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
  onForgotPasswordPress,
  onSubmitEditing,
  dark = false,
}) => {
  const handleChangeText = (text: string) => {
    onChangeText(
      mask === "date"
        ? dateMask(text)
        : mask === "cpf"
        ? cpfMask(text)
        : mask === "phone"
        ? phoneMask(text)
        : text
    );
  };
  return (
    <View>
      {label ? (
        <Text
          testID="label"
          style={[styles.label, { color: dark ? COLOR.darkBrown : COLOR.sand }]}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.container,
          customStyle,
          {
            borderColor: disabled
              ? COLOR.gray
              : dark
              ? COLOR.darkBrown
              : COLOR.sand,
          },
        ]}
      >
        <TextInput
          style={[
            styles.textInput,
            {
              color: disabled
                ? COLOR.gray
                : dark
                ? COLOR.darkBrown
                : COLOR.sand,
            },
          ]}
          placeholder={placeholder}
          value={value ?? undefined}
          onChangeText={handleChangeText}
          placeholderTextColor={dark ? COLOR.brown : COLOR.gray}
          keyboardType={keyboardType}
          secureTextEntry={isPassword}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      {showForgotPassword && (
        <Pressable
          style={styles.forgotPasswordContainer}
          onPress={onForgotPasswordPress}
        >
          <Text style={styles.forgotPassword} testID="forgot-password">
            Esqueci minha senha
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default CPTextInput;
