import React  from 'react';
import { StyleSheet, View } from 'react-native';
import {observer} from "mobx-react-lite";
import {buttonStates, COLORS, SIZES} from "constants/index";
import {Button, Icon} from "react-native-elements";
import * as Location from "expo-location";
import { t } from 'react-native-tailwindcss'
import systemStore from 'stores/systemStore'
import * as SecureStore from "expo-secure-store";

type ModalProps = {
    onOpen: (header : string) => any
    onChangeLocation: ({latitude, longitude, latitudeDelta, longitudeDelta} : any) => void
}
const BottomNavigation = observer((props: ModalProps) => {

    const userLocation = async () => {
        systemStore.changeButtonState(buttonStates.GEO)
        let location = await Location.getCurrentPositionAsync({});
        props.onChangeLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        })
        await SecureStore.setItemAsync('lat', JSON.stringify(location.coords.latitude))
        await SecureStore.setItemAsync('lng', JSON.stringify(location.coords.longitude))
    }

    const onOpen = (formState:string, buttonState:string) => {
        props.onOpen(formState)
        systemStore.changeButtonState(buttonState)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.bottomViewCard, t.shadow2xl]}>
                <View style={styles.cardInside}>
                    <Button
                        buttonStyle={systemStore.buttonState === buttonStates.ACCOUNT ? styles.buttonAlternative : styles.button}
                        containerStyle={[styles.buttonContainer, t.shadowXl]}
                        icon={<Icon size={SIZES.bottom_icon} name='user-circle' type='font-awesome'
                                    color={systemStore.buttonState === buttonStates.ACCOUNT ? COLORS.white : COLORS.primary} />}
                        loadingProps={{ animating: true }}
                        loadingStyle={{}}
                        onPress={() => onOpen("Аккаунт", buttonStates.ACCOUNT)}
                    />
                    <Button
                        buttonStyle={systemStore.buttonState === buttonStates.GEO ? styles.buttonMiddleAlternative : styles.buttonMiddle}
                        containerStyle={[styles.buttonContainer, t.shadowXl]}
                        icon={<Icon size={SIZES.bottom_icon + 10} name='person-pin-circle' type='material-icons'
                                    color={systemStore.buttonState === buttonStates.GEO ? COLORS.white : COLORS.primary}/>}
                        loadingProps={{ animating: true }}
                        loadingStyle={{}}
                        onPress={() => userLocation()}
                    />
                    <Button
                        buttonStyle={systemStore.buttonState === buttonStates.COMMENTS ? styles.buttonAlternative : styles.button}
                        containerStyle={[styles.buttonContainer, t.shadowXl]}
                        icon={<Icon size={SIZES.bottom_icon} name='chat' type='material-icons'
                                    color={systemStore.buttonState === buttonStates.COMMENTS ? COLORS.white : COLORS.primary} />}
                        loadingProps={{ animating: true }}
                        loadingStyle={{}}
                        onPress={() => onOpen("Мой комментарий", buttonStates.COMMENTS)}
                    />
                </View>
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 15,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2
    },
    bottomViewCard: {
        width: SIZES.width * 0.9,
        paddingVertical: SIZES.padding * 1.2,
        paddingHorizontal: SIZES.padding * 1,
        borderRadius: SIZES.radius - 15,
        backgroundColor: COLORS.white,
    },
    buttonMiddle:{
        backgroundColor: COLORS.bottomButton,
        width: 60,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius + 20,
    },
    cardInside: {
        flexDirection: "row",
        alignItems: "center"
    },
    buttonContainer:{
        marginHorizontal: SIZES.padding * 2,
        borderRadius: SIZES.radius + 20,
    },
    button:{
        backgroundColor: COLORS.bottomButton,
        width: 60,
        paddingVertical: SIZES.padding + 5,
        paddingHorizontal: SIZES.padding,
    },
    buttonAlternative:{
        backgroundColor: COLORS.primary,
        width: 60,
        paddingVertical: SIZES.padding + 5,
        paddingHorizontal: SIZES.padding,
    },
    buttonMiddleAlternative:{
        backgroundColor: COLORS.primary,
        width: 60,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius + 20,
    },
    icon:{
        color: COLORS.icon,
    }
});

export default BottomNavigation
