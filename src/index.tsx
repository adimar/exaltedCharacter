import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as Redux from "redux";
import * as React from "react";

import {AttributePane} from "./components/attribute-pane";
import {AttributeReducer} from "./reducers/attribute-reducers"
import {GurpsDataStore} from "./datastore/gurps-char-gen-datastore";
import {AttributeElement} from "./components/attribute-element";

let myStore: Redux.Store<GurpsDataStore.All> = Redux.createStore(AttributeReducer)

ReactDOM.render(
    <Provider store={myStore}>
        <AttributePane />
    </Provider>
    , document.body);