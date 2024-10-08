import { Button, Input, Modal, Select } from "antd";
import { push, ref } from "firebase/database";
import { useContext, useState } from "react";
import { database } from "../firebase/firebase";
import { TodoContext } from "./Todo";

function TodoAdd() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputContent, setInputContent] = useState('');
    const [inputPart, setInputPart] = useState('');
    const [isType, setIsType] = useState('todo');

    const context = useContext(TodoContext)

    let id_ = context.todolist.length === 0 ? 1 : Number(context.todolist[context.todolist.length - 1].id) + 1

    console.log(context.todolist);

    const showModal = () => {
      setIsModalOpen(true);
      setInputContent('')
      setInputPart('')
    };
  
    const handleOk = () => {
        push(ref(database, 'todolist'), {
            content: inputContent,
            type: isType,
            part: isType === 'movie' ? inputPart : 'null',
            status: false
        })
        setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleChangeType = (value) => {
        setIsType(value)
    }

    return ( 
        <>            
            <Button type="default" onClick={showModal}>
                Thêm
            </Button>
            <Modal title="Thêm Todo" okType="default" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {/* type */}
                <Select 
                    defaultValue='Todo'
                    style={{ width: 140 }}
                    onChange={handleChangeType}
                    options={[
                        { value: 'todo', label: 'Todo' },
                        { value: 'movie', label: 'Movie' },
                    ]}
                />

                <div className="flex justify-between, items-center gap-2 mt-2">
                    <Input autoFocus value={inputContent} onChange={(e) => setInputContent(e.target.value)} placeholder="Nhập nội dung..."/>

                    {isType === 'movie' && <Input value={inputPart} onChange={(e) => setInputPart(e.target.value)} type="number" placeholder="Tập số..." style={{ width: 120 }} />}
                </div>

            </Modal>
        </>
    );
}

export default TodoAdd;