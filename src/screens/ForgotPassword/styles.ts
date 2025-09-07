import { COLOR } from "@theme/colors";
import { isTablet, scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        marginTop: verticalScale(25),
        marginBottom: verticalScale(50)
    }

});
