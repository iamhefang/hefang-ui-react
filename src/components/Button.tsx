import * as React from "react";
import {CSSProperties, MouseEventHandler, ReactText} from "react";
import {IconAnimation} from "../enums/IconAnimation";
import {Icon} from "./Icon";

export interface ButtonState {

}

export interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    style?: CSSProperties
    theme?: string
    loading?: boolean
    text: ReactText
    disabled?: boolean
    id?: string
}

export class Button extends React.Component<ButtonProps, ButtonState> {
    static readonly defaultProps: ButtonProps = {
        theme: "",
        loading: false,
        text: '',
        disabled: false
    };

    constructor(props: ButtonProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <button {...this.props}
                       disabled={this.props.loading || this.props.disabled}>
            {this.props.loading ? <>
                <Icon name="spinner" animation={IconAnimation.spin} key={`buttonLoadingIcon${this.props.id}`}/>&nbsp;
            </> : null}
            {this.props.text}
        </button>
    }
}