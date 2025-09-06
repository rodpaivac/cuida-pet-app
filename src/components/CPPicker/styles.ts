import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { scale, screenHeight, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

// Calcular a metade da altura
const halfHeight = screenHeight / 2;

export const styles = StyleSheet.create({
    container: {
        borderColor: COLOR.sand,
        borderWidth: 1,
        paddingVertical: verticalScale(13),
        paddingHorizontal: scale(15),
        borderRadius: 15,

    },
    value: {
        fontFamily: FONT.PoppinsLight,
        color: COLOR.sand,
        fontSize: 18,
    },
    placeholder: {
        fontFamily: FONT.PoppinsLight,
        color: COLOR.gray,
        fontSize: 18,
    },
    label: {
        color: COLOR.sand,
        marginBottom: verticalScale(5)
    },
    modalContainer: {
        backgroundColor: COLOR.green3,
        borderRadius: 30,
        padding: scale(25),
    },
    modalButton: {
        borderRadius: 15,
        paddingVertical: verticalScale(10),
        backgroundColor: COLOR.sand,
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(200),
        alignSelf: 'center'
    },
    modalButtonText: {
        fontFamily: FONT.PoppinsRegular,
        color: COLOR.darkBrown,
        fontSize: 14,
    }
});