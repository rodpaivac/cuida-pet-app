import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

import paw from "@assets/icons/paw.png";
import { COLOR } from "@theme/colors";
import { scale } from "@utils/dimensions";

type Props = {
  title: string;
  onPress: () => void;
  showIcon?: boolean;
  backgroundColor?: string;
  textColor?: string;
  width?: number;
  disabled?: boolean;
  dark?: boolean;
};

const CPButton: React.FC<Props> = ({
  title,
  onPress,
  showIcon = false,
  backgroundColor,
  textColor,
  width,
  disabled = false,
  dark = false,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: disabled
            ? COLOR.gray
            : backgroundColor
            ? backgroundColor
            : dark
            ? COLOR.secondary
            : COLOR.sand,
          width: width ?? scale(220),
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.row}>
        {showIcon && (
          <View style={styles.circle}>
            <Image style={styles.image} source={paw} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              {
                color: disabled
                  ? COLOR.gray
                  : textColor ?? dark
                  ? COLOR.sand
                  : COLOR.darkBrown,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CPButton;
