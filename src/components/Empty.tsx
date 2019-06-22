import * as React from "react";
import {ReactNode} from "react";
import {Icon} from "./Icon";
import {IconSize} from "../enums/IconSize";

export interface EmptyProps {
    description?: ReactNode
    icon?: ReactNode
}

export function Empty(props: EmptyProps) {
    return <div className="text-center hui-empty">
        <div className="hui-empty-icon">
            {props.icon || <Icon name={'inbox'} size={IconSize._4x}/>}
        </div>
        <p className='hui-empty-desc'>{props.description || "暂无数据"}</p>
    </div>
}