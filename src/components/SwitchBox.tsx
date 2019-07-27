import * as React from "react";
import {OnSwitchChange} from "../types/OnSwitchChange";
import {execute} from "hefang-js";
import {ColorType} from "../types/ColorType";

export interface SwitchState {
	checked: boolean
}

export interface SwitchProps {
	defaultChecked?: boolean
	checked?: boolean
	id?: string
	name?: string
	onChange?: OnSwitchChange
	type?: ColorType
}

export class SwitchBox extends React.Component<SwitchProps, SwitchState> {
	static readonly defaultProps: SwitchProps = {
		checked: false,
		defaultChecked: false,
		type: ""
	};

	constructor(props: SwitchProps) {
		super(props);
		this.state = {
			checked: props.defaultChecked
		};
	}

	private onChange = e => {
		if (execute(this.props.onChange, e.currentTarget.checked) !== false) {
			this.setState({checked: e.currentTarget.checked})
		}
	};

	static getDerivedStateFromProps(props: SwitchProps) {
		return {checked: props.checked}
	}

	componentWillReceiveProps(props: SwitchProps) {
		this.setState({
			checked: props.checked
		})
	}

	render() {
		const {id, name, type} = this.props;
		return <input
			type="checkbox" className={`hui-switch${type ? `-${type}` : ""}`}
			onChange={this.onChange}
			id={id} name={name}
			checked={this.state.checked}/>
	}
}
