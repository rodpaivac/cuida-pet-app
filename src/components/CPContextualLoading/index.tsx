import { COLOR } from "@theme/colors";
import {
  scale,
  screenHeight,
  screenWidth,
  verticalScale,
} from "@utils/dimensions";
import React from "react";

import { memo, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONT } from "@theme/fonts";

const TEXTBOX_HEIGHT = screenHeight * 0.5;
const GAP = verticalScale(16);
const WIDTH = scale(300);
const LEFT = (screenWidth - WIDTH) / 2;

const ANIMATION_DURATION = 1000;
const ANIMATION_STAGGER = 1800;

export type Props = {
  textLines: string[];
  onFinish?: (finished?: boolean) => void;
};

const CPContextualLoading = ({ textLines, onFinish }: Props) => {
  const textOpacityAnim = useRef(
    textLines.map(() => new Animated.Value(0))
  ).current;
  const textTranslateYAnim = useRef(new Animated.Value(TEXTBOX_HEIGHT)).current;
  const [heights, setHeights] = useState<number[]>([]);
  const progressBarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let translateY = TEXTBOX_HEIGHT;
    if (heights.length !== textLines.length || !heights.every(Boolean)) {
      return;
    }
    const animations = Animated.stagger(
      ANIMATION_STAGGER,
      textOpacityAnim.map((_anim, i) => {
        translateY -= (heights[i] || 0) + GAP;
        return Animated.parallel([
          ...textOpacityAnim.map((anim, j) =>
            Animated.timing(anim, {
              toValue: j === i ? 1 : j === i - 1 ? 0.3 : 0,
              duration: ANIMATION_DURATION,
              useNativeDriver: true,
            })
          ),
          Animated.timing(textTranslateYAnim, {
            toValue: translateY,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(progressBarAnim, {
            toValue: (i + 1) / textLines.length,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
          }),
        ]);
      })
    );

    animations.start(({ finished }) => {
      setTimeout(() => {
        onFinish?.(finished);
      }, Math.abs(ANIMATION_STAGGER - ANIMATION_DURATION));
    });

    return () => {
      animations.stop();
    };
  }, [heights]);

  return (
    <SafeAreaView style={styles.loading}>
      <View style={styles.textBox}>
        {textLines.map((line, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: textOpacityAnim[index],
              transform: [{ translateY: textTranslateYAnim }],
            }}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setHeights((prevHeights) => {
                prevHeights[index] = height;
                if (
                  prevHeights.length === textLines.length &&
                  prevHeights.every(Boolean)
                )
                  return [...prevHeights]; // mutate, trigger re-render
                else return prevHeights; // return the same array to avoid re-render
              });
            }}
          >
            <Text style={styles.text}>{line}</Text>
          </Animated.View>
        ))}
      </View>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: Animated.multiply(progressBarAnim, scale(300)) },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(CPContextualLoading);

export const styles = StyleSheet.create({
  loading: {
    backgroundColor: COLOR.primary,
    width: screenWidth,
    height: screenHeight,
  },
  textBox: {
    position: "absolute",
    top: 0,
    left: LEFT,
    width: WIDTH,
    height: TEXTBOX_HEIGHT,
    gap: GAP,
    overflow: "hidden",
  },
  text: {
    color: COLOR.darkBrown,
    fontSize: 18,
    fontFamily: FONT.PoppinsLight,
  },
  progressBarBackground: {
    position: "absolute",
    top: TEXTBOX_HEIGHT + GAP,
    left: LEFT,
    width: WIDTH,
    height: scale(4),
    backgroundColor: COLOR.green1,
    borderRadius: 60,
  },
  progressBar: {
    height: scale(4),
    backgroundColor: COLOR.green3,
    borderRadius: 60,
  },
});
