import {type} from "hefang-js";

export function getOrDefault<K, V>(map: Map<K, V> | object, key: K, def: V = null): V {
    if (type(map) === "Map") {
        return (map as Map<K, V>).has(key) ? (map as Map<K, V>).get(key) : def
    }
    // @ts-ignore
    if (key in map) {
        // @ts-ignore
        return map[key]
    }
    return def
}