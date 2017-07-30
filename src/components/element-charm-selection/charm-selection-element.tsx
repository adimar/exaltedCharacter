import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./charm-selection-element.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {SystemCharm, SystemCharmStore} from "../../datastore/system-static-store/system-charms-store";

import {CharmElement} from "./charm-element";
//var Graph2 = require("react-graph-vis2");
import * as Graph from "react-graph-vis2";
let Graph2 = Graph.default;

export interface OwnProps {

    skillId:string
}

interface ConnectedState {
    charmList:SystemCharmStore
}

interface ConnectedDispatch {

}


const mapStateToProps = (state:AggregateDataStore, ownProps: OwnProps): ConnectedState => {
    let charmList = _.reduce(SystemDataStore.charms,(obj,charm:SystemCharm)=>{

         if(charm.skill===ownProps.skillId){
             obj[charm.id]=charm;
         }
        return obj;
    },{});


    return {
        charmList: charmList
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({

});


export class _charmSelectionElement extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {

    _getPrerequisiteCharms = (charm:SystemCharm)=>{
        return _.map(charm.prerequisites,(preqCharmId:string)=>{
            return SystemDataStore.charms[preqCharmId];
        })

    }

    render() {
        const {charmList,skillId} = this.props;
        // let data = this.compileGraphData(charmList);
        //
        // var options = {
        //     layout: {
        //         hierarchical: true
        //     },
        //     edges: {
        //         color: "#000000"
        //     }
        // };

       let charmByLevels = this._mapCharmsToGrid(charmList);


        return <div className={styles.charmSelectionElement} onClick={this.clickHandler.bind(this)}>
            {charmByLevels}
          {/*<Graph2 graph={data} options={options}/>*/}
        </div>;
    }

    private _mapCharmsToGrid = (charmList:{[charmId:string]:SystemCharm})=>{
        let systemCharmKeys = _.keys(SystemDataStore.charms);
        let renderedCharmIds:string[]=[];
        let unrenderedCharmIds:string[] = _.keys(charmList);
        let level:number = 0;
        let charmLevelObj:{[level:number]:string[]}={};
        let prevUnrenderedCount:number=0;
        while(_.size(unrenderedCharmIds)>0) {
            let levelArray=_.reduce(unrenderedCharmIds,(arr,charmId:string)=>{

                let charm = SystemDataStore.charms[charmId];
                var prequisitsAlreadyRendered:boolean;
                if(charm.prerequisites[0]==="none"){
                    prequisitsAlreadyRendered = true;
                } else {
                    prequisitsAlreadyRendered = _.every(charm.prerequisites,(preqCharmId:string)=>{
                        let preqIndex =  _.findIndex(renderedCharmIds,renderedCharm=>renderedCharm===preqCharmId);
                        return preqIndex>-1;
                    });
                }

                if(prequisitsAlreadyRendered) {
                    arr.push(charmId);
                }
                return arr;
            },[]);

            charmLevelObj[level]=levelArray;
            renderedCharmIds= _.concat(renderedCharmIds,levelArray);
            unrenderedCharmIds=_.difference(unrenderedCharmIds,levelArray);

            if(prevUnrenderedCount===_.size(unrenderedCharmIds)) {
                console.log("ERROR,ERROR,ERROR: no progress on charm hierarchy "+unrenderedCharmIds);

                _.forEach(unrenderedCharmIds,(charmId:string)=>{
                    //console.log("checking charm "+charmId+"\n");
                    _.forEach(SystemDataStore.charms[charmId].prerequisites,(preqCharmId:string)=>{
                        let preqIndex =  _.findIndex(systemCharmKeys,sysCharmId=>sysCharmId===preqCharmId);
                        if(preqIndex===-1) {
                            console.log("charm |"+charmId+"| can't be rendered, unavailable |"+preqCharmId+"|\n");
                        }
                    })
                })
                return;
            }
            prevUnrenderedCount=_.size(unrenderedCharmIds);
            level++;
        }
        return charmLevelObj;

    }

    //
    // private clickHandler() {
    //
    // }
    // private compileGraphData(charmList: any) {
    //     let data = {
    //         nodes: [],
    //         edges: []
    //     };
    //     _.forEach(charmList, (charm: SystemCharm) => {
    //         data.nodes.push({id: charm.id, label: charm.name, color: '#e04141'});
    //         if (charm.prerequisites[0] !== 'none') {
    //
    //             _.forEach(charm.prerequisites, (preqCharmId: string) => {
    //                 data.edges.push({from: preqCharmId, to: charm.id});
    //             })
    //         }
    //     });
    //     return data;
    // }


}


export const CharmSelection: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_charmSelectionElement);