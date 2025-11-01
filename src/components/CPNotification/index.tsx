import React, { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import close from "@assets/icons/close.png";
import { OSNotification } from "react-native-onesignal";
import { useNavigation } from "@react-navigation/native";

type Props = {
  data: OSNotification;
  onClose: () => void;
};

export type NotificationAdditionalDataProps = {
  route?: string;
};

const CPNotification: React.FC<Props> = ({ data, onClose }) => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 7000);
  }, []);

  const handleOnPress = () => {
    // opção de navegar utilizando Additional Data
    if (!data.additionalData) {
      onClose();
      return;
    }
    const { route } = data.additionalData as NotificationAdditionalDataProps;
    if (route && route === "/next-vaccines") {
      navigation.navigate("NextVaccines");
      onClose();
    }
    onClose();

    // launchURL está vindo undefined, aparentemente ele só vem no click, e não no "NotificationWillDisplayEvent"
    // if (data.launchURL) {
    //   Linking.openURL(data.launchURL);
    //   onClose();
    // }
  };
  return (
    <Pressable style={styles.container} onPress={handleOnPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        {data.body && <Text style={styles.body}>{data.body}</Text>}
      </View>
      <Pressable style={styles.closeContainer} onPress={onClose}>
        <Image style={styles.icon} source={close} />
      </Pressable>
    </Pressable>
  );
};

export default CPNotification;
