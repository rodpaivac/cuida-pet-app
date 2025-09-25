import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { isTablet, scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: scale(15)
    },
    header: {
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        padding: scale(25),
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerColumn: {
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: FONT.PoppinsBold,
        color: COLOR.darkBrown,
        fontSize: 35,
        width: scale(170),
    },
    age: {
        fontFamily: FONT.PoppinsExtraLight,
        color: COLOR.darkBrown,
        fontSize: 20
    },
    pawIcon: {
        width: verticalScale(44),
        height: verticalScale(44),
        marginBottom: verticalScale(10)
    },
    petImage: {
        borderRadius: 140,
        width: scale(140),
        height: scale(140),
    },
    infoContainer: {
        marginTop: verticalScale(30),
        marginBottom: verticalScale(150),

    },
    infoColumn: {

    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoItem: {
        width: scale(184),
        height: scale(111),
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(25),
        marginBottom: verticalScale(15)
    },
    vaccinesButton: {
        backgroundColor: COLOR.secondary,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        width: scale(184),
        height: scale(111),
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: FONT.PoppinsBold,
        color: COLOR.primary,
        fontSize: 15
    },
    infoItemLabel: {
        fontFamily: FONT.PoppinsExtraLight,
        color: COLOR.darkBrown,
        fontSize: 14,
    },
    infoItemValue: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 20,
        textAlign: 'center'
    },
    vaccineIcon: {
        height: scale(50),
        width: scale(50),
        marginBottom: verticalScale(5)
    },
    defaultImageContainer: {
        backgroundColor: COLOR.primary,
        borderRadius: 140,
        width: scale(140),
        height: scale(140),
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultImage: {
        width: scale(65),
        height: scale(65),
    },
});
