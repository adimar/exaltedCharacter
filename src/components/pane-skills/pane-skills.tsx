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
import {addSkill} from "../../actions/skill-action-factory";
import {InputSpinner} from "../common/input-spinner";

export interface SkillsPaneProps {
}

interface ConnectedState {
    skillIdsArray: string[]
}

interface ConnectedDispatch {
    addSkill: (newSkill: SysSkill) => void;
}

const mapStateToPropsSkillsPane = (state: AggregateDataStore, ownProps: SkillsPaneProps): ConnectedState => {
    return {
        skillIdsArray: _.keys(state.character.skills)
    };
}

const mapDispatchToPropsSkillsPane = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    addSkill: (newSkill: SysSkill) => {
        console.log("SkillsPaneProps.addSkill:" + newSkill.skillId);
        dispatch(addSkill(newSkill.skillId));
    },

})


class _SkillsPane extends React.Component<ConnectedState & ConnectedDispatch & SkillsPaneProps, {}> {

    _calculateSkillDisplay = (skillItem:SysSkill):string => {
        var attribName = SystemDataStore.attributes[skillItem.attributeId].name;
        var skillDiff = skillItem.difficulty;
        return skillItem.name+" ("+attribName+"/"+skillDiff+")";
    }
    _onAddSkill = (selectedSearchItem:SysSkill) => {
        console.log("Adding "+selectedSearchItem.name+" skill.")
        this.props.addSkill(selectedSearchItem)

    };
    render() {
        const {skillIdsArray} = this.props;
        let skillsList: any = _.map(skillIdsArray, skillId =>
            <SkillElement key={(skillId+"_"+ Math.random()+"_")} skillId={skillId} />
        );

        return <div className={styles.skillsPane}>
            Skills: <SearchBox searchBoxId="skillSearch1" dataPath="skills.list" valueField="name" idField="skillId"
                               itemDisplayCalculator={this._calculateSkillDisplay.bind(this)}
                               itemSelectionDispatch={this._onAddSkill.bind(this)}/>
           {skillsList}

        </div>
    }
}


export const SkillsPane: React.ComponentClass<SkillsPaneProps> =
    connect(mapStateToPropsSkillsPane, mapDispatchToPropsSkillsPane)(_SkillsPane)