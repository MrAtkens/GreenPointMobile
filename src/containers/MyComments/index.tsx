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
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const MyComments = observer(() => {
    useEffect(() => {
        systemStore.getMyComments()
    },[])

    const renderComment = ({ item }:any) => {
        console.log(item)
        return(
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image source={images.pin}/>
                    <View style={styles.commentDetail}>
                        <Text style={FONTS.h2}>Header</Text>
                        <Text style={FONTS.h4}>date</Text>
                    </View>
                    <View style={styles.likeContainer}>
                        <Icon size={15} name='like1' type='ant-design' style={{marginHorizontal: 5}}
                              color={COLORS.primary} />
                        <Text style={FONTS.body4}>likes</Text>
                    </View>
                </View>
                <View style={styles.comment}>
                    <Text style={FONTS.body2}></Text>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.commentContainer}>
                <Carousel
                    data={systemStore.myComments}
                    firstItem={systemStore.myComments.length-1}
                    renderItem={renderComment}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    layout={'tinder'} layoutCardOffset={9}
                    useScrollView={true}
                />
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        padding:10,
        display:"flex",
        flexDirection: "column"
    },
    commentContainer:{
        margin: 10
    },
    card:{
        width: "100%",
        height: "60%",
        borderColor: COLORS.darkgray,
        borderWidth: 2
    },
    header:{
        flexDirection: "row",
        flex: 1,
    },
    commentDetail:{
        flex: 2,
        flexDirection: "column",
        justifyContent:"flex-start"
    },
    likeContainer:{
        flex: 3,
        padding: 20,
        borderColor: COLORS.darkgray,
        borderWidth: 2,
        justifyContent:"center"
    },
    comment:{
        margin: 20
    }

});

export default MyComments;
