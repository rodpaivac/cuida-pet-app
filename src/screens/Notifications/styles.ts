import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, screenWidth, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({


    cardContainer: {
        backgroundColor: COLOR.sand,
        borderRadius: 15,
        padding: scale(15),
        marginBottom: verticalScale(15)
    },

    title: {
        fontFamily: FONT.PoppinsBold,
        fontSize: 14,
        marginRight: scale(8),
        color: COLOR.darkBrown
    },
    message: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 14,
    },
    emptyContainer: {
        justifyContent: 'center',
    },
    emptyText: {
        textAlign: 'center',
        width: screenWidth - scale(35),
        fontFamily: FONT.PoppinsLight,
        color: COLOR.darkBrown,
    }


});
