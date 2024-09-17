"use client"
import React, { useState, useEffect, useReducer } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer:{}
})

export default function Reducer() {

  return (
    <>
    <Provider store={store}>
      <p className="text-4xl">Redux Page</p>
    </Provider>
    </>
  );
}
// インストール情報
// npm install @reduxjs/toolkit
// npm install react-redux