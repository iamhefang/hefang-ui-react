import * as React from "react";
import {HTMLAttributes, ReactElement, ReactNode} from "react";
import {Icon, IconProps} from "./Icon";

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
    loading: boolean
    children: ReactNode
    text?: string
    icon?: ReactElement<IconProps>
}

export default function Loading(props: LoadingProps) {
    const {text, icon, ...p} = props;
    return <div {...p} style={{position: "relative"}}>
        {props.loading ? <div className="hui-loading-spin text-center">
            <div className="hui-loading-layer">
                {icon || <Icon name="spinner" animation="spin" size="3x"/>}
                {props.text ? <div style={{padding: "5px 0"}}>{text}</div> : null}
            </div>
        </div> : null}
        <div className="hui-loading-child">
            {props.children}
        </div>
    </div>
}