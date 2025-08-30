import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import menu from "@assets/icons/menu.png";
import notification from "@assets/icons/notification.png";
import back from "@assets/icons/back.png";

import { styles } from "./styles";
import { COLOR } from "@theme/colors";
import { useNavigation } from "@react-navigation/native";

type Props = {
  backgroundColor?: string;
  goBack?: boolean;
  title?: string;
};

const CPHeader: React.FC<Props> = ({
  backgroundColor = COLOR.primary,
  goBack = false,
  title,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      {goBack ? (
        <View style={styles.titleContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={back} />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        <>
          <Image style={styles.icon} source={menu} />
          <Image style={styles.icon} source={notification} />
        </>
      )}
    </View>
  );
};

export default CPHeader;
