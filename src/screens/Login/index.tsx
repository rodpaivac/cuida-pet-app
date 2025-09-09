import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "./styles";

import login from "@assets/images/login_2x.png";

import { screenHeight, verticalScale } from "@utils/dimensions";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { COLOR } from "@theme/colors";
import CPButton from "@components/CPButton";
import CPTextInput from "@components/CPTextInput";
import CPTextButton from "@components/CPTextButton";

const SCREEN_HEIGHT = screenHeight;
const INITIAL_HEIGHT = verticalScale(222);
const FINAL_TOP = SCREEN_HEIGHT * 0.8;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expanded, setExpanded] = useState(false);
  const transitionAnim = useRef(new Animated.Value(0)).current;

  const { signIn } = useAuth();
  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = [INITIAL_HEIGHT, FINAL_TOP];

  const expandBottomSheet = () => {
    Animated.timing(transitionAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      bottomSheetRef.current?.snapToIndex(1); // expande
      setExpanded(true);
    });
  };

  const collapseBottomSheet = () => {
    Animated.timing(transitionAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {
      bottomSheetRef.current?.snapToIndex(0); // recolhe
      setExpanded(false);
    });
  };

  const collapsedOpacity = transitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const expandedOpacity = transitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleSignIn = (email: string, password: string) => {
    signIn(email, password);
  };

  const BottomSheetBody = () => (
    <>
      {/* Estado inicial (collapsed) */}
      <Animated.View
        style={[styles.bottomSheetContainer, { opacity: collapsedOpacity }]}
        pointerEvents={expanded ? "none" : "auto"}
      >
        <Text style={styles.text}>Monitore a saúde do seu pet</Text>

        <CPButton title="Iniciar" onPress={expandBottomSheet} />
      </Animated.View>

      {/* Estado expandido */}
      <Animated.View
        style={[styles.expandedSection, { opacity: expandedOpacity }]}
        pointerEvents={expanded ? "auto" : "none"}
      >
        <Text style={styles.text}>Monitore a saúde do seu pet</Text>

        <CPTextInput
          placeholder="e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <CPTextInput
          placeholder="senha"
          isPassword
          showForgotPassword
          onForgotPasswordPress={() =>
            navigation.navigate("UserDataConfirmation")
          }
          customStyle={{ marginTop: 15 }}
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.buttonContainer}>
          <CPButton
            title="Entrar"
            onPress={() => handleSignIn(email, password)}
          />
        </View>
        <View style={styles.footerContainer}>
          <CPTextButton
            title="Criar conta"
            onPress={() => navigation.navigate("NewUser")}
          />
        </View>
      </Animated.View>
    </>
  );

  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={login} />

      {expanded && (
        <TouchableWithoutFeedback onPress={() => collapseBottomSheet()}>
          <View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: COLOR.secondary,
          borderRadius: 30,
        }}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
      >
        <BottomSheetView>{BottomSheetBody()}</BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Login;
