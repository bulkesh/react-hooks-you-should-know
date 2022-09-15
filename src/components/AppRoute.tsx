import React, {ReactElement} from 'react';
import {Routes, Route} from 'react-router-dom';
import { Counter } from './counter/Counter';
import { KimrofUserEditor } from './kimrof-user-editor/KimrofUserEditor';
import { PersonEditor } from './person-editor/PersonEditor';
export function AppRoute():ReactElement {
    return (
        <Routes>
            <Route path='/' element={'Home Page'}/>
            <Route path='/person-editor' element={<PersonEditor />}/>
            <Route path='/counter' element={<Counter />}/>
            <Route path='/user-editor' element={<KimrofUserEditor />}/>
        </Routes>
    )

}