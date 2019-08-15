import * as React from "react";
import {OnMenuItemClick} from "../types/OnMenuItemClick";
import {MenuViewItemModel} from "../models/MenuViewItemModel";
import {InputSize} from "../enums/InputSize";
import {execute, md5} from "hefang-js";
import {getOrDefault} from "../functions/map";
import {OnLabelVisibleChange} from "../types/OnLabelVisibleChange";

export interface MenuViewProps {
	onClick?: OnMenuItemClick
	onLabelVisibleChange?: OnLabelVisibleChange
	items: MenuViewItemModel[]
	size?: InputSize
	autoFold?: boolean
	open?: boolean
	activeIds?: Array<string>
}

interface MenuViewState {
	fold: Map<MenuViewItemModel, boolean>
	showLabel: boolean
	active: Array<string>
}

export class MenuView extends React.Component<MenuViewProps, MenuViewState> {
	static readonly defaultProps: MenuViewProps = {
		items: [],
		size: "default",
		autoFold: true,
		open: true,
		activeIds: []
	};

	constructor(props: MenuViewProps) {
		super(props);
		this.state = {
			fold: new Map(),
			showLabel: props.open,
			active: props.activeIds,
		};
	}

	private onClick = (item: MenuViewItemModel, parent: MenuViewItemModel = null, e?) => {
		e.preventDefault();
		if (execute(this.props.onClick, item, parent) !== false) {
			const {active, fold} = this.state;
			if (parent || !item.children) {
				if (parent) {
					active[0] = parent.id;
					active[1] = item.id;
				} else {
					active[0] = active.indexOf(item.id) === -1 ? item.id : null;
					active[1] = null
				}
			}
			if (item.children && item.children.length) {
				const current = !getOrDefault(fold, item, false);
				if (this.props.autoFold) {
					fold.clear();
				}
				fold.set(item, current);
			}
			if (parent || !item.children) {
				if (this.props.autoFold) {
					fold.clear();
				}
				fold.set(parent, true);
			}
			this.setState({fold, active})
		}
	};

	componentDidUpdate(prevProps: Readonly<MenuViewProps>, prevState: Readonly<MenuViewState>, snapshot?: any): void {
		const {open} = this.props;
		if (prevProps.open !== open) {
			if (open) {
				setTimeout(() => {
					this.setState({showLabel: open});
					execute(this.props.onLabelVisibleChange, open);
				}, 100)
			} else {
				execute(this.props.onLabelVisibleChange, open);
				this.setState({showLabel: open});
			}
		}
	}

	private renderListTag = (item: MenuViewItemModel, parent: MenuViewItemModel = null) => {
		const RealTag = item.url ? "a" : "span"
			, props = item.url ? {href: item.url} : {};
		return <RealTag
			data-active={this.state.active.indexOf(item.id) !== -1}
			className="display-flex-row hui-menuview-item" {...props}
			onClick={e => this.onClick(item, parent, e)}>
			<div className="hui-menuview-icon">
				{item.icon}
			</div>
			{this.state.showLabel || parent ? <>
				<div className="flex-1 hui-menuview-label">
					{item.label}
				</div>
				{item.extra ? <div className="hui-menuview-extra">{item.extra}</div> : null}
			</> : null}
		</RealTag>
	};

	private renderListItem = (item: MenuViewItemModel, parent: MenuViewItemModel = null, index: number = 0) => {
		item.id = item.id || md5(item.label + (parent ? parent.label : "") + index);
		const unfold = getOrDefault(this.state.fold, item, false);
		return <li data-fold={!unfold}>
			{this.renderListTag(item, parent)}
			{!parent ?
				<ul className="hui-menuview">
					<li className="hui-menuview-pophead">
						{this.renderListTag(item, item)}
					</li>
					{(item.children || []).map(child => this.renderListItem(child, item, index))}
				</ul> : null}
		</li>
	};

	render() {
		return (
			<ul className="hui-menuview" data-size={this.props.size} data-open={this.props.open}>
				{this.props.items.map((item, index) => this.renderListItem(item, null, index))}
			</ul>
		);
	}
}
