import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Keyboard,
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
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { COLOR } from "@theme/colors";
import CPButton from "@components/CPButton";
import CPTextInput from "@components/CPTextInput";
import CPTextButton from "@components/CPTextButton";
import { removeCpfMask } from "@utils/masks";
import { SpaceV } from "@components/Space";
import { validateCPF } from "@utils/validation";

const SCREEN_HEIGHT = screenHeight;
const INITIAL_HEIGHT = SCREEN_HEIGHT * 0.3;
const FINAL_TOP = SCREEN_HEIGHT * 0.8;

const Login: React.FC = () => {
  const [cpf, setCpf] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const transitionAnim = useRef(new Animated.Value(0)).current;

  const [isCpfValid, setIsCpfValid] = useState<boolean | null>(null);

  const { signIn } = useAuth();
  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = [INITIAL_HEIGHT, FINAL_TOP];

  const error = isCpfValid != null && !isCpfValid;

  const handleSignIn = async () => {
    if (!cpf || !password || error || cpf.length != 14) {
      Alert.alert("Atenção", "Informe o CPF e senha para fazer o login");
      return;
    }
    try {
      setLoading(true);
      await signIn(removeCpfMask(cpf), password);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Atenção", "Não foi possivel fazer o login =(");
    } finally {
      setLoading(false);
    }
  };

  const onCpfChange = (text: string) => {
    setCpf(text);
    if (text.length === 14) {
      setIsCpfValid(validateCPF(text));
    } else {
      setIsCpfValid(null);
    }
  };

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
    Keyboard.dismiss();
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
          placeholder="CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={onCpfChange}
          mask="cpf"
          error={error}
        />
        <SpaceV amount={15} />
        <CPTextInput
          placeholder="senha"
          isPassword
          showForgotPassword
          onForgotPasswordPress={() =>
            navigation.navigate("UserDataConfirmation")
          }
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <CPButton
            title="Entrar"
            onPress={() => handleSignIn()}
            loading={loading}
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
