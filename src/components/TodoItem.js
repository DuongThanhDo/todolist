import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, remove, update } from 'firebase/database';

function TodoItem({ todo, todoList, index }) {
    const [part, setPart] = useState(Number(todo.part) || 0);
    const [status, setStatus] = useState(todo.status);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDel, setIsModalOpenDel] = useState(false);
    const [inputContent, setInputContent] = useState(todo.content);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const now = Date.now();
        const todoRef = ref(database, `todolist/${todo.key}`);

        update(todoRef, {
            content: inputContent,
            part: todo.type === 'movie' ? Number(part) : null,
            updatedAt: now
        })
        .then(() => console.log("Cập nhật thành công!"))
        .catch((error) => console.error("Lỗi khi cập nhật:", error));

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkDel = () => {
        const todoRef = ref(database, `todolist/${todo.key}`);

        remove(todoRef)
            .then(() => console.log("Xóa thành công!"))
            .catch((error) => console.error("Lỗi khi xóa:", error));

        setIsModalOpenDel(false);
    };

    const handleCancelDel = () => {
        setIsModalOpenDel(false);
    };

    const handleComplete = () => {
        const todoRef = ref(database, `todolist/${todo.key}`);
        const now = Date.now();

        if (todo.type === 'todo') {
            const newStatus = !status;
            setStatus(newStatus);

            update(todoRef, {
                status: newStatus,
                updatedAt: now
            })
            .then(() => console.log("Cập nhật thành công!"))
            .catch((error) => console.error("Lỗi khi cập nhật:", error));

        } else if (todo.type === 'movie') {
            const newPart = Number(part) + 1;
            setPart(newPart);

            update(todoRef, {
                part: newPart,
                updatedAt: now
            })
            .then(() => console.log("Cập nhật thành công!"))
            .catch((error) => console.error("Lỗi khi cập nhật:", error));
        }
    };

    const handleDelete = () => {
        setIsModalOpenDel(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleOk();
        }
    };

    return (
        <div className="w-full flex items-center justify-between border-y pl-2 py-2 mb-2 shadow-sm">
            
            <div className={`grow mr-1 border-r relative ${status ? 'text-gray-400 line-through' : ''}`}>
                <p className="w-[340px] truncate">{todo.content}</p>

                {todo.type === 'movie' && (
                    <p className="px-2 py-1 rounded-md shadow-md absolute right-2 top-[-4px]">
                        {part}
                    </p>
                )}
            </div>

            <div className="w-[64px] pr-1 flex justify-between cursor-pointer gap-1">
                
                <CheckOutlined onClick={handleComplete} className="text-green-400" />

                <EditOutlined onClick={showModal} className="text-blue-400" />
                <Modal 
                    title="Sửa Todo" 
                    okType="default" 
                    open={isModalOpen} 
                    onOk={handleOk} 
                    onCancel={handleCancel}
                >
                    <div className="flex items-center gap-2 mt-4">
                        <Input
                            onKeyDown={handleKeyDown}
                            value={inputContent}
                            onChange={(e) => setInputContent(e.target.value)}
                        />

                        {todo.type === 'movie' && (
                            <Input
                                type="number"
                                value={part}
                                onChange={(e) => setPart(e.target.value)}
                                placeholder="Tập số..."
                                style={{ width: 120 }}
                            />
                        )}
                    </div>
                </Modal>

                <DeleteOutlined onClick={handleDelete} className="text-red-400" />
                <Modal 
                    title="Xóa Todo" 
                    okType="default" 
                    open={isModalOpenDel} 
                    onOk={handleOkDel} 
                    onCancel={handleCancelDel}
                >
                    <div className="flex items-center gap-2 mt-4">
                        <p>Bạn có chắc chắn xóa todo này!</p>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default TodoItem;