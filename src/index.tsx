import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as Redux from "redux";
import * as React from "react";
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import {AggregateReducer} from "./reducers/aggregate-reducer";
import {AggregateDataStore} from "./datastore/aggregate-datastore";

import {applyMiddleware} from "redux";
import {GurpsCharacterSheet} from "./gurps-character-sheet";

//
// process.env.NODE_ENV === 'development';
// const composeEnhancers = composeWithDevTools({ realtime: true, port: 3000 });
// let myStore: Redux.Store<AggregateDataStore> = Redux.createStore(AggregateReducer,composeEnhancers(applyMiddleware(thunk)));

let thunkExtraArgs={extraArgs:{}};
let myStore: Redux.Store<AggregateDataStore> = Redux.createStore(AggregateReducer,applyMiddleware(thunk.withExtraArgument(thunkExtraArgs))); //,

ReactDOM.render(
    <Provider store={myStore}>
        <GurpsCharacterSheet/>
    </Provider>
    , document.getElementById("gurpsCharacterGeneratorBodyDiv"));