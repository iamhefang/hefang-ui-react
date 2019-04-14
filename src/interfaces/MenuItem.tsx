export interface MenuItem {
    text?: string;
    type?: 'menu' | 'separator'
    subMenu?: MenuItem[]
    id?: string
    onClick?: Function
    icon?: string
}