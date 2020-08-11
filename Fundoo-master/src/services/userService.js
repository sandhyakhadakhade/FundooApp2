/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to server and save that data to database and at login, reset
                    password, forgotpassword time fetching correct information 
                    from database.
 *  @file           : userServices.js        
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 ******************************************************************************/

import axios from 'axios';

/**
 * @description:creating services for registration
 * @param {*used to send registered data to server} data 
 */
export async function userRegister(data) {
    let registerResponse = [];
    try {
        registerResponse = await axios.post("http://34.213.106.173/api/user/userSignUp", data);
        return registerResponse
    } catch (err) {
        return err;
    }
}

/**
 * @description:creating services for login
 * @param {*send login data to server} data 
 */
export async function userLogin(data) {
    try {
        var login = await axios.post("http://34.213.106.173/api/user/login", data); 
        return login;
    } catch (err) {
        let error = { err: "Wrong username or password." }
        return error
    }
}

/**
 * @description:creating services for forgotpassword
 * @param {*send forgotPassword data to server} data
 */
export async function forgotPassword(data) {
    let response = [];
    try {
        response = await axios.post("http://34.213.106.173/api/user/reset", data)
        return response;
    } catch (err) {
        return err;

    }
}
export function encode(data) {
    const formBody = [];
    for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}

/**
* @description:creating services for resetpassword
* @param {*send password data to server} Password 
* @param {*used to generate token and that data is encrypted} token 
*/
export async function resetPassword(data, token) {
    let encodeData = encode(data)
    let responseResetPass = [];
    try {
        responseResetPass = await axios.post("http://34.213.106.173/api/user/reset-password", encodeData,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        return responseResetPass;
    } catch (err) {
        return err;
    }
}



