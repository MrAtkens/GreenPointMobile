import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {Text} from "react-native-elements";
import {observer} from "mobx-react-lite";
import Toast from 'react-native-toast-message';

import {MapContainer, BottomNavigation, Header, HalfModal, AccountModal, PinModal} from 'containers/index'
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

    const onOpen = (header : string) => {
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
        const getLng = async() => {
            const lng =  await SecureStore.getItemAsync('lng')
            console.log(lng)
            if(lng !== null)
                setUserLocation({longitude: JSON.parse(lng as string), latitude: userLocation.latitude, latitudeDelta: userLocation.latitudeDelta, longitudeDelta: userLocation.longitudeDelta})
        }

        const getLat = async() => {
            const lat =  await SecureStore.getItemAsync('lat')
            if(lat !== null)
                setUserLocation({latitude: JSON.parse(lat as string), longitude: userLocation.longitude, latitudeDelta: userLocation.latitudeDelta, longitudeDelta: userLocation.longitudeDelta})
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
