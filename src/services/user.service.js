import config from 'config';
import { authHeader } from '../helpers/auth-header';

export const loginService = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponseService)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
};

export const logoutService = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
};

export const getAllService = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponseService);
};

const getByIdService = id => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponseService);
};

export const registerService = user => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponseService);
};

export const updateService = user => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponseService);
};

// prefixed function name with underscore because delete is a reserved word in javascript
export const deleteService = id => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponseService);
};

export const handleResponseService = response => response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logoutService();
            location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
});