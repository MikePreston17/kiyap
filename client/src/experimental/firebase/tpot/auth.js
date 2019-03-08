import { auth } from './firebase';
import { observable, action, computed, decorate, autorun, toJS } from 'mobx'
const electron = window.require("electron");
const remote = electron.remote;
const app = remote.app;
const fs = remote.require("fs");
const path = remote.require("path");

// Create User
export const createUser = (email, password) => {
    return new Promise(action((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(action((userCredential) => {
                resolve(userCredential)
            }))
            .catch(error => {
                reject(error)
            })
    }))
}

// Request Password Reset
export const requestPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Delete User
export const deleteUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signIn = action((email, password) => {
    return new Promise(action((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(action((authUser) => {
                const fileName = path.join(app.getPath('userData'), 'Local Storage', 'auth.json')
                fs.writeFile(fileName, JSON.stringify({
                    authUser: authUser.user,
                }), (err) => {
                    if (err) reject({message: err.toString()})
                })
                resolve(authUser.user)
            }))
            .catch(error => {
                reject(error)
            })
    }))
})

// Sign out
export const signOut = () => {
    auth.signOut()
    fs.unlink(path.join(app.getPath('userData'), 'Local Storage', 'auth.json'), () => {
        // console.log('Signed Out User')
    })
}

// Password Reset
export const resetPassword = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const updatePassword = (password) =>
    auth.currentUser.updatePassword(password);