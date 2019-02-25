let pxOf1rem = -1;


function calcPxOf1rem() {
    if (pxOf1rem < 1) {
        const tmpDiv = document.createElement("div") as HTMLDivElement;
        try {
            document.body.appendChild(tmpDiv);
            tmpDiv.style.position = "fixed";
            tmpDiv.style.height = "1rem";
            tmpDiv.style.width = "1rem";
            pxOf1rem = tmpDiv.scrollHeight;
        } catch (e) {
            pxOf1rem = 16
        } finally {
            tmpDiv.remove();
        }
    }
    return pxOf1rem;
}


export function px2rem(px: number): number {
    return px * calcPxOf1rem();
}

export function rem2px(rem: number) {
    return rem / calcPxOf1rem();
}