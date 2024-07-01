
import Button from "../Button/Button"

type TodoData = {
	uuid: string,
	description: string,
	isCompleted: boolean,
	handleChecked: any,
	handleDelete: any,
	handleEdit: any
}

function Todo({ uuid, description, isCompleted, handleChecked, handleDelete, handleEdit }: TodoData) {
	return (
		<div className="todo flex flex-wrap justify-evenly items-center my-[5px] w-[65%] ">
			<input type="checkbox" checked={isCompleted} onChange={handleChecked} name={uuid} />
			<div className="todoDescription w-[75%] border-violet-500 border-[2px] px-[10px] rounded-lg">
				<span className={isCompleted ? "line-through" : ""}>{description}</span>
			</div>
			<div className="todoButtons flex justify-bewteen gap-[5px]">
				<Button title="Edit" handler={() => handleEdit(uuid)} isDisabled={isCompleted} />
				<Button title="Delete" handler={() => handleDelete(uuid)} isDisabled={isCompleted} />
			</div>
		</div>
	)
}

export default Todo