import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./attributes-pane.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {DotSliderElement} from "../element-dot-slider/dot-slider-element";
import {setAttribute} from "../../actions/attribute-action-factory";


export interface OwnProps {

}

interface ConnectedState {
    maxAttributes: number;

}

interface ConnectedDispatch {
    setAttribute: (attributeId: string, value: number) => void;
}


const mapStateToProps = (state: AggregateDataStore, ownProps: OwnProps): ConnectedState => {
    return {
        maxAttributes: 5
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    setAttribute: (attributeId: string, value: number) => {
        dispatch(setAttribute(attributeId, value));
    }
});


class _attributesPane extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {


    _setAttributeValue = (attributeId: string, value: number) => {
        console.log("_setAttributeValue:" + attributeId + " to " + value);
        this.props.setAttribute(attributeId, value);
    }

    render() {
        const {maxAttributes} = this.props;

        return <span >
					<fieldset className={styles.attributesFieldSet}>
						<legend>Attributes</legend>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="strength" dataPath="attributes" titleProperty="name"/>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="charisma" dataPath="attributes" titleProperty="name"/>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="perception" dataPath="attributes" titleProperty="name"/>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="dexterity" dataPath="attributes" titleProperty="name"/>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="manipulation" dataPath="attributes" titleProperty="name"/>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="intelligence" dataPath="attributes" titleProperty="name"/>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="stamina" dataPath="attributes" titleProperty="name"/>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="appearance" dataPath="attributes" titleProperty="name"/>
						<DotSliderElement visibleDots={maxAttributes}
                                          selectDotFunction={this._setAttributeValue.bind(this)}
                                          itemId="wits" dataPath="attributes" titleProperty="name"/>
					</fieldset>
				</span>
    }
}


export const AttributesPane: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_attributesPane);