
import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native';

export function addFavorite(action, id) {
    AsyncStorage.getItem('fav').then((data) => {
        //console.log(data)
        const key = action + '_' + id
        let items = {}
        if (data != null) {
            items = JSON.parse(data)
        }
        items[key] = [action, id]
        AsyncStorage.setItem('fav', JSON.stringify(items))
    })
    //AsyncStorage.removeItem('fav')
}

export function removeFavorite(action, id) {
    AsyncStorage.getItem('fav').then((data) => {
    const key = action + '_' + id
        let items = {}
        if (data != null) {
            items = JSON.parse(data)
        }
        delete items[key]
        AsyncStorage.setItem('fav', JSON.stringify(items))
    })
}

export function clearFavorite() {
    AsyncStorage.setItem('fav', JSON.stringify({}))
}

