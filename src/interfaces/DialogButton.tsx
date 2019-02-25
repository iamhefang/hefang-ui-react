import {CSSProperties} from "react";
import {DialogOnClose} from "../types/DialogOnClose";

export interface DialogButton {
    text: string
    className?: string
    style?: CSSProperties
    onClick?: DialogOnClose
}
