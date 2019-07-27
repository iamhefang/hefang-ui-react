export function setLocalStorage(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string, defaultValue: any = null): any {
	const value = localStorage.getItem(key);
	return value === null || value === undefined || value === "undefined" ? defaultValue : JSON.parse(value);
}

export function setSessionStorage(key: string, value: any) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionStorage(key: string, defaultValue: any = null): any {
	const value = sessionStorage.getItem(key);
	return value === null || value === undefined || value === "undefined" ? defaultValue : JSON.parse(value);
}
