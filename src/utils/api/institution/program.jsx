import {APICore} from '../APICore.jsx'
import {RToast} from "../../../components/index.jsx";

const api = new APICore()

function get(params) {
    const baseUrl = '/institution/program'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result
    })
}

async function store(params) {
    const baseUrl = '/institution/program'
    return api.createWithFile(baseUrl, params).then((resp) => {
        const {message, result} = resp
        RToast(message, 'success');
        return result;
    }).catch(() => {
        throw new Error()
    });
}

function update(params) {
    const baseUrl = `/institution/program/${params.id}`
    return api.updateWithFile(baseUrl, params).then((resp) => {
        const {message} = resp
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    });
}

function destroy(id) {
    const baseUrl = `/institution/program/${id}`
    return api.delete(baseUrl).then((resp) => {
        const {message} = resp
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    });
}

export {get, store, update, destroy}