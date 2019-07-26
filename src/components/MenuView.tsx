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
		const {open} = this.props;
		if (prevProps.open !== open) {
			if (open) {
				setTimeout(() => this.setState({
					showLabel: open
				}), 150)
			} else {
				this.setState({showLabel: open})
			}
		}
	}

	private renderListTag = (item: MenuViewItemModel) => {
		const RealTag = item.url ? "a" : "span"
			, props = item.url ? {href: item.url} : {};
		return <RealTag
			className="display-flex-row hui-menuview-item" {...props}
			onClick={e => this.onClick(item)}>
			<div className="hui-menuview-icon">
				{item.icon}
			</div>
			<div className="flex-1 hui-menuview-label">
				{item.label}
			</div>
			{item.extra ? <div className="hui-menuview-extra">{item.extra}</div> : null}
		</RealTag>
	};

	private renderListItem = (item: MenuViewItemModel) => {
		const active = getOrDefault(this.state.fold, item, false);
		return <li data-active={active}>
			{this.renderListTag(item)}
			{item.child && item.child.length ?
				<ul className="hui-menuview">
					<li className="hui-menuview-pophead">
						{this.renderListTag(item)}
					</li>
					{item.child.map(item => this.renderListItem(item))}
				</ul> : null}
		</li>
	};

	render() {
		return (
			<ul className="hui-menuview" data-size={this.props.size} data-open={this.props.open}>
				{this.props.items.map(this.renderListItem)}
			</ul>
		);
	}
}
