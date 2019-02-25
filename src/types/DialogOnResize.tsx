import {DialogOperater} from "../interfaces/DialogOperater";

export type DialogOnResize = (width?: number, height?: number, isMaximized?: boolean, operater?: DialogOperater) => void;