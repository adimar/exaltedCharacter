import * as React from "react";
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

        let essenceDots =  this.generateDots(charmData.essenceMin);
        let skillDots = this.generateDots(charmData.skillMin);

        return <div className={styles.charmElement}>
            <div className={styles.charmNameBar}><label className={styles.charmName}>{charmData.name}</label></div>
            <label className={styles.skillName}>{sysSkill.name}</label><br/>
            <div className={styles.dotSpan}>
                <span className={styles.skillDotSpan}>{skillDots}</span>
                <span className={styles.essenceDotSpan}>{essenceDots}</span>
            </div>
        </div>;
    }

    private generateDots(dotCount:number):Array<any> {
        let dotsArray=[];
        for (let i = 0; i < dotCount ; i++) {
            let dot = <span key={"dot" + i} className={styles.dot}/>;
            dotsArray.push(dot);
        }

        return dotsArray;
    }
}


export const CharmElement: React.ComponentClass<OwnProps> =
    connect(null, null)(_charmElement);