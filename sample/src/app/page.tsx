'use client'
import React, { useState, useEffect } from 'react';

// components
import { List } from '../components/sample/List';
import { Title } from '../components/sample/Title'
import { Count } from '../components/sample/Count'
import { Event } from '../components/sample/Event'
import { Array } from '../components/sample/Array'

// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { func } from '../module/index'
import { Button } from '@/stories/Button';

// Counter Slice Example
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

interface Person {
  name: string;
  age: number | string;
}

export default function Home() {

  const [ toggle, setToggle ] = useState(true);
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const [person, setPerson] = useState<Person>({ name: "Tom", age: 30 });
  
  const toggleComponent = () => {
    setToggle(prev => !prev);
  }
  const updatePerson = (newPerson: Person) => {
    setPerson(newPerson);
  };
  const resetPerson = () => {
    setPerson({ name: "", age: "" })
  }

  return (
    <div className="container mx-auto px-4">
       {/* オブジェクト型のステートを扱う場合 */}
       <button onClick={toggleComponent} className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>toggle</button>
       {
        toggle 
        ? <Count key="A" title="A" count={countA} setCount={setCountA} /> 
        : <Count key="B" title="B" count={countB} setCount={setCountB} />
       }
       {/* オブジェクト型のステートを扱う場合 */}
       <Event person={person} updatePerson={updatePerson} resetPerson={resetPerson} />
       {/* コンポーネントの分割 */}
      <div className='component' >
        <List person={person}>
          <Title />
        </List>
      </div>
       {/* 配列の使用方法 */}
      <div className='component' >
        <Array person={person} />
      </div>
    </div>
  );
}