import { COLOR } from "@theme/colors";
import { scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.primary,
        flex: 1,
        alignItems: 'center',
    },
    bg: {
        width: verticalScale(295),
        height: verticalScale(445),
        marginTop: verticalScale(135)
    },
    cachorro: {
        width: verticalScale(438),
        height: verticalScale(658),
        position: 'absolute',
        bottom: verticalScale(222),
        elevation: 1,
        zIndex: 1,
    }
})