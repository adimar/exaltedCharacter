import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";

import * as styles from "./skill-element.css";
import {setRelativeSkillLevel} from "../../actions/skill-action-factory";


export interface SkillElementProps {
    skillId: string;
}


interface ConnectedState {
    name: string;
    startingLevel: number;
    relativeLevel: number;
    cost: number;
    attributeId: string,
    difficulty: string
}


interface ConnectedDispatch {
    setRelativeLevel: (relativeLevel: number, props: SkillElementProps & ConnectedState) => void;
}


const mapStateToProps = (state: AggregateDataStore, ownProps: SkillElementProps): ConnectedState => {
    let skillId = ownProps.skillId;
    let systemSkill = SystemDataStore.skills.list[skillId];
    let characterSkill = state.character.skills[skillId] || {relativeLevel: 0};

    return {
        name: systemSkill.name,
        startingLevel: SystemDataStore.skills.getStartingRelativeLevel(systemSkill.difficulty),
        relativeLevel: characterSkill.relativeLevel,
        cost: SystemDataStore.skills.getCost(systemSkill.difficulty, characterSkill.relativeLevel),
        attributeId: systemSkill.attributeId,
        difficulty: systemSkill.difficulty
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    setRelativeLevel: (relativeLevel: number, props: SkillElementProps & ConnectedState) => {
        console.log("SkillElement.setRelativeLevel value:" + relativeLevel + ", attribute:" + props.skillId);
        dispatch(setRelativeSkillLevel(props.skillId, relativeLevel));
    }
});


class _SkillElement extends React.Component<ConnectedState & ConnectedDispatch & SkillElementProps, {}> {
    constructor(props: SkillElementProps & ConnectedState & ConnectedDispatch) {
        super(props);

    }

    _onSkillChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = Number(event.target.value);
        let props = this.props;
        props.setRelativeLevel(value, props)
    };

    render() {
        const {name, startingLevel, relativeLevel, cost, attributeId, difficulty} = this.props;

        return (
            <div>
                {name}
                {attributeId}
                {difficulty}

                <input onChange={this._onSkillChange.bind(this)}
                       type="number"
                       value={relativeLevel}
                       min={startingLevel}
                       max="7"/>


                <label className={styles.skillsCostBox +  " " + styles.squareBrackets}>
                    {cost}
                </label>;

            </div>);

    }
}


export const SkillElement: React.ComponentClass<SkillElementProps> =
    connect(mapStateToProps, mapDispatchToProps)(_SkillElement);