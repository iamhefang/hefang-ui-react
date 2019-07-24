import * as React from "react";
import {OnMenuItemClick} from "../types/OnMenuItemClick";
import {MenuViewItemModel} from "../models/MenuViewItemModel";
import {InputSize} from "../enums/InputSize";
import {execute} from "hefang-js";
import {getOrDefault} from "../functions/map";

export interface MenuViewProps {
    onClick?: OnMenuItemClick
    items: MenuViewItemModel[]
    size?: InputSize
    autoFold?: boolean
    open?: boolean
}

interface MenuViewState {
    fold: Map<MenuViewItemModel, boolean>
    showLabel: boolean
}

export class MenuView extends React.Component<MenuViewProps, MenuViewState> {
    static readonly defaultProps: MenuViewProps = {
        items: [],
        size: "default",
        autoFold: true,
        open: true
    };

    constructor(props) {
        super(props);
        this.state = {
            fold: new Map(),
            showLabel: props.open
        };
    }

    private onClick = (item: MenuViewItemModel) => {
        execute(this.props.onClick, item);
        if (item.child && item.child.length) {
            const {fold} = this.state
                , current = !getOrDefault(fold, item, false);
            if (this.props.autoFold) {
                fold.clear();
            }
            fold.set(item, current);
            this.setState({fold})
        }
    };

    componentDidUpdate(prevProps: Readonly<MenuViewProps>, prevState: Readonly<MenuViewState>, snapshot?: any): void {
        if (prevProps.open !== this.state.showLabel) {
            setTimeout(() => this.setState({
                showLabel: this.props.open
            }), 150)
        }
    }

    private renderListItem = (item: MenuViewItemModel) => {
        const RealTag = item.url ? "a" : "span"
            , props = item.url ? {href: item.url} : {};
        return <li>
            <RealTag
                className="display-flex-row hui-menuview-item" {...props}
                onClick={e => this.onClick(item)}>
                <div className="hui-menuview-icon">
                    {item.icon}
                </div>
                <div className="flex-1">
                    {item.label}
                </div>
                {item.extra ? <div>{item.extra}</div> : null}
            </RealTag>
            {item.child && item.child.length && getOrDefault(this.state.fold, item, false) ?
                <ul className="hui-menuview">
                    {item.child.map(this.renderListItem)}
                </ul> : null}
        </li>
    };

    render() {
        return (
            <ul className="hui-menuview" data-size={this.props.size}>
                {this.props.items.map(this.renderListItem)}
            </ul>
        );
    }
}