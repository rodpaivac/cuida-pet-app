import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, screenHeight, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";
const SCREEN_HEIGHT = screenHeight;

export const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        paddingVertical: verticalScale(3),
        paddingHorizontal: scale(15),
        borderRadius: 15
    },
    textInput: {
        height: verticalScale(45),
        fontFamily: FONT.PoppinsLight,
        fontSize: 18,
        width: scale(300)
    },
    forgotPassword: {
        color: COLOR.sand
    },
    forgotPasswordContainer: {
        width: scale(330),
        marginTop: verticalScale(8)
    },
    label: {
        color: COLOR.sand,
        marginBottom: verticalScale(5)
    },
});