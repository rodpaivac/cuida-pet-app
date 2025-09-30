import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import close from "@assets/icons/close.png";
import { OSNotification } from "react-native-onesignal";
import { useNavigation } from "@react-navigation/native";

type Props = {
  data: OSNotification;
  onClose: () => void;
};

type AdditionalDataProps = {
  route?: string;
};

const CPNotification: React.FC<Props> = ({ data, onClose }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    // opção de navegar utilizando Additional Data
    const { route } = data.additionalData as AdditionalDataProps;
    if (route === "/next-vaccines") {
      navigation.navigate("NextVaccines");
      onClose();
    }

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
