export interface CodeResult<T> {
	code: number
	message: string
	result: T,
	debug?: object
}
