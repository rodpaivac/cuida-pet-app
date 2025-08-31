import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { isTablet, scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        padding: scale(15)
    },
    name: {
        fontFamily: FONT.PoppinsSemiBold,
        color: COLOR.primary,
        fontSize: 18,
        marginBottom: verticalScale(5),
        width: scale(195),
    },
    infoText: {
        fontFamily: FONT.PoppinsLight,
        color: COLOR.primary,
        fontSize: 12,
        width: scale(195),
    },
    userImage: {
        borderRadius: 142,
        width: scale(142),
        height: scale(142),
    },
    headerInfo: {
        justifyContent: 'center',
        marginLeft: scale(15)
    },
    itemText: {
        fontFamily: FONT.PoppinsBold,
        color: COLOR.primary,
        fontSize: 35,
        marginBottom: verticalScale(15)
    },
    itemsContainer: {
        padding: scale(15)
    },
    signOut: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.primary,
        fontSize: 24,
        marginTop: verticalScale(150)
    }

});
