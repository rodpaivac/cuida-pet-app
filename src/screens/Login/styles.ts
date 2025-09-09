import { COLOR } from "@theme/colors";
import { scale, screenHeight, verticalScale } from "@utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.primary,
        flex: 1,
        alignItems: 'center',
    },
    bg: {
        width: verticalScale(349),
        height: verticalScale(535),
        marginTop: verticalScale(135)
    },
    cachorro: {
        width: verticalScale(438),
        height: verticalScale(658),
        position: 'absolute',
        bottom: verticalScale(222),
        elevation: 1,
        zIndex: 1,
    },
    text: {
        color: COLOR.sand,
        marginTop: verticalScale(25),
        marginBottom: verticalScale(34),
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 20,
        alignSelf: 'center'
    },
    bottomSheetContainer: {
        backgroundColor: COLOR.secondary,
        alignItems: 'center',
        height: screenHeight,
        position: 'absolute',
        width: '100%'
    },
    expandedSection: {
        alignItems: 'center',
        height: screenHeight

    },
    buttonContainer: {
        marginTop: verticalScale(20)
    },
    footerContainer: {
        marginTop: verticalScale(20)
    }
})