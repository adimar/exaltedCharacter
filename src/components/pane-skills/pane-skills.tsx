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
import {addSkill, reorderSkills} from "../../actions/skill-action-factory";
import {CharSkill} from "../../datastore/character-store/skill-store";
import {DraggableList} from "../common/draggable-list";

export interface SkillsPaneProps {
}

interface ConnectedState {

}

interface ConnectedDispatch {
    addSkill: (newSkill: SysSkill) => void;
    reorderSkills: (newSkillOrderList:{[skillId:string]:number}) => void;
}

const mapStateToPropsSkillsPane = (state: AggregateDataStore, ownProps: SkillsPaneProps): ConnectedState => {

    return {

    };
}

const mapDispatchToPropsSkillsPane = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    addSkill: (newSkill: SysSkill) => {
        console.log("SkillsPaneProps.addSkill:" + newSkill.skillId);
        dispatch(addSkill(newSkill.skillId));
    },
    reorderSkills: (newSkillOrderList:{[skillId:string]:number}) => {
        console.log("SkillsPaneProps.reorderSkills:" + JSON.stringify(newSkillOrderList));
        dispatch(reorderSkills(newSkillOrderList));
    }

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
    _onSkillsReordered = (newSkillOrderList:{[skillId:string]:number}) => {
        console.log("_onSkillsReordered, reordering character skills.")
        this.props.reorderSkills(newSkillOrderList);
    }


    private _skillListItemCalculator(cs: CharSkill) {
        return <SkillElement skillId={cs.skillId}/>
    }

    render() {
        const {} = this.props;
        return <fieldset className={styles.skillsPane}>
            <legend>Skills</legend>
             <SearchBox searchBoxId="skillSearch1" dataPath="skills.list" valueField="name" idField="skillId" excludePath="character.skills"
                        itemDisplayCalculator={this._calculateSkillDisplay.bind(this)}
                        itemSelectionDispatch={this._onAddSkill.bind(this)}/>

            <DraggableList dataPath="character.skills"
                           itemDisplayCalculator={this._skillListItemCalculator.bind(this)}
                           itemReorderDispatch={this._onSkillsReordered.bind(this)}
                           orderField="order" idField="skillId"/>


        </fieldset>
    }


}


export const SkillsPane: React.ComponentClass<SkillsPaneProps> =
    connect(mapStateToPropsSkillsPane, mapDispatchToPropsSkillsPane)(_SkillsPane)