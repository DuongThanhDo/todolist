import TodoAdd from "./TodoAdd";

function TodoFooter() {

    return (  
        <div className="flex justify-between items-center h-[10%] px-4">
            <h1 className="font-semibold text-[28px]">To do List</h1>

            <TodoAdd />
        </div>
    );
}

export default TodoFooter;