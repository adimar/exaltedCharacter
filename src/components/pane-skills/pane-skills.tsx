import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";

import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import * as _ from "lodash";
import {SkillElement} from "../skill-element/skill-element";
export interface SkillsPaneProps {
}

interface ConnectedState {
    skillIdsArray: string[]
}

interface ConnectedDispatch {
}

const mapStateToPropsSkillsPane = (state: AggregateDataStore, ownProps: SkillsPaneProps): ConnectedState => {
    return {
        skillIdsArray: _.keys(state.character.skills)
    };
}

const mapDispatchToPropsSkillsPane = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({})


class _SkillsPane extends React.Component<ConnectedState & ConnectedDispatch & SkillsPaneProps, {}> {


    render() {
        const {skillIdsArray} = this.props;
        let skillsList: any = _.map(skillIdsArray, skillId => {
                let keyId = "skillElement_" + skillId;
                return <li key={keyId}><SkillElement skillId={skillId}/></li>
            }
        );

        return <div>
            Skills:
            <ul>{skillsList} </ul>
        </div>
    }
}


export const SkillsPane: React.ComponentClass<SkillsPaneProps> =
    connect(mapStateToPropsSkillsPane, mapDispatchToPropsSkillsPane)(_SkillsPane)