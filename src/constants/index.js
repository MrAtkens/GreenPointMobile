import images from "./images";
import { COLORS, SIZES, FONTS } from "./theme";
import { GOOGLE_API_KEY, LONGITUDE_DELTA, LATITUDE_DELTA } from "./maps"

const formStates = {
    SING_IN: 'SING_IN',
    SING_UP: 'SING_UP',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    CHANGE_USERNAME: 'CHANGE_USERNAME',
    ACCOUNT: 'ACCOUNT'
}

const buttonStates = {
    ACCOUNT: 'ACCOUNT',
    GEO: 'GEO',
    COMMENTS: 'COMMENTS'
}

export { images, COLORS, SIZES, FONTS, GOOGLE_API_KEY, LONGITUDE_DELTA, LATITUDE_DELTA, formStates, buttonStates};
