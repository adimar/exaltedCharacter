import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as styles from "./input-spinner.css";


export interface  SpinnerProps {
    value: string|number;
    clickUpCall: (value:string|number)=>void;
    clickDownCall: (value:string|number)=>void;
    className?: string
}


class _InputSpinner extends React.Component<SpinnerProps,{}> {

    _onClickUp() {
        this.props.clickUpCall(this.props.value);

    }

    _onClickDown() {
        this.props.clickDownCall(this.props.value);
    }
    render() {
        const {value,className} = this.props;
        let spinnerStyleMix = styles.inputSpinner +" "+className||"";
        return <span className={spinnerStyleMix}>
            <label className={styles.inputSpinnerValue}>{value}</label>
            <label className={styles.spinner}>
                <label className={styles.spinArrow} onClick={this._onClickUp.bind(this)}>&#9650;</label>
                <label className={styles.spinArrowDivider}/>
                <label className={styles.spinArrow} onClick={this._onClickDown.bind(this)}>&#9660;</label>
            </label>
        </span>;
    }
}

export const InputSpinner: React.ComponentClass<SpinnerProps> =
    connect(null, null)(_InputSpinner);