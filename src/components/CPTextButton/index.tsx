import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
};

const CPTextButton: React.FC<Props> = ({ title, onPress, loading = false }) => {
  return (
    <Pressable onPress={() => (loading ? {} : onPress())}>
      <View style={styles.textContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default CPTextButton;
