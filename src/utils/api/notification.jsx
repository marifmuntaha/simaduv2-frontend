import {APICore} from './APICore'
import {RToast} from "../../components";

const api = new APICore()

function get(params) {
    const baseUrl = '/notifications'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result;
    }).catch(() => {
        throw new Error()
    })
}

function update() {
    const baseUrl = '/auth/logout'
    return api.create(`${baseUrl}`).then((resp) => {
        const {message} = resp;
        RToast(message, 'success');
        api.setLoggedInUser();
        api.setAuthorization();
    }).catch(() => {
        throw new Error()
    })
}

export {get, update}