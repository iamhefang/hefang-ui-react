import * as React from "react";
import {CSSProperties, ReactNode} from "react";
import {IconSize} from "../enums/IconSize";
import {IconAnimation} from "../enums/IconAnimation";
import {IconNamespace} from "../types/IconNamespace";

export interface IconProps {
	name: string
	namespace?: IconNamespace,
	tagName?: string
	className?: string
	size?: IconSize
	animation?: IconAnimation
	style?: CSSProperties
	onClick?: Function
	children?: ReactNode
}

export function Icon(props: IconProps) {
	let className = `hui-icon ${props.className || ""} ${props.namespace || 'fa'} fa-${props.name}`;
	props.animation && (className += ` fa-${props.animation}`);
	props.size && (className += ` fa-${props.size}`);
	return React.createElement(props.tagName || 'i', {
		className,
		style: props.style,
		onClick: props.onClick,
		children: props.children
	})
}
