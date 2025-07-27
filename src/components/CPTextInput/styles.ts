import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, screenHeight, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";
const SCREEN_HEIGHT = screenHeight;

export const styles = StyleSheet.create({
    container: {
        borderColor: COLOR.sand,
        borderWidth: 1,
        marginBottom: verticalScale(15),
        paddingVertical: verticalScale(3),
        paddingHorizontal: scale(15),
        borderRadius: 15
    },
    textInput: {
        height: verticalScale(45),
        fontFamily: FONT.PoppinsLight,
        color: COLOR.sand,
        fontSize: 18,
        width: scale(300)
    },
});