import { useState } from 'react';

export default () => {
    const [data, setData] = useState<Process.Record[]>([
        { id: 1, name: 'Toán', content: 'Học giải tích', note: 'Học kiến thức', progress: false, time: 10 },
        { id: 2, name: 'Văn', content: 'Học lý thuyết thông tin', note: 'Học kiến thức', progress: false, time: 3 },
        { id: 3, name: 'Lập trình', content: 'Học lập trình', note: 'Học kiến thức', progress: false, time: 4 },
    ])
    const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<Process.Record>();

    const addTask = (task: Process.Record) => {
        setData([...data, { ...task, id: Date.now() }]);
    }

    const updateTask = (task: Process.Record) => {
        setData(data.map((item) => (item.id === task.id ? { ...task, time: task.progress ? item.time : task.time } : item)));
    }

    const deleteTask = (id: number) => {
        setData(data.filter((item) => item.id !== id));
    }

    const increaseTimeByOneSecond = (id: number) => {
        setData(data.map((item) => (item.id === id ? { ...item, time: item.time + (1 / 60) } : item)));
    }

    return{
        visible,
        setVisible,
        isEdit,
        setIsEdit,
        row,
        setRow,
        data,
        setData,
        addTask,
        updateTask,
        deleteTask,
        increaseTimeByOneSecond
    }
}