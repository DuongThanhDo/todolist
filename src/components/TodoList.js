

function TodoList({ children, props }) {
    return ( 
        <div className="w-full h-[73%] border rounded-md overflow-y-scroll grow hide-scrollbar">{children}</div>
    );
}

export default TodoList;