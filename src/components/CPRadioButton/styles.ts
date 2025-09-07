import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    textContainer: {
        justifyContent: 'center',
        marginLeft: scale(10)
    },
    text: {
        fontFamily: FONT.PoppinsRegular,
        fontSize: 18
    },
    radioContainer: {
        borderWidth: 1,
        width: scale(35),
        height: scale(35),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInnerCircle: {
        width: scale(15),
        height: scale(15),
        borderRadius: 90
    }
});

