import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Image, Button, Icon, Text} from 'react-native-elements';
import {observer} from "mobx-react-lite";
import {useState, useRef, useEffect} from "react";
import {COLORS, FONTS, formStates, SIZES} from "../../constants";
import systemStore from 'stores/systemStore'
import { t } from 'react-native-tailwindcss';
import Carousel from "react-native-snap-carousel";
import mapStore from "../../stores/mapStore";
import images from "../../constants/images";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const MyComments = observer(() => {
    useEffect(() => {
        if(systemStore.user.isAuthenticated)
            systemStore.getMyComments()
    },[])

    const renderComment = ({ item }:any) => {
        console.log(item)
        return(
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image source={images.pin}/>
                    <View style={styles.commentDetail}>
                        <Text style={[FONTS.h2, {fontWeight: "bold"}]}>Header</Text>
                        <Text style={FONTS.h4}>{item.creationDate}</Text>
                    </View>
                    <View style={styles.likeContainer}>
                        <Icon size={25} name='like1' type='ant-design' style={{marginHorizontal: 5}}
                              color={COLORS.primary} />
                        <Text style={[FONTS.body3, {fontWeight: "bold"}]}>{item.likes}</Text>
                    </View>
                </View>
                <View style={styles.comment}>
                    <Text style={FONTS.body2}>{item.text}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.commentContainer}>
                {systemStore.user.isAuthenticated ? (systemStore.myComments.length !== 0 ? (
                    <Carousel
                        data={systemStore.myComments}
                        firstItem={systemStore.myComments.length-1}
                        renderItem={renderComment}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        layout={'tinder'} layoutCardOffset={9}
                        style={{marginRight: 20}}
                        useScrollView={true}
                    />
                ) : (<Text style={[FONTS.h2,{margin:30, textAlign: "center", fontWeight: "bold"}]}>У вас нет оставленных комментарийr</Text>)
                ) : (<Text style={[FONTS.h2,{margin:30, textAlign: "center", fontWeight: "bold"}]}>Вы не зашли в систему</Text>)}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    commentContainer:{
        margin: 10
    },
    card:{
        width: "90%",
        height: "60%",
        borderColor: COLORS.darkgray,
        borderWidth: 2,
        backgroundColor: COLORS.white
    },
    header:{
        flexDirection: "row",
    },
    commentDetail:{
        flexDirection: "column",
        justifyContent:"flex-start",
        marginHorizontal: 10,
        marginVertical: 10
    },
    likeContainer:{
        borderColor: COLORS.darkgray,
        borderStartWidth: 2,
        borderBottomWidth: 2,
        right:0,
        padding: 10,
        position:"absolute",
        justifyContent:"center",
        alignItems: "center"
    },
    comment:{
        margin: 10
    }

});

export default MyComments;
