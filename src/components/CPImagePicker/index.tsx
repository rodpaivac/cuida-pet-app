import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import petImage from "@assets/images/paw-outlined-dark.png";
import userImage from "@assets/images/user.png";

type Props = {
  onSelect: (image: string) => void;
  image?: string | null;
  type: "pet" | "user";
};

const CPImagePicker: React.FC<Props> = ({ onSelect, image, type }) => {
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      onSelect(result.assets[0].uri);
    }
  };

  const DefaultImage = () => (
    <View style={styles.defaultImageContainer}>
      <Image
        style={styles.defaultImage}
        source={type === "pet" ? petImage : userImage}
      />
    </View>
  );

  const CustomImage = () => (
    <Image style={styles.image} resizeMode="contain" src={image!} />
  );
  return (
    <Pressable onPress={() => uploadImage()}>
      {image ? CustomImage() : DefaultImage()}
      <Text style={styles.loadImage}>alterar imagem</Text>
    </Pressable>
  );
};

export default CPImagePicker;
