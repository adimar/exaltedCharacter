import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";

import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import * as _ from "lodash";
import {SkillElement} from "../skill-element/skill-element";
import * as styles from "./pane-skills.css";
import {SearchBox} from "../common/search-box";
import {SysSkill} from "../../datastore/system-static-store/system-skills-store";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";

export interface SkillsPaneProps {
}

interface ConnectedState {
    skillIdsArray: string[]
}

interface ConnectedDispatch {}

const mapStateToPropsSkillsPane = (state: AggregateDataStore, ownProps: SkillsPaneProps): ConnectedState => {
    return {
        skillIdsArray: _.keys(state.character.skills)
    };
}

const mapDispatchToPropsSkillsPane = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({})


class _SkillsPane extends React.Component<ConnectedState & ConnectedDispatch & SkillsPaneProps, {}> {

    _calculateSkillDisplay = (skillItem:SysSkill):string => {
        var attribName = SystemDataStore.attributes[skillItem.attributeId].name;
        var skillDiff = skillItem.difficulty;
        return skillItem.name+" ("+attribName+"/"+skillDiff+")";
    }
    _onAddSkill = (event: React.ChangeEvent<HTMLButtonElement>) => {
        let value = Number(event.target.value);
        let props = this.props;

    };
    render() {
        const {skillIdsArray} = this.props;
        let skillsList: any = _.map(skillIdsArray, skillId =>
            <SkillElement key={(skillId+"_"+ Math.random()+"_")} skillId={skillId} />
        );

        return <div className={styles.skillsPane}>
            Skills: <SearchBox searchBoxId="skillSearch1" dataPath="skills.list" valueField="name" idField="skillId"
                               itemDisplayCalculator={this._calculateSkillDisplay}/>
           {skillsList}
        </div>
    }
}


export const SkillsPane: React.ComponentClass<SkillsPaneProps> =
    connect(mapStateToPropsSkillsPane, mapDispatchToPropsSkillsPane)(_SkillsPane)