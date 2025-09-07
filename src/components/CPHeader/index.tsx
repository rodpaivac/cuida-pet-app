import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import menuDark from "@assets/icons/menu-dark.png";
import menuLight from "@assets/icons/menu-light.png";

import notificationDark from "@assets/icons/notification-dark.png";
import notificationLight from "@assets/icons/notification-light.png";

import backDark from "@assets/icons/back-dark.png";
import backLight from "@assets/icons/back-light.png";

import { styles } from "./styles";
import { COLOR } from "@theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";

type Props = {
  backgroundColor?: string;
  goBack?: boolean;
  title?: string;
  dark?: boolean;
};

const CPHeader: React.FC<Props> = ({
  backgroundColor,
  goBack = false,
  title,
  dark = false,
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const MenuButton = () => {
    const navigate = () => {
      if (route.name === "Menu") {
        navigation.goBack();
      } else {
        navigation.navigate("Menu");
      }
    };

    return (
      <Pressable onPress={() => navigate()}>
        <Image style={styles.icon} source={dark ? menuLight : menuDark} />
      </Pressable>
    );
  };

  const NotificationButton = () => (
    <Pressable onPress={() => navigation.navigate("Notifications")}>
      <Image
        style={styles.icon}
        source={dark ? notificationLight : notificationDark}
      />
    </Pressable>
  );

  const GoBackButton = () => (
    <Pressable onPress={() => navigation.goBack()}>
      <Image style={styles.backIcon} source={dark ? backLight : backDark} />
    </Pressable>
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            backgroundColor ?? dark ? COLOR.secondary : COLOR.primary,
        },
      ]}
    >
      {goBack ? (
        <View style={styles.titleContainer}>
          {GoBackButton()}
          <Text
            style={[
              styles.title,
              {
                color: dark ? COLOR.primary : COLOR.darkBrown,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      ) : (
        <>
          {MenuButton()}
          {NotificationButton()}
        </>
      )}
    </View>
  );
};

export default CPHeader;
