import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./skills-pane.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {DotSliderElement} from "../element-dot-slider/dot-slider-element";
import {setSkill} from "../../actions/skill-action-factory";
import {CharAttribute, GroupOrderData} from "../../datastore/character-store/attribute-store";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {CharacterDataStore} from "../../datastore/character-store/character-store";
import {SkillsStore} from "../../datastore/character-store/skill-store";


export interface OwnProps {

}

interface ConnectedState {
    maxSkills: number;
    characterSkills: SkillsStore;
}

interface ConnectedDispatch {

}



const mapStateToProps = (state: AggregateDataStore, ownProps: OwnProps): ConnectedState => {
    let maxSkills = state.character.misc.essence>5?state.character.misc.essence:5;
    return {
        maxSkills: maxSkills,
        characterSkills: state.character.skills
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({});


class _skillsPane extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {
    render() {
        const {maxSkills,characterSkills} = this.props;

        let skillsData = _.map(characterSkills,(skill)=>{
            return <DotSliderElement key={skill.id}
                                     visibleDots={maxSkills}
                                     setItemAction={setSkill}
                                     itemId={skill.id}
                                     dataPath="skills"
                                     titleProperty="name"/>
        });

        return <span >
					<fieldset className={styles.skillsFieldSet}>
						<legend>Skills</legend>
                        {skillsData}
					</fieldset>
				</span>
    }
}


export const SkillsPane: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_skillsPane);