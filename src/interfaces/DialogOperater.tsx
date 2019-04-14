import {ReactText} from "react";

export interface DialogOperater {
    height(): number

    height(value: ReactText): DialogOperater;

    height(value?)

    width(): number

    width(value: ReactText): DialogOperater;

    width(value?)

    close(data?: any)

    data(): any

    data(data?: any): DialogOperater

    id(): string

    shake(duration?: number): DialogOperater

    contentElement(): ChildNode
}