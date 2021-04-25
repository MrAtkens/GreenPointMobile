import * as React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {Avatar, Button, Divider, Icon} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Text } from 'react-native-elements'
import {observer} from "mobx-react-lite";
import mapStore from 'stores/mapStore'
import {buttonStates, COLORS, FONTS, SIZES} from "../../constants";
import { Image } from 'react-native-elements';
import { t } from 'react-native-tailwindcss';

import systemStore from "../../stores/systemStore";
import * as SecureStore from "expo-secure-store";


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const Pin = observer(() => {

    const isLike = async(commentId: string) => {
        const state = await SecureStore.getItemAsync(commentId)
        console.log("PIZDEC")
        console.log(state)
        return state === "TRUE";
    }

    const renderItem = ({ item }:any) => {
        return (
            <View style={styles.itemContainer}>
                <Image
                    style={styles.itemContainer}
                    source={{ uri: item }}
                />
            </View>
        );
    }

    const renderComment = ({ item }:any) => {
        console.log(item)
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
                            buttonStyle={systemStore.buttonState === buttonStates.ACCOUNT ? styles.buttonAlternative : styles.button}
                            containerStyle={[styles.buttonContainer, t.shadow]}
                            icon={<Icon size={SIZES.comment_icon} name='like1' type='ant-design'
                                        color={systemStore.buttonState === buttonStates.ACCOUNT ? COLORS.white : COLORS.primary} />}
                            loadingProps={{ animating: true }}
                            loadingStyle={{}}
                            onPress={() => systemStore.like(mapStore.spot.id, item.id)}
                        />
                    </View>
                </View>
            </View>
        );
    }

    return (
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
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
});

export default Pin;
