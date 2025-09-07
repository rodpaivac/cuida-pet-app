import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";

type Props = {
  text: string;
  backgroundColor?: string;
  textColor?: string;
};

const CPBadge: React.FC<Props> = ({
  text,
  backgroundColor = COLOR.red,
  textColor = COLOR.sand,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

export default CPBadge;
