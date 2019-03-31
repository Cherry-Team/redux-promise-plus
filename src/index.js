import isPromise from 'is-promise';
import { isFSA } from 'flux-standard-action';

export default function promisePlusMiddleware({ dispatch }) {
    return next => action => {
        if (!isFSA(action)) {
            return next(action);
        }
        if(isPromise(action.payload)) {
            dispatch({ ...action, payload: '', isLoading: true });
            return action.payload
                .then(result => dispatch({ ...action, payload: result, isLoading: false }))
                .catch(error => dispatch({ ...action, payload: error, error: true, isLoading: false }));
        }
        return next(action);
    };
}