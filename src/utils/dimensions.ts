import { Dimensions } from "react-native";

export const screenWidth: number = Dimensions.get('window').width;
export const screenHeight: number = Dimensions.get('window').height;

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

export const scale = (size: number) => {
    return (screenWidth / guidelineBaseWidth) * size;
}

export const verticalScale = (size: number) => {
    return (screenHeight / guidelineBaseHeight) * size;

}

export const isTablet = () => {
    return Math.min(screenWidth, screenHeight) >= 600;
}