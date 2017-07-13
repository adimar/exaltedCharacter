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
import {CharSkill} from "../../datastore/character-store/skill-store";

export interface SkillsPaneProps {
}

interface ConnectedState {
    characterSkills: {[skillId:string]: CharSkill};
}

interface ConnectedDispatch {
    addSkill: (newSkill: SysSkill) => void;
}

const mapStateToPropsSkillsPane = (state: AggregateDataStore, ownProps: SkillsPaneProps): ConnectedState => {

    return {
        characterSkills: state.character.skills
    };
}

const mapDispatchToPropsSkillsPane = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    addSkill: (newSkill: SysSkill) => {
        console.log("SkillsPaneProps.addSkill:" + newSkill.skillId);
        dispatch(addSkill(newSkill.skillId));
    },

})


class _SkillsPane extends React.Component<ConnectedState & ConnectedDispatch & SkillsPaneProps, {}> {
    private _reorderSkillId: string;
    private _skillList: {[skillId:string]: CharSkill};

    _calculateSkillDisplay = (skillItem:SysSkill):string => {
        var attribName = SystemDataStore.attributes[skillItem.attributeId].name;
        var skillDiff = skillItem.difficulty;
        return skillItem.name+" ("+attribName+"/"+skillDiff+")";
    }
    _onAddSkill = (selectedSearchItem:SysSkill) => {
        console.log("Adding "+selectedSearchItem.name+" skill.")
        this.props.addSkill(selectedSearchItem)

    };

    _reorderSkills = (ev: React.MouseEvent<HTMLSpanElement>, skillId: string, skillOrder:number )=>{
        console.log("_reorderSkills "+skillId+"#"+skillOrder);

        if(this._reorderSkillId) {
            console.log("_reorderSkills:switching "+skillId+"#"+skillOrder+" and "+this._reorderSkillId);
            this._skillList[skillId].order = this._skillList[this._reorderSkillId].order;
            this._skillList[this._reorderSkillId].order = skillOrder;
            this._reorderSkillId=null;
        } else {
            this._reorderSkillId = skillId;

        }

        this.forceUpdate();
    }

    render() {
        const {characterSkills} = this.props;
        this._skillList = characterSkills;
        let skillsList = _.chain(this._skillList).orderBy("order").map((cs:CharSkill) => {
            var skillItemStyle = styles.skillListItem;
            return <span className={skillItemStyle} key={(cs.skillId)} onClick={(ev)=>{this._reorderSkills(ev, cs.skillId, cs.order)}}>
                    <SkillElement  skillId={cs.skillId}/>
                </span>;
            }).value();

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