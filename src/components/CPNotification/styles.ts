import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLOR.brown,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: scale(15),
        paddingTop: scale(35),
        position: 'absolute',
        top: 0,
        zIndex: 1
    },
    title: {
        fontFamily: FONT.PoppinsSemiBold,
        color: COLOR.darkBrown,
        fontSize: 14,
        width: '92%',
    },
    body: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 14,
        width: '92%',
    },
    content: {
        flex: 1
    },
    closeContainer: {
        padding: scale(3),

    },
    icon: {
        width: scale(8),
        height: scale(8),
    },
});

