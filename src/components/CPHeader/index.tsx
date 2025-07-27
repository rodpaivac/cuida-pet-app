import React from "react";
import { Image, View } from "react-native";
import menu from "@assets/icons/menu.png";
import notification from "@assets/icons/notification.png";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";

type Props = {
  backgroundColor?: string;
};

const CPHeader: React.FC<Props> = ({ backgroundColor = COLOR.primary }) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Image style={styles.icon} source={menu} />
      <Image style={styles.icon} source={notification} />
    </View>
  );
};

export default CPHeader;
