import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import { COLOR } from "@theme/colors";

type Props = {
  isLoading: boolean;
  dark?: boolean;
};

const CPLoading: React.FC<Props> = ({ isLoading, dark }) => {
  return (
    <>
      {isLoading && (
        <View
          style={[
            styles.container,
            { backgroundColor: dark ? COLOR.secondary : COLOR.primary },
          ]}
        >
          <ActivityIndicator
            size={"large"}
            color={dark ? COLOR.green1 : COLOR.secondary}
          />
        </View>
      )}
    </>
  );
};

export default CPLoading;
