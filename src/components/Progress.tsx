import * as React from "react";
import {CSSProperties} from "react";
import {execute, guid, type} from "hefang-js";
import {InputSize} from "../enums/InputSize";
import {ProgressText} from "../types/ProgressText";

export interface ProgressProps {
	id?: string
	value?: number
	max?: number
	strokeColor?: Array<string> | string
	size?: InputSize
	showCursor?: boolean
	text?: ProgressText
	style?: CSSProperties
}

const sizes: { [key: string]: number } = {
	small: 10,
	default: 20,
	large: 30
};

const defaultProps: ProgressProps = {
	value: 0,
	max: 100,
	strokeColor: ["#108ee9", "#87d068"],
	size: "default",
	showCursor: true,
	text: true,
	style: {color: "black", background: "#f5f5f5"}
};

export class Progress extends React.Component<ProgressProps> {
	public id: string;
	static readonly defaultProps = defaultProps;

	constructor(props: ProgressProps) {
		super(props);
		this.id = props.id || guid();
	}

	render() {
		const {
			value, max, strokeColor, size, text, showCursor,
			style: {
				color = defaultProps.style.color,
				background = defaultProps.style.background
			}
		} = this.props;
		const progressBackground = Array.isArray(strokeColor) ? `linear-gradient(90deg, ${strokeColor.join(", ")})` : strokeColor
			, height = sizes[size]
			, clipPath = `url(#clip-path-${this.id})`
			, fontSize = size === "small" ? "80%" : "auto"
			, borderRadius = height / 2;


		let label: string;
		if (text) {
			if (type(text) === "Boolean") {
				label = `${~~(value / max * 100)}%`
			} else if (type(text) === "Function") {
				label = execute(text, value, max)
			} else {
				label = text as string;
			}
		}
		return <>
			<div className="hui-progress-container" style={{background, borderRadius}}>
				<div className="hui-progress"
					  style={{background: progressBackground, clipPath, height}}>
					{showCursor ? <div className="hui-progress-cover"/> : null}
					<div
						className="hui-progress-text text-center hui-progress-transition"
						style={{width: `${value / max * 100}%`, lineHeight: height + "px", fontSize, color, borderRadius}}>
						{label}
					</div>
				</div>
			</div>
			<svg height={0}>
				<clipPath id={`clip-path-${this.id}`} clipPathUnits="objectBoundingBox">
					<rect
						height={1} width={value / max}
						x={0} y={0}
						rx={height / 1500} ry={1}
						className="hui-progress-transition"/>
				</clipPath>
			</svg>
		</>;
	}
}
