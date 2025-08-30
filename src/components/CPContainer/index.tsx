import React, { JSX } from "react";
import { ScrollView } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import CPLoading from "@components/CPLoading";
import CPHeader from "@components/CPHeader";
import { scale } from "@utils/dimensions";

type Props = {
  children?: JSX.Element[] | JSX.Element;
  isLoading?: boolean;
  header?: boolean;
  goBack?: boolean;
  ignorePadding?: boolean;
  title?: string;
};

const CPContainer: React.FC<Props> = ({
  children,
  isLoading = false,
  header = false,
  goBack = false,
  ignorePadding = false,
  title,
}) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      {isLoading ? (
        <CPLoading isLoading />
      ) : (
        <>
          {(header || goBack || title) && (
            <CPHeader goBack={goBack} title={title} />
          )}
          <ScrollView
            style={[
              styles.container,
              { padding: ignorePadding ? 0 : scale(15) },
            ]}
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
