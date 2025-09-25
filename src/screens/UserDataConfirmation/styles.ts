import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { isTablet, scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        marginTop: verticalScale(25),
        marginBottom: verticalScale(50)
    },
    title: {
        fontFamily: FONT.PoppinsLight,
        color: COLOR.darkBrown,
        fontSize: 22,
        marginBottom: verticalScale(15)
    },

});
