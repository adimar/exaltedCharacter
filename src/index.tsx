import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as Redux from "redux";
import * as React from "react";

import { CounterReducer} from "./reducers/counter-reducers"



import {DataStore} from "./datastore/character-store";
import {AttributePane} from "./components/attribute-pane";


let myStore: Redux.Store<DataStore.All> = Redux.createStore(CounterReducer)

ReactDOM.render(
    <Provider store={myStore}>
        <AttributePane />
    </Provider>
    , document.body);