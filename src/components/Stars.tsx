import * as React from "react";
import {ReactText} from "react";
import {execute, range} from "hefang-js";
import {Icon} from "./Icon";

export interface StarsState {
	value: number
}

export type OnChange = (value: number) => boolean | void

export interface StarsProps {
	value?: number
	total?: number
	color?: string
	onChange?: OnChange
	size?: ReactText
	// enableHalfStar?: boolean
}

export class Stars extends React.Component<StarsProps, StarsState> {
	static readonly displayName = "Stars";

	static readonly defaultProps: StarsProps = {
		value: 0,
		total: 5,
		color: "#ffba00",
		size: "auto",
		// enableHalfStar: false
	};

	constructor(props: StarsProps) {
		super(props);
		this.state = {value: props.value}
	}

	onChange = (value: number) => {
		if (execute(this.props.onChange, value) !== false) {
			this.setState({value});
		}
	};

	render() {
		return <span className="hui-star" style={{color: this.props.color, fontSize: this.props.size}}>
            {range(1, this.props.total).map(
					s => <Icon key={`star${s}`} style={{cursor: "pointer"}}
								  name={"star"} onClick={e => this.onChange(s)}
								  namespace={this.state.value < s ? "far" : "fas"}/>
				)}</span>
	}
}
