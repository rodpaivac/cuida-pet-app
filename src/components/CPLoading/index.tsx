import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";

type Props = {
  isLoading: boolean;
};

const CPLoading: React.FC<Props> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} color={COLOR.secondary} />
        </View>
      )}
    </>
  );
};

export default CPLoading;
