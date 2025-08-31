import React, { JSX } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import CPLoading from "@components/CPLoading";
import CPHeader from "@components/CPHeader";
import { scale } from "@utils/dimensions";
import { COLOR } from "@theme/colors";

type Props = {
  children?: JSX.Element[] | JSX.Element;
  isLoading?: boolean;
  header?: boolean;
  goBack?: boolean;
  ignorePadding?: boolean;
  title?: string;
  noScroll?: boolean;
  dark?: boolean;
};

const CPContainer: React.FC<Props> = ({
  children,
  isLoading = false,
  header = false,
  goBack = false,
  ignorePadding = false,
  title,
  noScroll = false,
  dark = false,
}) => {
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: dark ? COLOR.secondary : COLOR.primary }}
      />
      {isLoading ? (
        <CPLoading isLoading />
      ) : (
        <>
          {(header || goBack || title) && (
            <CPHeader goBack={goBack} title={title} dark={dark} />
          )}
          {noScroll ? (
            <View
              style={[
                styles.container,
                {
                  backgroundColor: dark ? COLOR.secondary : COLOR.primary,
                  padding: ignorePadding ? 0 : scale(15),
                },
              ]}
            >
              {children}
            </View>
          ) : (
            <ScrollView
              style={[
                styles.container,
                {
                  backgroundColor: dark ? COLOR.secondary : COLOR.primary,
                  padding: ignorePadding ? 0 : scale(15),
                },
              ]}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          )}
        </>
      )}
    </>
  );
};

export default CPContainer;
