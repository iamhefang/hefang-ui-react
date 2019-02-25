import {noop} from "hefang-js";

export function isFullScreenEnabled() {
    return document.fullscreenEnabled ||
        document["mozFullScreenEnabled"] ||
        document["webkitFullscreenEnabled"] ||
        document["msFullscreenEnabled"] || false;
}

export function isFullScreen() {
    return document["fullscreenElement"] ||
        document["msFullscreenElement"] ||
        document["mozFullScreenElement"] ||
        document["webkitFullscreenElement"] || false;
}

export function requestFullScreen(element: Element) {
    (element.requestFullscreen ||
        element["webkitRequestFullScreen"] ||
        element["msRequestFullScreen"] ||
        element["mozRequestFullScreen"] || noop).call(element)
}

export function cancelFullScreen() {
    (document.exitFullscreen ||
        document["webkitCancelFullScreen"] ||
        document["webkitExitFullscreen"] ||
        document["msCancelFullScreen"] ||
        document["msExitFullscreen"] ||
        document["mozCancelFullScreen"] ||
        document["mozExitFullscreen"] || noop).call(document)
}
