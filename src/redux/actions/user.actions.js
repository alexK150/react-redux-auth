import { userTypes } from '../types/user.types';
import {deleteService,
    getAllService,
    loginService,
    logoutService,
    registerService} from '../../services/user.service';
import { history } from '../../helpers/history';
import {alertErrorAction, alertSuccessAction} from "./alert.actions";

const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));

        loginService(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertErrorAction(error.toString()));
                }
            );
    };

    function request(user) { return { type: userTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: userTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userTypes.LOGIN_FAILURE, error } }
};

const logout = () => {
    logoutService();
    return { type: userTypes.LOGOUT };
};

const register = user => {
    return dispatch => {
        dispatch(request(user));

        registerService(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertSuccessAction('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertErrorAction(error.toString()));
                }
            );
    };

    function request(user) { return { type: userTypes.REGISTER_REQUEST, user } }
    function success(user) { return { type: userTypes.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userTypes.REGISTER_FAILURE, error } }
};

const getAll = () => {
    return dispatch => {
        dispatch(request());

        getAllService()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userTypes.GET_ALL_REQUEST } }
    function success(users) { return { type: userTypes.GET_ALL_SUCCESS, users } }
    function failure(error) { return { type: userTypes.GET_ALL_FAILURE, error } }
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = id => {
    return dispatch => {
        dispatch(request(id));

        deleteService(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userTypes.DELETE_REQUEST, id } }
    function success(id) { return { type: userTypes.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userTypes.DELETE_FAILURE, id, error } }
};

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};