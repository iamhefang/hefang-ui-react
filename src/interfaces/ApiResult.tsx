export interface ApiResult<T> {
	success: boolean
	result: T
	needLogin?: boolean
	needPassword?: boolean
	needPermission?: boolean
	needUnLock?: boolean,
	debug?: object
}
