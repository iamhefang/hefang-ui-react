import {ReactText} from "react";

export interface DialogOperater {
    height(): number

    height(value: ReactText): DialogOperater;

    height(value?): DialogOperater | number

    width(): number

    width(value: ReactText): DialogOperater;

    width(value?): DialogOperater | number

    close(data?: any)

    data(): any

    data(data?: any): DialogOperater

    id(): string

    shake(duration?: number): DialogOperater
}