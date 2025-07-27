import React from "react";
import { KeyboardType, TextInput, View } from "react-native";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";

type Props = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  keyboardType?: KeyboardType;
  isPassword?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
};

const CPTextInput: React.FC<Props> = ({
  placeholder,
  onChangeText,
  value,
  keyboardType,
  isPassword = false,
  autoCapitalize,
}) => {
  return (
    <View style={styles.container}>
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
  );
};

export default CPTextInput;
