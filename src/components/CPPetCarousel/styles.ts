import { COLOR } from "@theme/colors";
import { FONT } from "@theme/fonts";
import { isTablet, scale, verticalScale, } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    carousel: {
        marginTop: verticalScale(45),
        marginBottom: isTablet() ? verticalScale(55) : verticalScale(95)
    },
    card: {
        borderRadius: 60,
        height: scale(415),
        width: scale(260),
        marginRight: scale(20),
        padding: scale(30),
    },
    pawIcon: {
        width: verticalScale(44),
        height: verticalScale(44)
    },
    cardHeader: {
        alignItems: 'flex-end'
    },
    petImage: {
        borderRadius: 180,
        width: scale(180),
        height: scale(180),
    },
    petInfo: {
        alignItems: 'center',
    },
    petName: {
        fontFamily: FONT.PoppinsLight,
        color: COLOR.darkBrown,
        fontSize: 30,
        marginTop: scale(10),
        textAlign: 'center'
    },
    petAge: {
        fontFamily: FONT.PoppinsExtraLight,
        color: COLOR.darkBrown,
        fontSize: 20,
    }
});

