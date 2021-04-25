import {makeAutoObservable} from "mobx";
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { authenticationService, accountService } from 'API';
import {formStates} from "../../constants";
import {commentService} from "../../API/commentApi";

const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = 0.01

export interface ISystem {
    isSubmitting: boolean;
    user: {
        id: string;
        isAuthenticated: boolean;
        email: string;
        userName: string,
        status: string,
        avatarUrl: string
    },
    formState: string,
    isUserExist: boolean,
    isUserNotExist: boolean,
    buttonState: string,
    myComments: any
}

class SystemStore implements ISystem{
    isSubmitting = false;
    user ={
        isAuthenticated: false,
        id: "",
        email: "...",
        userName: "...",
        status: "",
        avatarUrl: ""
    }
    formState = formStates.SING_IN
    isUserExist = false
    isUserNotExist = false
    buttonState = ""
    myComments = []

    constructor() {
        makeAutoObservable(this)
    }

    async authenticate( email:string, password :string){
        const response = await authenticationService.userSingInApi(email, password);
        console.log(response)
        if(response.status === 200){
            await SecureStore.setItemAsync('jwt_token', response.data);
            this.isSubmitting = false;
            Toast.show({
                type: 'success',
                text1: 'Вы успешно зашли в систему 👋',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 200,
            });
            await this.getUserData()
        }
        else if(response.status === 401){
            this.isUserNotExist = true
            Toast.show({
                type: 'error',
                text1: 'Данный пользователь не зарегистрирован',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 200,
            });
        }
        else{
            this.isSubmitting = false
        }
    }

    async registration( email:string, username:string, password :string){
        const response = await authenticationService.userSingUpApi(email, username, password);
        if(response.status === 200){
            await SecureStore.setItemAsync('jwt_token', response.data);
            this.isSubmitting = false;
            Toast.show({
                type: 'success',
                text1: 'Регистрация прошла успешно 👋',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 200,
            });
            await this.getUserData()
        }
        else if(response.status === 401){
            this.isUserExist = true
            Toast.show({
                type: 'error',
                text1: 'Данный пользователь уже зарегистрирован',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 200,
            });
        }
        else{
            this.isSubmitting = false
        }
    }

    async getUserData(){
        const response = await accountService.userGetData();
        if(response.status === 200) {
            this.setUser(response.data.id, response.data.email, response.data.username, response.data.status, response.data.avatarUrl)
            this.setIsAuth(true);
            this.changeState(formStates.ACCOUNT)
        }
    }

    async editUserName(username: string){
        const response = await accountService.userEditUserNameApi(username);
        if(response.status === 204){
            await this.getUserData()
        }
        else if(response.status === 401){
            await SecureStore.deleteItemAsync('jwt_token')
        }
        else{
            this.isSubmitting = false
        }
    }

    async editPassword(password: string){
        const response = await accountService.userEditPasswordApi(password);
        console.log(response)
        if(response.status === 204){
            this.changeState(formStates.ACCOUNT)
        }
        else if(response.status === 401){
            await SecureStore.deleteItemAsync('jwt_token')
        }
        else{
            this.isSubmitting = false
        }
    }

    async like(spotId: string, commentId: string){
        const response = await accountService.likeComment(spotId, commentId);
        console.log(response)
        if(response.status === 204){
            await SecureStore.setItemAsync(commentId, "TRUE")
        }
    }

    async getMyComments(){
        const response = await commentService.getComments()
        console.log(response)
        this.setMyComments(response.data)
    }

    async singOut(){
        await SecureStore.deleteItemAsync('jwt_token')
        this.setIsAuth(false);
        Toast.show({
            type: 'info',
            text1: 'Вы вышли из системы 👋',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 200,
            props:{
                style:{
                    lineHeight:20
                }
            }
        });
        this.changeState(formStates.SING_IN)
    }

    setId(id : string){
        this.user.id = id
    }

    setIsAuth(auth : boolean){
        this.user.isAuthenticated = auth
    }

    setMyComments(comments: any){
        this.myComments = comments
    }

    setUser(id:string, email:string, userName:string, status: string, avatarUrl: string){
        this.user.id = id;
        this.user.email = email;
        this.user.userName = userName;
        this.user.status = status;
        this.user.avatarUrl = avatarUrl
    }

    changeState(state:string){
        this.formState = state
    }

    changeButtonState(state: string){
        this.buttonState = state
    }

}

export default new SystemStore();
