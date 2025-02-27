import { useState, useEffect, useRef } from 'react';

export default () => {
	const [data, setData] = useState<Process.Record[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<Process.Record>();
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	// Chạy 1 lần duy nhất khi component được render
	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem('process') || '[]');
		setData(savedData);
	}, []);

	// Chạy mỗi khi data thay đổi
	useEffect(() => {
		localStorage.setItem('process', JSON.stringify(data));
	}, [data]);

	const toggleProgress = (id: number) => {
		setData((prevData) =>
			prevData.map((item) => {
				if (item.id === id) {
					// Nếu đang học => dừng
					if (item.progress) {
						if (timerRef.current) clearInterval(timerRef.current);
						return { ...item, progress: false };
					} else {
						// Nếu chưa học => bắt đầu
						if (timerRef.current) clearInterval(timerRef.current);
						timerRef.current = setInterval(() => {
							setData((innerPrevData) =>
								innerPrevData.map((task) => (task.id === id ? { ...task, time: task.time + 1 } : task)),
							);
						}, 1000);
						return { ...item, progress: true };
					}
				}
				return item;
			}),
		);
	};

	// Thêm hoặc cập nhật môn học
	const addOrUpdateTask = (task: Process.Record) => {
		if (isEdit) {
			const updateTask = data.map((item) => {
				if (row && item.id === row.id) {
					return { ...item, ...task };
				}
				return item;
			});
			setData(updateTask);
		} else {
			setData([...data, { ...task, id: Date.now() }]);
		}
	};

	const deleteTask = (id: number) => {
		setData(data.filter((item) => item.id !== id));
	};

	return {
		visible,
		setVisible,
		isEdit,
		setIsEdit,
		row,
		setRow,
		data,
		setData,
		addOrUpdateTask,
		deleteTask,
		toggleProgress,
	};
};
