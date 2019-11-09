import isPromise from 'is-promise';

export default function reduxMiddleware({ dispatch }) {
    return next => action => {
        if(isPromise(action.payload)) {
            dispatch({ ...action, payload: { isLoading: true } });
            return action.payload
                .then(result => {
                    result.isLoading = false;
                    dispatch({ ...action, payload: result});
                })
                .catch(error => {
                    error.isLoading = false;
                    dispatch({ ...action, payload: error, error: true});
                });
        }
        return next(action);
    };
}