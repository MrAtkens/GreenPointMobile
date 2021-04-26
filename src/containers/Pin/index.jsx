import * as React from 'react';
import {Dimensions, StyleSheet, View, Image} from 'react-native';
import {Avatar, Button, Divider, Icon} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Text } from 'react-native-elements'
import {observer} from "mobx-react-lite";
import mapStore from 'stores/mapStore'
import {buttonStates, COLORS, FONTS, SIZES} from "../../constants";
import { t } from 'react-native-tailwindcss';

import systemStore from "../../stores/systemStore";
import {Formik} from "formik";
import * as yup from 'yup'
const commentValidationSchema = yup.object().shape({
    comment: yup.string().required('Пожалуйста напишите комментарий'),
})

import TextArea from "../TextArea";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const Pin = observer(() => {
    const onLike = (spotId, commentId) => {
        systemStore.like(spotId, commentId).then(()=> {
            mapStore.updateComments(spotId).then(() => {

            })
        })
    }

    const onSubmit = (data) => {
        mapStore.addComment(data.comment)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image
                    style={styles.itemContainer}
                    source={{ uri: item }}
                />
            </View>
        );
    }

    const renderComment = ({ item }) => {
        return (
            <View style={[styles.commentContainer, t.shadowLg]}>
                <Text style={[FONTS.body4, {marginHorizontal: 10, marginVertical: 10, height: 80}]}>{item.text}</Text>
                <Divider style={{ backgroundColor: COLORS.bottomButton }} />
                <View style={styles.userDetail}>
                    <Avatar
                        containerStyle={styles.avatarContainer}
                        rounded
                        source={{
                            uri: item.authorsAvatarUrl
                        }}
                    />
                    <View style={styles.userName}>
                        <Text style={FONTS.body3}>{item.authorsUsername}</Text>
                        <View style={{flexDirection: "row"}}>
                            <Text style={FONTS.body4}>{item.authorsStatus}</Text>
                            <Icon size={15} name='like1' type='ant-design' style={{marginHorizontal: 5}}
                                  color={systemStore.buttonState === buttonStates.ACCOUNT ? COLORS.white : COLORS.primary} />
                            <Text style={FONTS.body4}>{item.likes}</Text>
                        </View>
                        <Text style={FONTS.body4}>{item.creationDate}</Text>
                    </View>
                    <View style={styles.actions}>
                        <Button
                            buttonStyle={styles.button}
                            containerStyle={[styles.buttonContainer, t.shadow]}
                            icon={<Icon size={SIZES.comment_icon} name='like1' type='ant-design'
                                        color={COLORS.primary} />}
                            loadingProps={{ animating: true }}
                            loadingStyle={{}}
                            onPress={() => onLike(mapStore.spot.id, item.id)}
                        />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {mapStore.isOpen ? (
                <View style={styles.form}>
                    <Formik
                        validationSchema={commentValidationSchema}
                        onSubmit={values => onSubmit(values)}
                        initialValues={{ comment: '' }}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                            <>
                                <TextArea
                                    onChangeText={handleChange('comment')}
                                    onBlur={handleBlur('comment')}
                                    value={values.comment}
                                    error={errors.comment}
                                    errorText={errors.comment}
                                />
                                <View style={styles.buttonForm}>
                                    <Button
                                        title="Добавить"
                                        buttonStyle={[styles.buttonComment, {marginLeft: 30}]}
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                    />
                                    <Button
                                        title="Отменить"
                                        buttonStyle={styles.buttonCancel}
                                        onPress={() => mapStore.setIsOpen(false)}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
                ) : (
                <View style={styles.container}>
                    <Carousel
                        data={mapStore.spot.images}
                        renderItem={renderItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        layout={'tinder'} layoutCardOffset={9}
                        firstItem={mapStore.spot.images.length-1}
                        useScrollView={true}
                    />
                    <Text style={[FONTS.body3, styles.description]}>{mapStore.spot.details}</Text>
                    <Carousel
                        data={mapStore.comments}
                        firstItem={mapStore.comments.length-1}
                        renderItem={renderComment}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        layout={'tinder'} layoutCardOffset={9}
                        useScrollView={true}
                    />
                    {mapStore.isNear === mapStore.spot.id && (
                        <Button
                            title="Добавить комментарий"
                            buttonStyle={[styles.buttonComment, {marginHorizontal: 40, marginBottom: 20}]}
                            onPress={() => mapStore.setIsOpen(true)}
                        />
                    )}
                </View>
            )}


        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form:{
        paddingHorizontal: 10,
        paddingVertical: 30,
        marginHorizontal: 30,
        borderRadius: SIZES.radius - 10
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 35
    },
    divider:{
        backgroundColor: COLORS.bottomButton,
        marginTop: 10,
        width: "100%"
    },
    counter: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description:{
        marginBottom: 20,
        marginHorizontal: 20,
    },
    commentContainer: {
        height: 170,
        marginRight: 35,
        flexDirection: "column",
        backgroundColor: COLORS.white,
    },
    userDetail:{
        flexDirection: "row",
        paddingHorizontal: 10
    },
    userName:{
        marginTop: 5,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    avatarContainer:{
        marginRight: 10,
        marginTop: 10,
        height: SIZES.radius+15,
        width: SIZES.radius+15
    },
    buttonContainer:{
        marginHorizontal: SIZES.padding+20,
        marginTop: 10,
        borderRadius: SIZES.radius,
        height: 40,
        width: 40
    },
    button:{
        backgroundColor: COLORS.bottomButton,
        width: 40,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
    },
    buttonComment:{
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: COLORS.primary
    },
    buttonAlternative:{
        backgroundColor: COLORS.primary,
        width: 40,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
    },
    actions:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCancel:{
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: COLORS.error,
        marginLeft: 20
    },
    buttonForm:{
        flexDirection: "row"
    }
});

export default Pin;
