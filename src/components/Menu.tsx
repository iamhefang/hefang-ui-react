import * as React from "react";
import {MenuItem} from "../interfaces/MenuItem";
import {Icon} from "./Icon";
import {execute} from "hefang-js";
import {div} from "../functions/dom";
import {render} from "react-dom";
import {RefObject} from "react";

export interface MenuProps {
    id?: string
    items: MenuItem[],
    visible?: boolean
}

interface MenuState {
    visible: boolean
}

export class Menu extends React.Component<MenuProps, MenuState> {
    private refMenu: RefObject<HTMLUListElement> = React.createRef();
    static readonly defaultProps: MenuProps = {
        items: [],
        visible: true
    };

    constructor(props: MenuProps) {
        super(props);
        this.state = {visible: props.visible}
    }

    public static show(items: MenuItem[]) {
        const container = div({style: {zIndex: 100}, appendTo: document.body});
        render(<Menu items={items}/>, container);
    }

    componentWillReceiveProps(nextProps: Readonly<MenuProps>, nextContext: any): void {
        this.setState({visible: nextProps.visible})
    }

    private renderMenuItems = (item: MenuItem) => {
        return item.type === "separator" ? <li className="hui-menu-separator"/> : <li className="hui-menu-item">
            <span className="hui-menu-label display-flex-row" onClick={e => execute(item.onClick, item)}>
                <Icon name={item.icon || "null"}/>
                <label className="flex-1">{item.text}</label>
                {item.subMenu && item.subMenu.length > 0 ? <Icon name={"caret-right"}/> : undefined}
            </span>
            {item.subMenu && item.subMenu.length > 0 ? <ul className="hui-menu">
                {item.subMenu.map(this.renderMenuItems)}
            </ul> : undefined}
        </li>
    };

    render() {
        return this.state.visible ?
            <ul className="hui-menu" ref={this.refMenu}>
                {this.props.items.map(this.renderMenuItems)}
            </ul> : undefined;
    }
}