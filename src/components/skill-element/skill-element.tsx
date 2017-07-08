import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";

import * as styles from "./skill-element.css";
import {setSkillCost} from "../../actions/skill-action-factory";
import {SystemDataAggregators} from "../../datastore/data-aggregators/system-data-aggregators";


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

    _onSkillChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = Number(event.target.value);
        let props = this.props;
        props.setSkillCost(value, props)
    };

    render() {
        const {name, skillLevel, relativeLevel, cost,attributeName, difficulty} = this.props;

        return (
            <div className={styles.skillElement}>
                <label className={styles.skillName}>
                    {name}
                </label>
                <label className={styles.skillAttribute}>
                    {attributeName}/{difficulty}
                    {/*<input onChange={this._onSkillChange.bind(this)}*/}
                           {/*type="number"*/}
                           {/*value={relativeLevel}*/}
                           {/*min={startingLevel}*/}
                           {/*max="6"*/}
                           {/*className={styles.relativeLevelBox}*/}

                    {/*/>*/}
                </label>
                <label className={styles.relativeLevelBox}>{relativeLevel}</label>
                <label className={styles.skillLevel}>
                    {skillLevel}
                </label>
                <label className={styles.skillsCost +  " " + styles.squareBrackets}>

                    {cost}
                </label>
            </div>);

    }
}


export const SkillElement: React.ComponentClass<SkillElementProps> =
    connect(mapStateToProps, mapDispatchToProps)(_SkillElement);