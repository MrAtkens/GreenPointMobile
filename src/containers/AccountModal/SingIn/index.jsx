import * as React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import { StyleSheet, View} from 'react-native';
import { Button, Text } from 'react-native-elements';
import {observer} from "mobx-react-lite";

import {COLORS, SIZES} from "../../../constants";
import Input from '../../Input'

import systemStore from "stores/systemStore";

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Почта введена неверно")
        .required('Пожалуйста введите почту'),
    password: yup
        .string()
        .min(8, ({ min }) => `Пароль должен быть длиной не меньше ${min} символов`)
        .required('Пожалуйста введите пароль'),
})

const SingIn = observer(() => {

    const onSubmit = (data) => {
        console.log(data)
        systemStore.authenticate(data.email, data.password).then(() => {
            console.log("Запрос прошёл")
        })
    }
    return (
        <View style={styles.form}>
            {systemStore.isUserNotExist && (<Text style={styles.error}>Данный пользователь не сущетсвует</Text>)}
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => onSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <>
                        <Input
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Почта"
                            error={errors.email}
                            errorText={errors.email}
                            leftIcon={{ type: 'material-icons', name: 'email', size: 15 }}
                        />
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
                        <Button
                            title="Войти"
                            buttonStyle={styles.button}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        />
                    </>
                )}
            </Formik>
        </View>
    );
})

const styles = StyleSheet.create({
    form:{
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: SIZES.radius - 10
    },
    button:{
        borderRadius: SIZES.radius,
        marginTop: 10,
        backgroundColor: COLORS.primary
    },
    error:{
        color: COLORS.error,
        marginLeft: 10,
        marginBottom: 10
    },
    input:{
        marginLeft: 5
    }
});

export default SingIn;
