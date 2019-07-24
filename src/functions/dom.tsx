import {DivAttr} from "../interfaces/DivAttr";

export function remove(element: Element) {
    if (!element || !element.nodeType) return;
    try {
        element.remove()
    } catch (e) {
        element.parentElement.removeChild(element);
    }
}

export function div(attr?: DivAttr): HTMLDivElement {
    const div = document.createElement("div");
    if (attr) {
        attr.id && (div.id = attr.id);
        attr.className && (div.className = attr.className);
        if (attr.style) {
            for (const name in attr.style) {
                div.style[name] = attr.style[name] + "";
            }
        }
        if (attr.appendTo) {
            attr.appendTo.append(div);
        }
    }
    return div;
}
