import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, screenHeight, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";
const SCREEN_HEIGHT = screenHeight;

export const styles = StyleSheet.create({
    text: {
        color: COLOR.sand,
        marginTop: verticalScale(48),
        marginBottom: verticalScale(34),
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 20,
    },
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT * 0.5,
        backgroundColor: COLOR.secondary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        zIndex: 1
    },
    expandedSection: {
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: verticalScale(20)
    },
    footerContainer: {
        marginTop: verticalScale(20)
    }
});

