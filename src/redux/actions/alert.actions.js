import { alertTypes } from '../types/alert.types';

export const alertSuccessAction = message => ({type: alertTypes.SUCCESS, message});

export const alertErrorAction = message => ({type: alertTypes.ERROR, message});

export const alertClearAction = () => ({type: alertTypes.CLEAR});