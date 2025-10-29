import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import petImage from "@assets/images/default_pet.png";
import userImage from "@assets/images/user.png";

type Props = {
  onSelect: (image: FormData) => void;
  imageUri: string | null;
  type: "pet" | "user";
};

const CPImagePicker: React.FC<Props> = ({ onSelect, imageUri, type }) => {
  const [uri, setUri] = useState<string | null>(imageUri);

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      const formData = new FormData();
      formData.append("file", {
        uri: asset.uri, // caminho da imagem
        name: asset.fileName || `photo_${Date.now()}.jpg`,
        type: asset.type || "image/jpeg",
      } as any);

      setUri(asset.uri);

      onSelect(formData);
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
    <Image style={styles.image} resizeMode="contain" src={uri!} />
  );
  return (
    <Pressable style={styles.container} onPress={() => uploadImage()}>
      {uri ? CustomImage() : DefaultImage()}
      <Text style={styles.loadImage}>alterar imagem</Text>
    </Pressable>
  );
};

export default CPImagePicker;
