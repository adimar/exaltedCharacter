import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as Redux from "redux";
import * as React from "react";


import {AggregateReducer} from "./reducers/aggregate-reducer";
import {AggregateDataStore} from "./datastore/aggregate-datastore";
import {AttributesPane} from "./components/attribute-pane";


let myStore: Redux.Store<AggregateDataStore> = Redux.createStore(AggregateReducer);

ReactDOM.render(
    <Provider store={myStore}>
        <AttributesPane/>
    </Provider>
    , document.getElementById("gurpsCharacterGeneratorBodyDiv"));