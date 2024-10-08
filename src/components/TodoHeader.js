import { Input, Select } from 'antd'

function TodoHeader({ handleSearch, handleChangeType }) {
    return ( 
        <div className="h-[15%] flex justify-between items-center">
            <div className='grow pr-[16px]'>
                <Input.Search onSearch={(value) => handleSearch(value)} 
                    placeholder='Tìm kiếm...'
                />
            </div>

            <div>
                <Select 
                    onChange={(value) => handleChangeType(value)}
                    defaultValue='All'
                    style={{ width: 140 }}
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'todo', label: 'Todo' },
                        { value: 'movie', label: 'Movie' },
                    ]}
                />
            </div>
        </div>
    );
}

export default TodoHeader;