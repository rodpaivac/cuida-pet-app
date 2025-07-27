import React, { useRef, useState } from "react";
import { Animated, Image, Pressable, View } from "react-native";
import { styles } from "./styles";
import CPBottomSheet from "../../components/CPBottomSheet";
import CPLoginBottomSheet from "@components/CPLoginBottomSheet";

import bg from "@assets/images/login_bg.png";
import cachorroCaramelo from "@assets/images/cachorro_caramelo.png";
import cachorroPreto from "@assets/images/cachorro_preto.png";
import { screenHeight, verticalScale } from "@utils/dimensions";

const SCREEN_HEIGHT = screenHeight;
const INITIAL_HEIGHT = verticalScale(222);
const FINAL_TOP = SCREEN_HEIGHT * 0.2;

const Login: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomSheetAnim = useRef(
    new Animated.Value(SCREEN_HEIGHT - INITIAL_HEIGHT)
  ).current;

  const openBottomSheet = () => {
    Animated.timing(bottomSheetAnim, {
      toValue: FINAL_TOP,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsExpanded(true); // só muda depois da animação
    });
  };

  const closeBottomSheet = () => {
    Animated.timing(bottomSheetAnim, {
      toValue: SCREEN_HEIGHT - INITIAL_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsExpanded(false); // só muda depois da animação
    });
  };

  return (
    <Pressable style={styles.container} onPress={() => closeBottomSheet()}>
      <Image style={styles.cachorro} source={cachorroPreto} />
      <Image style={styles.bg} source={bg} />
      <CPLoginBottomSheet
        isExpanded={isExpanded}
        bottomSheetAnim={bottomSheetAnim}
        bottomSheetHeight={SCREEN_HEIGHT - FINAL_TOP}
        openBottomSheet={() => openBottomSheet()}
      />
    </Pressable>
  );
};

export default Login;
