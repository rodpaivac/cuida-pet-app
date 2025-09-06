import { COLOR } from "@theme/colors";
import { isTablet, scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        padding: scale(25)
    },
    label: {
        color: COLOR.sand,
        marginBottom: verticalScale(5)
    },

    footer: {
        alignItems: 'center',
        marginTop: verticalScale(25),
        marginBottom: verticalScale(50)
    }

});
