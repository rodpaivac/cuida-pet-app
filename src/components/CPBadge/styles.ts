import { FONT } from "@theme/fonts";
import { scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7.5,
        paddingHorizontal: scale(10),
        height: verticalScale(25)
    },
    text: {
        fontFamily: FONT.PoppinsRegular,
        fontSize: 11,
    }

});

