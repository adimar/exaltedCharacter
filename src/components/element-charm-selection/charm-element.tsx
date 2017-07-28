import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./charm-element.css";

import {SystemCharm} from "../../datastore/system-static-store/system-charms-store";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";


export interface OwnProps {
    charmData:SystemCharm
}



class _charmElement extends React.Component<OwnProps, {}> {

    render() {
        const {charmData} = this.props;
        var sysSkill = SystemDataStore.skills[charmData.skill];
        let essenceDots = [];
        for(let i=0;i<charmData.essenceMin;i++) {
            let dot = <span key={"dot"+i} className={styles.dot}/>
            essenceDots.push(dot);
        }

        let skillDots=[];
        for(let i=0;i<charmData.skillMin;i++) {
            let dot = <span key={"dot"+i} className={styles.dot}/>
            skillDots.push(dot);
        }

        return <div className={styles.charmElement}>
            <div className={styles.charmNameBar}><label className={styles.charmName}>{charmData.name}</label></div>
            <label className={styles.skillName}>{sysSkill.name}</label>
            <span className={styles.skillDotSpan}>{skillDots}</span>
            <span className={styles.essenceDotSpan}>{essenceDots}</span>

        </div>;
    }
}


export const CharmElement: React.ComponentClass<OwnProps> =
    connect(null, null)(_charmElement);