import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { isTablet, scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    defaultImageContainer: {
        backgroundColor: COLOR.primary,
        borderRadius: 142,
        width: scale(110),
        height: scale(110),
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        borderRadius: 142,
        width: scale(110),
        height: scale(110),

    },
    defaultImage: {
        width: scale(65),
        height: scale(65),
    },
    loadImage: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.sand,
        fontSize: 14,
        marginTop: verticalScale(15)
    },


});
