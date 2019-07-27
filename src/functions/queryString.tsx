import {isPlainObject} from "hefang-js";

export function queryString(obj?: object): string {
	if (!isPlainObject(obj)) {
		return location.search.substring(1, location.search.length);
	}
	let qs = [];
	for (const key in obj) {
		qs.push(`${key}=${encodeURIComponent(obj[key])}`)
	}
	return qs.join("&");
}

export function hashString(): string {
	return location.hash.substring(1, location.hash.length - 1);
}

export function queryObject(key: string = null, defaultValue: string = null, string: string = null): object | string {
	string = string || queryString();

	if (key) {
		const obj = queryObject();
		return key && (key in (obj as object)) ? obj[key] : defaultValue;
	} else {
		const queryObject = {};
		string.split('&').forEach(function (item: string) {
			const kvs = item.split('=');
			queryObject[kvs[0]] = kvs.length > 1 ? decodeURIComponent(kvs[1]) : '';
		});
		return queryObject;
	}
}

export function hashObject(key: string = null, defaultValue: string = null): object | string {
	return queryObject(key, defaultValue, hashString());
}
