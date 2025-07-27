import { COLOR } from "@theme/colors";
import { scale, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(35)
    },
    icon: {
        width: 30,
        height: 30,
    }
});

