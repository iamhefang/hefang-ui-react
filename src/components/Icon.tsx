import * as React from "react";
import {CSSProperties} from "react";
import {IconSize} from "../enums/IconSize";
import {IconAnimation} from "../enums/IconAnimation";
import {IconNamespace} from "../types/IconNamespace";

export interface IconState {

}

export interface IconProps {
    name: string
    namespace?: IconNamespace,
    tagName?: string
    className?: string
    size?: IconSize
    animation?: IconAnimation
    style?: CSSProperties
    onClick?: Function
}


export class Icon extends React.Component<IconProps, IconState> {
    static readonly displayName = "Icon";

    static readonly defaultProps: IconProps = {
        name: "",
        tagName: "i",
        namespace: 'fa'
    };

    constructor(props: IconProps) {
        super(props);
        this.state = {};
    }

    render() {
        let className = `hui-icon ${this.props.className || ""} ${this.props.namespace} fa-${this.props.name}`;
        this.props.animation && (className += ` fa-${this.props.animation}`);
        this.props.size && (className += ` fa-${this.props.size}`);
        return React.createElement(this.props.tagName, {
            className,
            style: this.props.style,
            onClick: this.props.onClick
        })
    }
}