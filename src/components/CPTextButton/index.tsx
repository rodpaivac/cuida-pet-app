import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  title: string;
  onPress: () => void;
};

const CPTextButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default CPTextButton;
