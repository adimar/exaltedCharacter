import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./bonus-points-pane.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";


export interface OwnProps {

}

interface ConnectedState {
    attributesBonusCost: number

}

interface ConnectedDispatch {

}




const mapStateToProps = (state: AggregateDataStore, ownProps: OwnProps): ConnectedState => {

    return {
        attributesBonusCost: state.character.bonusPoints.attributes
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({});


class _bonusPointsPane extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {
    render() {
        const {attributesBonusCost} = this.props;


        return <span >
					<fieldset className={styles.bonusPointsFieldSet}>
						<legend>Bonus Points</legend>
                        <label className={styles.bonusPointsLabel}>Attributes:</label>
                        <label className={styles.bonusPointsValue}>{attributesBonusCost}</label><br/>
					</fieldset>
				</span>
    }
}


export const BonusPointsPane: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_bonusPointsPane);