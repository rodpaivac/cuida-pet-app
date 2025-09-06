import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  text: string;
  selected?: boolean;
  onChange?: (selected: boolean) => void;
};

const CPRadioButton: React.FC<Props> = ({
  text,
  selected = false,
  onChange,
}) => {
  const handlePress = () => {
    if (onChange) {
      onChange(!selected);
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => handlePress()}>
      <View style={styles.radioContainer}>
        {selected ? <View style={styles.radioInnerCircle} /> : null}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default CPRadioButton;
