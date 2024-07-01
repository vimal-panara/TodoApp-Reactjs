
type ButtonData = {
	title: string,
	handler: any,
	isDisabled?: boolean
}

function Button({title, handler, isDisabled = false}: ButtonData) {
	return (
		<>
			<button onClick={handler} disabled={isDisabled}
				className="p-4 py-1 text-white rounded-md bg-violet-800 hover:bg-violet-900 disabled:bg-violet-500">
				{title}
			</button>
		</>
	)
}

export default Button