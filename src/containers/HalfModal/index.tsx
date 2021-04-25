import { Icon, Text } from 'react-native-elements'
import React, {ReactElement} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import Modal from 'react-native-modal';

import {SIZES} from "../../constants";

type ModalProps = {
    children: ReactElement
    onClose: () => void
    visible: boolean
    header?: string
}

const HalfModal = (props: ModalProps) => {
    const Header = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.header || 'Главное'}</Text>
            <TouchableOpacity style={styles.button} onPress={props.onClose}>
                <Icon name="close" style={styles.buttonText} />
            </TouchableOpacity>
        </View>
    )

    return (
        <Modal isVisible={props.visible} onBackButtonPress={props.onClose} animationIn={"slideInUp"} onBackdropPress={props.onClose} onSwipeComplete={props.onClose} swipeDirection="down">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <SafeAreaView style={styles.bottomArea}>
                        <Header />
                        {props.children}
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        width: SIZES.width * 0.9,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
    },
    header: {
        borderRadius: 10,
        margin: 5,
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        height: 50,
        width: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 45,
        borderColor: '#CCC',
    },
    buttonText: {
        color: '#333',
        fontSize: 50,
        alignSelf: 'center',
    },
    bottomArea: {
        height: '100%',
    },
})


export default HalfModal
