import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as Redux from "redux";
import * as React from "react";


import {AttributeReducer} from "./reducers/attribute-reducers"
import {GurpsDataStore} from "./datastore/gurps-char-gen-datastore";
import {AttributesPane} from "./components/attribute-pane";


let myStore: Redux.Store<GurpsDataStore.All> = Redux.createStore(AttributeReducer)

ReactDOM.render(
    <Provider store={myStore}>
        <AttributesPane/>
    </Provider>
    , document.getElementById("gurpsCharacterGeneratorBodyDiv"));