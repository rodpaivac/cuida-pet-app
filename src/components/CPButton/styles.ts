import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        borderRadius: 60,
        height: 63,
        alignItems: 'flex-start',
        padding: 4.5,
        justifyContent: 'center'
    },
    circle: {
        backgroundColor: COLOR.darkBrown,
        borderRadius: 60,
        width: 54,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    image: {
        width: 22,
        height: 22
    },
    text: {
        fontFamily: FONT.PoppinsSemiBold,
    }
});

