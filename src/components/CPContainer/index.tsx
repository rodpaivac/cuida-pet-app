import React, { JSX } from "react";
import { ScrollView } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import CPLoading from "@components/CPLoading";
import CPHeader from "@components/CPHeader";

type Props = {
  children?: JSX.Element[];
  isLoading?: boolean;
  header?: boolean;
};

const CPContainer: React.FC<Props> = ({
  children,
  isLoading = false,
  header = false,
}) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      {isLoading ? (
        <CPLoading isLoading />
      ) : (
        <>
          {header && <CPHeader />}
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default CPContainer;
