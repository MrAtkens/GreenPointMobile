import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {observer} from "mobx-react-lite";
import {COLORS, SIZES, images} from "../../constants/index";

const Header = observer(() =>{
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Image
                    source={images.logo}
                    style={styles.logoImage}
                />
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 45,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    headerView: {
        width: SIZES.width * 0.9,
        paddingVertical: SIZES.padding * 0.5,
        paddingHorizontal: SIZES.padding * 2,
        borderRadius: SIZES.radius - 15,
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    cardInside: {
        flexDirection: "row",
        alignItems: "center"
    },
    logoImage:{
        width: 85,
        height: 40,
        marginHorizontal: SIZES.width * 0.3
    }
});

export default Header
