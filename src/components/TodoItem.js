import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, remove, update } from 'firebase/database';

function TodoItem({ todo, todoList, index }) {
    const [part, setPart] = useState(todo.part);
    const [status, setStatus] = useState(todo.status);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalOpenDel, setIsModalOpenDel] = useState(false);
    const [inputContent, setInputContent] = useState(todo.content);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        todo.content = inputContent;
        if (todo.type === 'movie') {
            todo.part = part;
        }

        const todoRef = ref(database, `todolist/${todo.key}`);

        // Dùng update để cập nhật giá trị
        update(todoRef, {
          content: inputContent,
          part: todo.type === 'movie' ? part : null
        })
        .then(() => {
          console.log("Cập nhật thành công!");
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật:", error);
        });

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkDel = () => {        
        todoList.splice(index, 1);
        const todoRef = ref(database, `todolist/${todo.key}`);

        // Dùng remove để xóa node đó
        remove(todoRef)
          .then(() => {
            console.log("Xóa thành công!");
          })
          .catch((error) => {
            console.error("Lỗi khi xóa:", error);
          });
    };

    const handleCancelDel = () => {
        setIsModalOpenDel(false);
    };
    const handleComplete = () => {
        const todoRef = ref(database, `todolist/${todo.key}`);
        if (todo.type === 'todo') {
            setStatus(!status)
            update(todoRef, {
                status: !todo.status
              })
              .then(() => {
                console.log("Cập nhật thành công!");
              })
              .catch((error) => {
                console.error("Lỗi khi cập nhật:", error);
              });
        }
        else if (todo.type === 'movie') {
            setPart(Number(part) + 1);
            // Dùng update để cập nhật giá trị
            update(todoRef, {
              part: Number(todo.part) + 1
            })
            .then(() => {
              console.log("Cập nhật thành công!");
            })
            .catch((error) => {
              console.error("Lỗi khi cập nhật:", error);
            });
        }
    };

    const hadleDelete = () => {
        setIsModalOpenDel(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleOk()
        }
    }

    return (
        <div className="w-full flex items-center justify-between border-y pl-2 py-2 mb-2 shadow-sm">
            <div className={`grow mr-1 border-r relative ${status && 'text-gray-400 line-through'}`}>
                <p className="w-[340px] truncate">{todo.content}</p>
                {todo.type === 'movie' && (
                    <p className=" px-2 py-1 rounded-md shadow-md absolute right-2 top-[-4px]">{part}</p>
                )}
            </div>

            <div className="w-[64px] pr-1 flex justify-between cursor-pointer gap-1 ">
                {/* hoàn thành */}
                <CheckOutlined onClick={handleComplete} className="text-green-400" />

                {/* sửa */}
                <EditOutlined onClick={showModal} className="text-blue-400" />
                <Modal title="Sửa Todo" okType="default" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className="flex justify-between, items-center gap-2 mt-4">
                        <Input onKeyDown={(e) => handleKeyDown(e)} value={inputContent} onChange={(e) => setInputContent(e.target.value)} />

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

                {/* xóa */}
                <DeleteOutlined onClick={hadleDelete} className="text-red-400" />
                <Modal title="Xóa Todo" okType="default" open={isModalOpenDel} onOk={handleOkDel} onCancel={handleCancelDel}>
                    <div className="flex justify-between, items-center gap-2 mt-4">
                        <p>Bạn có chắc chắn xóa todo này!</p>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default TodoItem;
