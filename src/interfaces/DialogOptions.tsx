import {ReactNode} from "react";
import {IDialogOption} from "./IDialogOption";
import {HuiMask} from "../types/HuiMask";


export interface DialogOptions extends IDialogOption {
	mask?: HuiMask
	content?: ReactNode
}
