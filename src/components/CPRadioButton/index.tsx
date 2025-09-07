import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";

type Props = {
  text?: string;
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  dark?: boolean;
};

const CPRadioButton: React.FC<Props> = ({
  text,
  selected = false,
  onChange,
  dark,
}) => {
  const handlePress = () => {
    if (onChange) {
      onChange(!selected);
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => handlePress()}>
      <View
        style={[
          styles.radioContainer,
          { borderColor: dark ? COLOR.secondary : COLOR.sand },
        ]}
      >
        {selected ? (
          <View
            style={[
              styles.radioInnerCircle,
              {
                backgroundColor: dark ? COLOR.green3 : COLOR.green1,
              },
            ]}
          />
        ) : null}
      </View>
      {text && (
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              { color: dark ? COLOR.secondary : COLOR.sand },
            ]}
          >
            {text}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default CPRadioButton;
