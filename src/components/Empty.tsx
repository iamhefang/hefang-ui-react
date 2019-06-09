import * as React from "react";
import {ReactNode} from "react";
import {Icon} from "./Icon";
import {IconSize} from "../enums/IconSize";

export interface EmptyProps {
    description?: ReactNode
    icon?: ReactNode
}

export function Empty(props: EmptyProps) {
    return <div className="text-center" style={{color: 'gray'}}>
        {props.icon || <Icon name={'inbox'} size={IconSize._4x}/>}
        <p>{props.description || "暂无数据"}</p>
    </div>
}