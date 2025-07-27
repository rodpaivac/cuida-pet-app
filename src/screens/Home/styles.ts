import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        fontFamily: FONT.PoppinsBold,
        color: COLOR.darkBrown,
        fontSize: 35
    },
    subtitle: {
        fontFamily: FONT.PoppinsExtraLight,
        color: COLOR.darkBrown,
        fontSize: 18
    },
    header: {
        paddingHorizontal: scale(35),
        paddingTop: scale(15)
    },
    footer: {
        alignItems: 'center',
        marginBottom: verticalScale(100)
    }
});

