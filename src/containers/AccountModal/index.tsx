import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {Avatar, Button, Icon, Text} from 'react-native-elements';
import {observer} from "mobx-react-lite";
import {useState, useRef} from "react";
import {COLORS, FONTS, formStates, SIZES} from "../../constants";
import systemStore from 'stores/systemStore'

import SingIn from './SingIn/index'
import SingUp from './SingUp'
import EditUserName from "./EditUserName";
import EditPassword from "./EditPassword";

const AccountModal = observer(() => {

    const changeState = (state : string) => {
        systemStore.changeState(state)
    };

    const logOut = () => {
        systemStore.singOut()
    }

    if(systemStore.user.isAuthenticated){
        return (
            <View style={styles.container}>
                <View style={styles.accountView}>
                    <Avatar
                        containerStyle={styles.avatarContainer}
                        rounded
                        source={{
                            uri:systemStore.user.avatarUrl
                        }}
                    />
                    <View style={styles.userName}>
                        <Text style={FONTS.h2}>{systemStore.user.userName}</Text>
                        <Text style={FONTS.h4}>{systemStore.user.email}</Text>
                        <Text style={FONTS.h4}>Статус: {systemStore.user.status}</Text>
                    </View>
                </View>
                {systemStore.formState === formStates.ACCOUNT && (
                    <View style={styles.actions}>
                        <Button
                            title="Сменить имя"
                            buttonStyle={styles.button}
                            onPress={() => changeState(formStates.CHANGE_USERNAME)}
                        />
                        <Button
                            title="Сменить пароль"
                            buttonStyle={styles.button}
                            onPress={() => changeState(formStates.CHANGE_PASSWORD)}
                        />
                        <Button
                            title="Выйти"
                            buttonStyle={styles.buttonLeave}
                            onPress={logOut}
                        />
                    </View>
                )}

                {systemStore.formState === formStates.CHANGE_USERNAME && (<EditUserName />)}
                {systemStore.formState === formStates.CHANGE_PASSWORD && (<EditPassword />)}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.switcher}>
                <Button
                    buttonStyle={styles.buttonCircle}
                    containerStyle={styles.buttonContainer}
                    icon={<Icon size={SIZES.bottom_icon-12} name='login' type='material-icons' color={COLORS.white} />}
                    loadingProps={{ animating: true }}
                    loadingStyle={{}}
                    onPress={() => changeState(formStates.SING_IN)}
                />
                <Button
                    buttonStyle={styles.buttonCircle}
                    containerStyle={styles.buttonContainer}
                    icon={<Icon size={SIZES.bottom_icon-12} name='user-plus' type='font-awesome' color={COLORS.white} />}
                    loadingProps={{ animating: true }}
                    loadingStyle={{}}
                    onPress={() => changeState(formStates.SING_UP)}
                />
            </View>
            {systemStore.formState === formStates.SING_IN && (<SingIn/>)}
            {systemStore.formState === formStates.SING_UP && (<SingUp/>)}
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer:{
        marginHorizontal: 30,
        marginTop: 10,
        height: SIZES.radius*3,
        width: SIZES.radius*3
    },
    actions:{
        flexDirection: "column",
        paddingHorizontal: 50
    },
    button:{
        borderRadius: 5,
        marginTop: 30,
        backgroundColor: COLORS.primary
    },
    buttonLeave:{
        borderRadius: 5,
        marginTop: 30,
        backgroundColor: COLORS.error
    },
    accountView:{
        flexDirection: "row"
    },
    userName:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCircle:{
        backgroundColor: COLORS.primary,
        width: 40,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        marginHorizontal: 15
    },
    buttonContainer:{
        marginHorizontal: SIZES.padding * 2,
        borderRadius: SIZES.radius + 20,
    },
    switcher:{
        flexDirection: "row",
        justifyContent: "center"
    }
});

export default AccountModal;
