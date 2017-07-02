import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as Redux from "redux";
import * as React from "react";
import thunk from 'redux-thunk';

import {AggregateReducer} from "./reducers/aggregate-reducer";
import {AggregateDataStore} from "./datastore/aggregate-datastore";

import {applyMiddleware} from "redux";
import {GurpsCharacterSheet} from "./gurps-character-sheet";


let myStore: Redux.Store<AggregateDataStore> = Redux.createStore(AggregateReducer,applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={myStore}>
        <GurpsCharacterSheet/>
    </Provider>
    , document.getElementById("gurpsCharacterGeneratorBodyDiv"));