import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    name: {
        fontFamily: FONT.PoppinsBold,
        color: COLOR.darkBrown,
        fontSize: 35
    },
    age: {
        fontFamily: FONT.PoppinsExtraLight,
        color: COLOR.darkBrown,
        fontSize: 20
    },
    addVaccineButton: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLOR.darkBrown,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(15),
        marginVertical: verticalScale(15)
    },
    buttonText: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 16
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
        color: COLOR.darkBrown,
        fontSize: 14
    },
    vaccineDate: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 14
    },
    vaccineInfoLabel: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 14,
        marginRight: scale(10)
    },
    vaccineInfoValue: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 14,
        textAlign: 'right',
        width: scale(230)
    },
    chevronIcon: {
        width: scale(30),
        height: scale(30)
    },
    chevronIconContainer: {
        justifyContent: 'center'
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scale(5),
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(6),
        borderRadius: 7.5,
        flex: 1,
        marginTop: verticalScale(8)
    },
    actionButtonText: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 12
    },
    collapsedContainer: {
        marginTop: scale(8)
    }
});
