import {ReactNode} from "react";

export interface ListViewItemModel {
    icon?: ReactNode
    label: string
    id?: string
    url?: string
    child?: ListViewItemModel[]
    extra?: ReactNode
}