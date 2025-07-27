import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

import paw from "@assets/icons/paw.png";

type Props = {
  title: string;
  onPress: () => void;
};

const CPButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.circle}>
          <Image style={styles.image} source={paw} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CPButton;
