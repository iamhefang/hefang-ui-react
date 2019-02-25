import {ReactNode, ReactText} from "react";
import {DialogButton} from "./DialogButton";
import {DialogOnResize} from "../types/DialogOnResize";
import {DialogOnMaximize} from "../types/DialogOnMaximize";
import {DialogOnClose} from "../types/DialogOnClose";

export interface IDialogOption {
    maximize?: boolean
    maximizable?: boolean
    resizable?: boolean
    url?: string
    icon?: string | ReactNode | boolean
    title?: string | boolean
    onResize?: DialogOnResize
    onMaximizing?: DialogOnMaximize
    onMaximized?: DialogOnMaximize
    onClosing?: DialogOnClose
    onClosed?: DialogOnClose
    id?: string
    buttons?: DialogButton[]
    movable?: boolean
    height?: ReactText
    width?: ReactText
    minWidth?: ReactText
    minHeight?: ReactText
    maxWidth?: ReactText
    maxHeight?: ReactText
}
