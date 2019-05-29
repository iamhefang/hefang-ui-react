import * as React from "react";
import {OnListItemClick} from "../types/OnListItemClick";
import {ListViewItemModel} from "../models/ListViewItemModel";
import {ReactText} from "react";

export interface ListViewProps {
    onClick?: OnListItemClick
    items: ListViewItemModel[]
    itemHeight?: ReactText
}

export class ListView extends React.Component<ListViewProps> {
    static readonly defaultProps: ListViewProps = {
        itemHeight: '45px',
        items: []
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    private renderListItem = (item: ListViewItemModel) => {
        const Tag = item.url ? "a" : "span";
        return <li>
            <Tag className="display-flex-row hui-listview-item" href={item.url}
                 style={{height: this.props.itemHeight, lineHeight: this.props.itemHeight}}>
                <div className="hui-listview-icon">
                    {item.icon}
                </div>
                <div className="flex-1">
                    {item.label}
                </div>
                <div>

                </div>
            </Tag>
            {item.child && item.child.length ? <ul className="hui-listview">
                {item.child.map(this.renderListItem)}
            </ul> : null}
        </li>
    };

    render() {
        return (
            <ul className="hui-listview">
                {this.props.items.map(this.renderListItem)}
            </ul>
        );
    }
}