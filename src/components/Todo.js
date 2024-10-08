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

    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD') // Chuẩn hóa chuỗi
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu kết hợp
            .replace(/đ/g, 'd') // Thay thế chữ đ thành d
            .replace(/Đ/g, 'D') // Thay thế chữ Đ thành D
            .toLowerCase(); // Chuyển thành chữ thường
    };

    const handleSearch = (searchValue) => {
        const todoSearch = todolist.filter((item) =>
            removeVietnameseTones(item.content).includes(removeVietnameseTones(searchValue.trim())),
        );
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
