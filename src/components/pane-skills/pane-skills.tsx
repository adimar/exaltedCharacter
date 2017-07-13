import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";

import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import * as _ from "lodash";
import {SkillElement} from "../element-skill/skill-element";
import * as styles from "./pane-skills.css";
import {SearchBox} from "../common/search-box";
import {SysSkill} from "../../datastore/system-static-store/system-skills-store";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {addSkill} from "../../actions/skill-action-factory";
import {InputSpinner} from "../common/input-spinner";
import {CharSkill} from "../../datastore/character-store/skill-store";

export interface SkillsPaneProps {
}

interface ConnectedState {
    characterSkills: CharSkill[]
}

interface ConnectedDispatch {
    addSkill: (newSkill: SysSkill) => void;
}

const mapStateToPropsSkillsPane = (state: AggregateDataStore, ownProps: SkillsPaneProps): ConnectedState => {
    return {
        characterSkills: _.values(state.character.skills)
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
        const {characterSkills} = this.props;
        let skillsList: any = _.chain(characterSkills).orderBy("order").map((cs:CharSkill) =>
            <SkillElement key={(cs.skillId+"_"+ Math.random()+"_")} skillId={cs.skillId} />
        ).value();

        return <fieldset className={styles.skillsPane}>
            <legend>Skills</legend>
             <SearchBox searchBoxId="skillSearch1" dataPath="skills.list" valueField="name" idField="skillId" excludePath="character.skills"
                        itemDisplayCalculator={this._calculateSkillDisplay.bind(this)}
                        itemSelectionDispatch={this._onAddSkill.bind(this)}/>
            <div className={styles.skillsList}>{skillsList}</div>

        </fieldset>
    }
}


export const SkillsPane: React.ComponentClass<SkillsPaneProps> =
    connect(mapStateToPropsSkillsPane, mapDispatchToPropsSkillsPane)(_SkillsPane)