import * as React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import { StyleSheet, View} from 'react-native';
import { Button, Text } from 'react-native-elements';
import {observer} from "mobx-react-lite";

import {COLORS, formStates, SIZES} from "../../../constants";
import Input from '../../Input'

import systemStore from "stores/systemStore";

const loginValidationSchema = yup.object().shape({
    password: yup
        .string()
        .min(8, ({ min }) => `Пароль должен быть длиной не меньше ${min} символов`)
        .required('Пожалуйста введите пароль'),
})

const EditPassword = observer(() => {

    const changeState = (state) => {
        systemStore.changeState(state)
    }

    const onSubmit = (data) => {
        console.log(data)
        systemStore.editPassword(data.password).then(() => {
            console.log("Запрос прошёл")
        })
    }
    return (
        <View style={styles.form}>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ password: '' }}
                onSubmit={values => onSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <>
                        <Input
                            error={errors.password}
                            errorText={errors.password}
                            leftIcon={{ type: 'font-awesome', name: 'lock', size: 15 }}
                            name="password"
                            style={styles.textInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Пароль" secureTextEntry={true}
                        />
                        <View style={styles.buttonForm}>
                            <Button
                                title="Изменить"
                                buttonStyle={styles.button}
                                onPress={handleSubmit}
                                disabled={!isValid}
                            />
                            <Button
                                title="Отменить"
                                buttonStyle={styles.buttonCancel}
                                onPress={() => changeState(formStates.ACCOUNT)}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
})

const styles = StyleSheet.create({
    form:{
        paddingHorizontal: 10,
        paddingVertical: 30,
        marginHorizontal: 30,
        borderRadius: SIZES.radius - 10
    },
    button:{
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: COLORS.primary,
        marginLeft: 30
    },
    buttonCancel:{
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: COLORS.error,
        marginLeft: 20
    },
    error:{
        color: COLORS.error,
        marginLeft: 10,
        marginBottom: 10
    },
    input:{
        marginLeft: 5
    },
    buttonForm:{
        flexDirection: "row"
    }
});

export default EditPassword;
