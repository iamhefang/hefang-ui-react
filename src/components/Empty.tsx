import * as React from "react";
import {ReactNode} from "react";
import {Icon} from "./Icon";

export interface EmptyProps {
    description?: ReactNode
    icon?: ReactNode
}

export function Empty(props: EmptyProps) {
    return <div className="text-center" style={{color: '#bdbdbd'}}>
        {props.icon || <Icon name={'inbox'} size="4x"/>}
        <p>{props.description || "暂无数据"}</p>
    </div>
}