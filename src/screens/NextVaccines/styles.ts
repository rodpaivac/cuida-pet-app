import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { isTablet, scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(10),
        backgroundColor: COLOR.green1,
        paddingHorizontal: scale(15),
        paddingVertical: scale(25),
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionTitle: {
        fontFamily: FONT.PoppinsBold,
        color: COLOR.darkBrown,
        fontSize: 20
    },
    itemText: {
        fontFamily: FONT.PoppinsLight,
        color: COLOR.sand,
        fontSize: 18
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: COLOR.sand,
        padding: scale(10),
        marginBottom: verticalScale(10),
        borderRadius: 15
    },
    icon: {
        width: scale(40),
        height: scale(40)
    }

});
