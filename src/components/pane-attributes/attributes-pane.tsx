import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./attributes-pane.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {DotSliderElement} from "../element-dot-slider/dot-slider-element";
import {setAttribute} from "../../actions/attribute-action-factory";
import {CharAttribute} from "../../datastore/character-store/attribute-store";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {SystemAttribute} from "../../datastore/system-static-store/system-attributes-store";

export type GroupOrderData = {
    group:string;
    sum:number;
    outOf:number
}

export interface OwnProps {

}

interface ConnectedState {
    maxAttributes: number;
    attributesBreakdown: {[groupName:string]:GroupOrderData};

}

interface ConnectedDispatch {

}




const mapStateToProps = (state: AggregateDataStore, ownProps: OwnProps): ConnectedState => {
    let attributesBreakdown:{[group:string]:GroupOrderData} = _.reduce(state.character.attributes,(agg,charAttr:CharAttribute)=>{
            let systemAttr:SystemAttribute = SystemDataStore.attributes[charAttr.id];

            if(agg[systemAttr.group]) {
                agg[systemAttr.group].sum=agg[systemAttr.group].sum+(charAttr.value-1);
            } else {
                agg[systemAttr.group]={
                    group:systemAttr.group,
                    sum:(charAttr.value-1),
                    outOf:-1};
            }
            return agg;
        },{});

    var sortedAttrBrkDwn = _.orderBy(attributesBreakdown,["sum"],["desc"]);
    attributesBreakdown[sortedAttrBrkDwn[0].group].outOf=8;
    attributesBreakdown[sortedAttrBrkDwn[1].group].outOf=6;
    attributesBreakdown[sortedAttrBrkDwn[2].group].outOf=4;

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
            attributesBreakdown.physical.sum+"("+attributesBreakdown.physical.outOf+") / "+
            attributesBreakdown.social.sum+"("+attributesBreakdown.social.outOf+") / "+
            attributesBreakdown.mental.sum+"("+attributesBreakdown.mental.outOf+")";

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