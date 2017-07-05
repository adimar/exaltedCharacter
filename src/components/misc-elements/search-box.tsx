import * as React from "react";
import * as redux from "redux";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";

export interface SearchBoxProps {
    id: string;
    entries: object;
    keyField: string;
}

interface ConnectedState {
    pattern: string;
    possibleMatches: string[];
}

interface ConnectedDispatch {
    getMatches: (pattern:string, props: SearchBoxProps & ConnectedState) => void;
}

const mapStateToProps = (state: AggregateDataStore, ownProps: SearchBoxProps): ConnectedState => {
    return {
        pattern: state.misc.searchElement[ownProps.id] || "",
        possibleMatches:[]
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    getMatches: (pattern: string, props: SearchBoxProps & ConnectedState) => {
        console.log("SearchBox.getMatches value:" + pattern + ", attribute:" + props.attributeId);
        if (props.isDerived) {
            dispatch(setDerivedAttribute(props.attributeId, n));
        } else {
            dispatch(setPrimaryAttribute(props.attributeId, n));
        }
    }
});