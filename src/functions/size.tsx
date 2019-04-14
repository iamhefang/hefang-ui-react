import {remove} from "./dom";

const _1rem = (() => {
    const tmpDiv = document.createElement("div") as HTMLDivElement;
    try {
        document.body.appendChild(tmpDiv);
        tmpDiv.style.position = "fixed";
        tmpDiv.style.height = "1rem";
        return tmpDiv.scrollHeight;
    } catch (e) {
        return 16
    } finally {
        remove(tmpDiv)
    }
})();

export function px2rem(px: number): number {
    if (px == 0) return 0;
    return px / _1rem;
}

export function rem2px(rem: number): number {
    if (rem == 0) return 0;
    return rem * _1rem;
}

