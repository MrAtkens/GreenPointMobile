import { makeAutoObservable } from "mobx";
// @ts-ignore
import { spotService } from 'API';
import {commentService} from "../../API/commentApi";
import PushNotification from "react-native-push-notification";


export interface IMap {
    isLoading: boolean;
    spots: any
    spot: {
        id: string,
        longitude:  number,
        latitude: number,
        title: string,
        details: string,
        images: any
    },
    comments: any,
    nearSpot:{
        id: string,
        longitude:  number,
        latitude: number,
        title: string,
        details: string,
        images: any
    },
    isNear: string,
    isOpen: boolean
}

class MapStore implements IMap{
    isLoading = false;
    spots = []
    spot = {
        id: "",
        longitude: 0,
        latitude: 0,
        title: "",
        details: "",
        images: []
    };
    comments = []
    nearSpot = {
        id: "",
        longitude: 0,
        latitude: 0,
        title: "",
        details: "",
        images: []
    }
    isNear = ""
    isOpen = false

    constructor() {
        makeAutoObservable(this)
    }

    async getSpots(){
        const response = await spotService.getSpots();
        if(response.status === 200){
            this.setSpots(response.data)
        }
        else{
            this.setIsLoading(false)
        }
        this.setIsLoading(false);
    }

    async getSpotById(id : string){
        const response = await spotService.getSpotById(id);
        if(response.status === 200){
            this.setIsLoading(false);
            this.setSpot(response.data)
            const responseComments = await commentService.getCommentById(id);
            this.setComment(responseComments.data)
        }
        else{
            this.setIsLoading(false)
        }
    }

    async addComment(text:string){
        const response = await commentService.addComment(this.spot.id, text, this.spot.longitude, this.spot.latitude);
        console.log(response.status)
        if(response.status === 204){
            this.setIsNear("")
            this.setIsOpen(false)
        }
    }

    async updateComments(id: string){
        const responseComments = await commentService.getCommentById(id);
        this.setComment(responseComments.data)
    }

    async getNearestSpot(lat: number, lng: number){
        const response = await spotService.getNearSpots(lng, lat);
        console.log(response.data)
        if(response.status === 404){
            this.setIsNear("")
        }
        else if(response.status === 200){
            this.setNearSpot(response.data)
            this.setIsNear(response.data.id)
        }
    }

    setSpots(spots : any){
        this.spots = spots
    }

    setSpot(spot: { id: string, longitude:  number, latitude: number, title: string, details: string, images: any }){
        this.spot = spot
    }

    setNearSpot(spot: { id: string, longitude:  number, latitude: number, title: string, details: string, images: any }){
        this.nearSpot = spot
    }
    setIsLoading(state: boolean){
        this.isLoading = state
    }

    setIsNear(id: string){
        this.isNear = id
    }

    setIsOpen(state: boolean){
        this.isOpen = state
    }

    setComment(comments: any){
        this.comments = comments
    }

     get getSpotsOnMap() : any{
        return this.spots
    }
}

export default new MapStore;
