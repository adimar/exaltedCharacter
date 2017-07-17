import * as React from "react";
import * as redux from "redux";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import * as styles from "./draggable-list.css";
import {connect} from "react-redux";


import * as _ from "lodash";


export interface DraggableListProps {
    dataPath: string,
    itemDisplayCalculator: (draggableItem:any)=>string,
    itemReorderDispatch: (newSkillOrderList:{[skillId:string]:number})=>void,
    orderField:string;
    idField:string;
}


interface ConnectedState {
    itemList: {}
}

interface ConnectedDispatch {

}

const mapStateToProps = (state: AggregateDataStore, ownProps: DraggableListProps): ConnectedState => {

    var itemListClone =  _.cloneDeep(_.get(state,ownProps.dataPath));
    return {
        itemList: itemListClone
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>) => ({

});



class _draggableList extends React.Component<ConnectedState & ConnectedDispatch & DraggableListProps, {}> {
    private _dragItemId: any;
    private _itemList: {[itemId:string]: any};


    _drag = (ev: React.MouseEvent<HTMLSpanElement>, itemId:string)=>{
        console.log("_draggableList._drag "+itemId);
        this._dragItemId=itemId;
    }

    _dragOver = (ev: React.MouseEvent<HTMLSpanElement>, itemId:string)=>{
        console.log("_draggableList._dragOver "+itemId);
        if(this._dragItemId!==itemId) {
            var itemOrder = this._itemList[itemId].order;
            console.log("_reorderItems:switching "+itemId+"#"+this._itemList[itemId].order+" and "+
                               this._dragItemId+"#"+this._itemList[this._dragItemId].order);
            this._itemList[itemId].order = this._itemList[this._dragItemId].order;
            this._itemList[this._dragItemId].order = itemOrder;
            this.forceUpdate();

        }
        ev.preventDefault();
    }

    _drop = (ev: React.MouseEvent<HTMLSpanElement>, itemId:string)=>{
        console.log("_draggableList._drop "+itemId);
        let orderSkillList= _.reduce(this._itemList,(list,item,key)=>{
            list[item[this.props.idField]]=item[this.props.orderField];
            return list;
        },{})
        this.props.itemReorderDispatch(orderSkillList);
    }

    render() {
        const {itemList,orderField,idField} = this.props;
        this._itemList = itemList;


        let draggableItemList = _.chain(itemList).orderBy(orderField).map((item:any) => {
            var calculatedItem = this.props.itemDisplayCalculator(item);
            var draggableItemStyle = styles.draggableItem;
            return <span className={draggableItemStyle} key={(item[idField])}
                         onDrag={(ev) => {this._drag(ev, item[idField])}}
                         onDrop={(ev) => {this._drop(ev, item[idField])}}
                         onDragOver={(ev) => {this._dragOver(ev, item[idField])}}
                         draggable={true}>
                {calculatedItem}
            </span>

        }).value();

        return <span className={styles.draggableList}>{draggableItemList}</span>

    }

}

export const DraggableList: React.ComponentClass<DraggableListProps> =
    connect(mapStateToProps, mapDispatchToProps)(_draggableList);
