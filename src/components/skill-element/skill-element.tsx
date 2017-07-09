import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";

import * as styles from "./skill-element.css";
import {setSkillCost} from "../../actions/skill-action-factory";
import {SystemDataAggregators} from "../../datastore/data-aggregators/system-data-aggregators";
import {InputSpinner} from "../common/input-spinner";


export interface SkillElementProps {
    skillId: string;
}


interface ConnectedState {
    name: string;
    attributeId: string,
    attributeName: string,
    difficulty: string,
    cost: number;
    relativeLevel: number;
    skillLevel: number;
}


interface ConnectedDispatch {
    setSkillCost: (skillCost: number, props: SkillElementProps & ConnectedState) => void;
}


const mapStateToProps = (state: AggregateDataStore, ownProps: SkillElementProps): ConnectedState => {
    let skillId = ownProps.skillId;

    let systemSkill = SystemDataStore.skills.list[skillId];
    let aggregatedSkill = SystemDataAggregators.skills(state,skillId);
    let characterSkill = state.character.skills[skillId];

    return {
        name: systemSkill.name,
        relativeLevel: aggregatedSkill.relativeLevel,
        cost: characterSkill.skillCost,
        attributeId: systemSkill.attributeId,
        attributeName: SystemDataStore.attributes[systemSkill.attributeId].name,
        difficulty: systemSkill.difficulty,
        skillLevel: aggregatedSkill.skillLevel
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    setSkillCost: (skillCost: number, props: SkillElementProps & ConnectedState) => {
        console.log("SkillElement.setSkillCost value:" + skillCost + ", attribute:" + props.skillId);
        dispatch(setSkillCost(props.skillId, skillCost));
    }
});


class _SkillElement extends React.Component<ConnectedState & ConnectedDispatch & SkillElementProps, {}> {
    constructor(props: SkillElementProps & ConnectedState & ConnectedDispatch) {
        super(props);

    }

    _onSkillUp = (originalValue:number):void =>{
       var currentCostIndex =
           _.findIndex(SystemDataStore.skills.difficultyCostProgression,(v)=>originalValue===v);
       if(currentCostIndex+1<_.size(SystemDataStore.skills.difficultyCostProgression)) {
           this.props.setSkillCost(
               SystemDataStore.skills.difficultyCostProgression[currentCostIndex+1], this.props)
       }
    }

    _onSkillDown = (originalValue:number):void =>{
        var currentCostIndex =
            _.findIndex(SystemDataStore.skills.difficultyCostProgression,(v)=>originalValue===v);
        if(currentCostIndex>0) {
            this.props.setSkillCost(
                SystemDataStore.skills.difficultyCostProgression[currentCostIndex-1], this.props)
        }
    }

    // _onSkillChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     let value = Number(event.target.value);
    //     let props = this.props;
    //     props.setSkillCost(value, props)
    // };

    render() {
        const {name, skillLevel, relativeLevel, cost,attributeName, difficulty} = this.props;

        return (
            <div className={styles.skillElement}>
                <label className={styles.skillName}>
                    {name}
                </label>
                <label className={styles.skillAttribute}>
                    {attributeName}/{difficulty}

                </label>
                <label className={styles.relativeLevelBox}>{relativeLevel}</label>
                <label className={styles.skillLevel}>
                    {skillLevel}
                </label>
                <label className={styles.skillsCost +  " " + styles.squareBrackets}>
                    {/*<input onChange={this._onSkillChange.bind(this)}*/}
                        {/*type="number"*/}
                        {/*value={cost} min="1" max="6"*/}
                        {/*onKeyPress={(evt)=>evt.preventDefault()}*/}
                        {/*className={styles.relativeLevelBox}*/}
                    {/*/>*/}
                    <InputSpinner value={cost}
                                  className={styles.relativeLevelBox}
                                  clickUpCall={this._onSkillUp.bind(this)}
                                  clickDownCall={this._onSkillDown.bind(this)}/>
                </label>
            </div>);

    }
}


export const SkillElement: React.ComponentClass<SkillElementProps> =
    connect(mapStateToProps, mapDispatchToProps)(_SkillElement);