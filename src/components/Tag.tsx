import * as React from "react";
import {InputSize} from "../enums/InputSize";
import {ColorType} from "../types/ColorType";
import {execute} from "hefang-js";

export interface TagProps {
    text: string
    size?: InputSize
    removable?: boolean
    type?: ColorType
    onClick?: (tag?: string) => void
    onRemove?: (tag: string) => void
}

export function Tag(props: TagProps) {
    return <span
        className={`hui-tag${props.type ? "-" + props.type : ""}`}
        data-removable={props.removable}
        onClick={e => execute(props.onClick, props.text)} data-size={props.size}>
           {props.text}
        {props.removable ?
            <button
                className="no-background no-border hui-tag-remove"
                onClick={e => execute(props.onRemove, props.text)}>
                ×
            </button> : null}
    </span>;
}
