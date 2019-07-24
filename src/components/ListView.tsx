import * as React from "react";
import {OnListItemClick} from "../types/OnListItemClick";
import {ListViewItemModel} from "../models/ListViewItemModel";
import {InputSize} from "../enums/InputSize";
import {execute} from "hefang-js";

export interface ListViewProps {
    onClick?: OnListItemClick
    items: ListViewItemModel[]
    size?: InputSize
}

export class ListView extends React.Component<ListViewProps> {
    static readonly defaultProps: ListViewProps = {
        items: [],
        size: "default"
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    private renderListItem = (item: ListViewItemModel) => {
        const RealTag = item.url ? "a" : "span"
            , props = item.url ? {href: item.url} : {};
        return <li>
            <RealTag
                className="display-flex-row hui-listview-item" {...props}
                onClick={e => execute(this.props.onClick, item)}>
                <div className="hui-listview-icon">
                    {item.icon}
                </div>
                <div className="flex-1">
                    {item.label}
                </div>
                {item.extra ? <div>{item.extra}</div> : null}
            </RealTag>
            {item.child && item.child.length ? <ul className="hui-listview">
                {item.child.map(this.renderListItem)}
            </ul> : null}
        </li>
    };

    render() {
        return (
            <ul className="hui-listview" data-size={this.props.size}>
                {this.props.items.map(this.renderListItem)}
            </ul>
        );
    }
}