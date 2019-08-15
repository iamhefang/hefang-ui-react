import {ReactNode} from "react";

export interface MenuViewItemModel {
	icon?: ReactNode
	label: string
	id?: string
	url?: string
	children?: Array<MenuViewItemModel>
	extra?: ReactNode
}
