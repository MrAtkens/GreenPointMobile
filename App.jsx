import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {observer} from "mobx-react-lite";
import Toast from 'react-native-toast-message';

import * as Location from "expo-location";

import {MapContainer, BottomNavigation, Header, HalfModal, AccountModal, PinModal, Pin} from 'containers/index'
import systemStore  from "stores/systemStore";
import mapStore  from "stores/mapStore";
import MyComments from "./src/containers/MyComments";

const App = observer(() =>{
    const [visible, setVisible] = useState(false)
    const [visiblePin, setVisiblePin] = useState(false)
    const [header, setHeader] = useState("")
    const [children, setChildren] = useState(<></>)
    const [userLocation, setUserLocation] = useState({
        latitude: 71.421082,
        longitude: 51.150362,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })

    const onClose = () => {
        setVisible(false)
    }

    const onCloseModal = () => {
        setVisiblePin(false)
    }

    const onOpen = (header) => {
        switch (header){
            case 'Аккаунт':
                const children = (<AccountModal/>)
                setChildren(children)
                break
            case 'Мой комментарий':
                const children3 = (<MyComments/>)
                setChildren(children3)
                break
        }
        setHeader(header)
        setVisible(true)
    }

    const pinOpen = () => {
        setVisiblePin(true)
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            let location = await Location.getCurrentPositionAsync({});
            mapStore.getNearestSpot(location.coords.latitude, location.coords.longitude)
        }, 10000*3);
        return () => clearInterval(interval);
    });


    useEffect(() => {
        const getLng = async() => {
            const lng =  await SecureStore.getItemAsync('lng')
            console.log(lng)
            if(lng !== null)
                setUserLocation({longitude: JSON.parse(lng), latitude: userLocation.latitude, latitudeDelta: userLocation.latitudeDelta, longitudeDelta: userLocation.longitudeDelta})
        }

        const getLat = async() => {
            const lat =  await SecureStore.getItemAsync('lat')
            if(lat !== null)
                setUserLocation({latitude: JSON.parse(lat), longitude: userLocation.longitude, latitudeDelta: userLocation.latitudeDelta, longitudeDelta: userLocation.longitudeDelta})
        }
        getLng()
        getLat()
        async function getUser(){
            const token = await SecureStore.getItemAsync('jwt_token')
            console.log(token)
            if(token)
                await systemStore.getUserData()
        }
        getUser()
    },[])

    return (
        <View style={styles.container}>
            <MapContainer userLocation={userLocation} onChangeLocation={setUserLocation} markerOpen={pinOpen}/>
            <Header/>
            <BottomNavigation onOpen={onOpen} onChangeLocation={setUserLocation}/>
            <HalfModal children={children} header={header} visible={visible} onClose={onClose}/>
            <PinModal header={mapStore.spot.title} visible={visiblePin} onClose={onCloseModal}/>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App
