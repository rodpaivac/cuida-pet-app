import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(15)
    },
    icon: {
        width: 30,
        height: 30,
    },
    backIcon: {
        width: 45,
        height: 45,
        marginLeft: scale(-15)
    },
    title: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 22,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});

