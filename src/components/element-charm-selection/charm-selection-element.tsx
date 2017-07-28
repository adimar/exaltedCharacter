import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./charm-selection-element.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {SystemCharm} from "../../datastore/system-static-store/system-charms-store";
import Tree from 'react-d3-tree';
import 'react-tree-graph/dist/style.css'
import {CharmElement} from "./charm-element";

export interface OwnProps {

    skillId:string
}

interface ConnectedState {
    charmList:object[]
}

interface ConnectedDispatch {

}


const mapStateToProps = (state:AggregateDataStore, ownProps: OwnProps): ConnectedState => {
    let charmList = _.chain(SystemDataStore.charms).filter((charm:SystemCharm)=>{
        return charm.skill===ownProps.skillId;
    }).values().value();


    return {
        charmList: charmList
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({

});


class _charmSelectionElement extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {

    _getPrerequisiteCharms = (charm:SystemCharm)=>{
        return _.map(charm.prerequisites,(preqCharmId:string)=>{
            return SystemDataStore.charms[preqCharmId];
        })

    }

    render() {
        const {charmList,skillId} = this.props;

        let charmArray = _.map(charmList,(charm:SystemCharm)=>{
            return <CharmElement key={charm.id} charmData={charm}/>;
        })
        return <span className={styles.charmSelectionElement}>
            {charmArray}
        </span>;
    }
}


export const CharmSelection: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_charmSelectionElement);