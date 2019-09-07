import {firebaseConfig} from '../../config.json';
import {driver} from './firebaseDatabaseDriver';

// Clear existing firebase apps
// noinspection TypeScriptUMDGlobal
firebase.apps.length && firebase.apps.forEach(app => app.delete());

// noinspection TypeScriptUMDGlobal, ES6ModulesDependencies
/**
 * @type {firebase.app.App}
 */
export const app = firebase.initializeApp(firebaseConfig, new Date().toISOString());

export const ref = app.database().ref();

export const firebaseDatabaseDriver = driver(ref);

// noinspection ES6ModulesDependencies, TypeScriptUMDGlobal
/**
 * @type {Object}
 */
export const SET_SERVER_TIME = firebase.database.ServerValue.TIMESTAMP;
