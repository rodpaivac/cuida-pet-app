import React, { JSX } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import CPLoading from "@components/CPLoading";
import CPHeader from "@components/CPHeader";
import { scale, verticalScale } from "@utils/dimensions";
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
  customGoBack?: () => void;
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
  customGoBack,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark ? COLOR.secondary : COLOR.primary,
        paddingTop: verticalScale(15),
      }}
    >
      {isLoading ? (
        <CPLoading isLoading dark />
      ) : (
        <>
          {(header || goBack || title) && (
            <CPHeader
              customGoBack={customGoBack}
              goBack={goBack}
              title={title}
              dark={dark}
            />
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
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={[
                  styles.container,
                  {
                    backgroundColor: dark ? COLOR.secondary : COLOR.primary,
                    padding: ignorePadding ? 0 : scale(15),
                  },
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default CPContainer;
