import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./attributes-pane.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {DotSliderElement} from "../element-dot-slider/dot-slider-element";
import {setAttribute} from "../../actions/attribute-action-factory";
import {CharAttribute, GroupOrderData} from "../../datastore/character-store/attribute-store";


export interface OwnProps {

}

interface ConnectedState {
    maxAttributes: number;
    attributesBreakdown: {[groupName:string]:GroupOrderData};

}

interface ConnectedDispatch {

}



const mapStateToProps = (state: AggregateDataStore, ownProps: OwnProps): ConnectedState => {

    let attributesBreakdown = state.character.attributesMisc.attributesBreakdown;
    let maxAttributes = state.character.misc.essence>5?state.character.misc.essence:5;

    return {
        attributesBreakdown: attributesBreakdown,
        maxAttributes: maxAttributes
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({});


class _attributesPane extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {
    render() {
        const {maxAttributes,attributesBreakdown} = this.props;
		let attrBreakdownString:string =
            attributesBreakdown.physical.sum+"("+attributesBreakdown.physical.rank+") / "+
            attributesBreakdown.social.sum+"("+attributesBreakdown.social.rank+") / "+
            attributesBreakdown.mental.sum+"("+attributesBreakdown.mental.rank+")";

        return <span >
					<fieldset className={styles.attributesFieldSet}>
						<legend>Attributes {attrBreakdownString}</legend>

<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="strength" dataPath="attributes" titleProperty="name"/>
<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="charisma" dataPath="attributes" titleProperty="name"/>
<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="perception" dataPath="attributes" titleProperty="name"/>
<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="dexterity" dataPath="attributes" titleProperty="name"/>
<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="manipulation" dataPath="attributes" titleProperty="name"/>
<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="intelligence" dataPath="attributes" titleProperty="name"/>
<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="stamina" dataPath="attributes" titleProperty="name"/>
<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="appearance" dataPath="attributes" titleProperty="name"/>
<DotSliderElement visibleDots={maxAttributes} setItemAction={setAttribute} itemId="wits" dataPath="attributes" titleProperty="name"/>
					</fieldset>
				</span>
    }
}


export const AttributesPane: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_attributesPane);