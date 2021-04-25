import React, {useEffect, useState, useContext} from 'react';
import {AsyncStorage, Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {observer} from "mobx-react-lite";
import {COLORS} from "constants/index";
import mapStore from 'stores/mapStore'
import * as Location from 'expo-location';
import images from "../../constants/images";
import * as SecureStore from "expo-secure-store";


const MapContainer = observer(({userLocation, onChangeLocation, markerOpen} : any) =>{
    const [spots, setSpots] = useState([])
    const userLocationFind = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            onChangeLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })
            await SecureStore.setItemAsync('lat', JSON.stringify(location.coords.latitude))
            await SecureStore.setItemAsync('lng', JSON.stringify(location.coords.longitude))
        }
    }

    const onMarkerPress = (id : string) => {
        console.log(id)
        mapStore.getSpotById(id).then(() => {
            markerOpen()
        })
    }

    useEffect(() => {
        mapStore.setIsLoading(true)
        mapStore.getSpots().then(async() => {
            setSpots(mapStore.getSpotsOnMap)
            await userLocationFind()
        })
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            mapStore.getNearestSpot(userLocation.latitude, userLocation.longitude)
        }, 10000*6);
        return () => clearInterval(interval);
    });

    return (
        <View style={styles.container}>
            <MapView
                loadingEnabled={true}
                loadingIndicatorColor={COLORS.secondary}
                showsBuildings={true}
                showsPointsOfInterest={true}
                region={userLocation}
                style={styles.map}>
                <Marker coordinate={userLocation}>
                    <View style={styles.radius}>
                        <View style={styles.userMarker}/>
                    </View>
                </Marker>
                {spots.map((spot: any) => {
                    return(
                        <Marker key={spot.id} coordinate={{latitude: spot.latitude, longitude: spot.longitude}}
                                onPress={() => onMarkerPress(spot.id)} image={images.pin}>
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1
    },
    radius:{
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: "hidden",
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.3)',
        alignItems: "center",
        justifyContent: "center"
    },
    userMarker:{
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20 / 2,
        overflow: "hidden",
        backgroundColor: "#007AFF"
    }
});

export default MapContainer;
