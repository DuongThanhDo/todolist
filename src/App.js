// import { useEffect } from 'react';
import Todo from './components/Todo';
// import todoApi from './api/todoApi';

function App() {
    // useEffect(() => {
    //     const fetchTodoList = async () => {
    //         try {
    //             const param = {
    //                 _page: 1,
    //                 _limit: 10,
    //             };
    //             const response = await todoApi.getAll(param);
    //             console.log(response);
    //         } catch (error) {
    //             console.log('Loi~: ', error);
    //         }
    //     };

    //     fetchTodoList();
    // }, []);

    return (
        <div className="w-full h-[100vh] bg-gray-500 flex items-center justify-center">
            <Todo />
        </div>
    );
}

export default App;
