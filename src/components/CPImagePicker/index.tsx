import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import petImage from "@assets/images/default_pet.png";
import userImage from "@assets/images/user.png";

export type UploadImageData = {
  base64Image: string;
  mimeType: string;
  fileName: string;
};

type Props = {
  onSelect: (image: UploadImageData) => void;
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
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      if (asset.base64) {
        const uploadData: UploadImageData = {
          base64Image: asset.base64,
          mimeType: asset.type?.includes("/") ? asset.type : "image/jpeg",
          fileName: asset.fileName || `photo_${Date.now()}.jpg`,
        };

        setUri(asset.uri);
        onSelect(uploadData);
      }
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
