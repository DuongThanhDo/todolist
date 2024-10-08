import { createContext, useEffect, useState } from 'react';
import TodoFooter from './TodoFooter';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import TodoList from './TodoList';
import { get, onValue, ref } from 'firebase/database';
import { database } from '../firebase/firebase';

export const TodoContext = createContext();

function Todo() {
    const [todolist, setTodolist] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        onValue(ref(database, 'todolist'), (data) => {
            let getTDL = [];
            data.forEach((d) => {
                getTDL.push({
                    key: d.key,
                    ...d.val(),
                });
            });
            setTodolist(getTDL);
            setFilteredList(getTDL);
        });
    }, []);

    const handleSearch = (searchValue) => {
        const todoSearch = todolist.filter((item) => item.content.includes(searchValue));
        setFilteredList(todoSearch);
    };

    const handleChangeType = (type) => {
        if (type === 'all') setFilteredList(todolist);
        else {
            const todoType = todolist.filter((item) => item.type === type);
            setFilteredList(todoType);
        }
    };

    const value = {
        todolist,
    };

    return (
        <TodoContext.Provider value={value}>
            <div className="w-[500px] h-[80%] bg-white rounded-xl px-4 pb-1 shadow-xl">
                <TodoHeader handleSearch={handleSearch} handleChangeType={handleChangeType} />
                <TodoList>
                    {filteredList.map((todo, index) => (
                        <TodoItem key={todo.key} index={index} todoList={todolist} todo={todo} />
                    ))}
                </TodoList>
                <TodoFooter />
            </div>
        </TodoContext.Provider>
    );
}

export default Todo;
