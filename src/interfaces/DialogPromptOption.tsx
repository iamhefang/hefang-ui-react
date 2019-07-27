import {DialogOptions} from "./DialogOptions";
import {DialogPromptOnChange} from "../types/DialogPromptOnChange";

export interface DialogPromptOption extends DialogOptions {
	inputType?: "text" | "number" | "textarea" | "password" | "tel" | "search"
	placeholder?: string
	maxLength?: number
	max?: number
	min?: number
	pattern?: string
	rows?: number
	onChange?: DialogPromptOnChange
}
