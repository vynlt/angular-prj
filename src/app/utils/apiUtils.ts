import { HttpHeaders } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';
import { configuration } from '../../configuration';


 const getUuidv4 = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};

export const getHmacString = (data) => {
    const APP_ID = configuration.APP_ID;
    const SECRET_KEY = configuration.SECRET_KEY;

    let bodyEncrypt = '';
    let bodyContent = '';
    if (data) {
        bodyContent = JSON.stringify(data);
        const cutBodyContent = bodyContent.substring(0, 128);
        const wordArray = CryptoJS.enc.Utf8.parse(cutBodyContent);
        bodyEncrypt = CryptoJS.enc.Base64.stringify(wordArray);
    }
    const unixTime = Math.round(new Date().getTime() / 1000.0);
    const uuid = getUuidv4();
    const encrypt = APP_ID + bodyEncrypt + uuid + unixTime;
    const signature = CryptoJS.HmacSHA256(encrypt, SECRET_KEY);
    const base64sign = CryptoJS.enc.Base64.stringify(signature);
    const author = APP_ID + ":" + base64sign + ":" + uuid + ":" + unixTime;
    return 'sign:' + author;
};