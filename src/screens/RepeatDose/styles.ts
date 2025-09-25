import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: verticalScale(25)
    },
    title: {
        fontFamily: FONT.PoppinsBold,
        color: COLOR.primary,
        fontSize: 35,
        marginBottom: verticalScale(15)
    },
    subtitle: {
        fontFamily: FONT.PoppinsExtraLight,
        color: COLOR.primary,
        fontSize: 20,
    },
    vaccineItemContainer: {
        backgroundColor: COLOR.sand,
        borderRadius: 15,
        padding: scale(15),
        marginBottom: verticalScale(15)
    },
    vaccineItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    vaccineTitle: {
        fontFamily: FONT.PoppinsBold,
        fontSize: 14,
        marginRight: scale(8),
        color: COLOR.darkBrown
    },
    vaccineDate: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 14,
    },
    footerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: verticalScale(25),
        marginBottom: verticalScale(150)

    },
});
