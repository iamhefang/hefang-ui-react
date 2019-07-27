import * as React from "react";
import {ReactElement} from "react";
import {Icon} from "./Icon";
import {execute} from "hefang-js";
import {Empty} from "./Empty";
import {SelectOptionProps} from "./SelectOption";

export interface SelectProps<T> {
	value?: T
	defaultValue?: T
	placeholder?: string
	onChange?: (value?: T) => void | boolean
	filterOption?: (inputValue: string) => boolean
	children?: Array<ReactElement<SelectOptionProps>>
}

interface State {
	dropdown: boolean
	items: Array<SelectOptionProps>
}

function handleOptions(options: Array<ReactElement<SelectOptionProps>>) {
	return options.map(opt => opt.props)
}

export class Select<T> extends React.Component<SelectProps<T>, State> {
	static readonly defaultProps = {children: []};

	constructor(props) {
		super(props);
		this.state = {
			dropdown: true,
			items: handleOptions(Array.isArray(props.children) ? props.children : [props.children])
		};
	}

	static getDerivedStateFromProps(props: SelectProps<any>, state) {
		return {items: handleOptions(props.children || [])}
	}

	private onWindowBlur = () => {
	};

	componentDidMount(): void {
		window.addEventListener("blur", this.onWindowBlur);
	}

	componentWillUnmount(): void {
		window.removeEventListener("blur", this.onWindowBlur);
	}

	private renderItem = (item: SelectOptionProps, index: number) => {
		return <li key={'select-li-' + (item.key || index)}>{item.children}</li>
	};

	render() {
		return <div className="hui-select-container"
						onFocus={e => this.setState({dropdown: true})}
						onBlur={e => this.setState({dropdown: false})}
						data-open={this.state.dropdown}>
			<div className="display-flex-row hui-input hui-select">
				<div className="flex-1">
					<input type="text" className="no-border"
							 placeholder={this.props.placeholder}
							 onChange={e => execute(this.props.filterOption, e.currentTarget.value)}/>
				</div>
				<Icon name={'angle-down'} className="hui-select-arrow"/>
			</div>
			<div className="hui-select-dropdown">
				{this.state.items.length ? <ul>{this.state.items.map(this.renderItem)}</ul> : <Empty/>}
			</div>
		</div>;
	}
}
