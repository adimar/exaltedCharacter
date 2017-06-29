import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as Redux from "redux";
import * as React from "react";


import {AggregateReducer} from "./reducers/aggregate-reducer";
import {GurpsDataStore} from "./datastore/gurps-char-gen-datastore";
import {AttributesPane} from "./components/attribute-pane";


let myStore: Redux.Store<GurpsDataStore> = Redux.createStore(AggregateReducer)

ReactDOM.render(
    <Provider store={myStore}>
        <AttributesPane/>
    </Provider>
    , document.getElementById("gurpsCharacterGeneratorBodyDiv"));