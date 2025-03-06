import { useEffect, useState } from 'react';
import { message} from 'antd';


export default () => {
    const [courses, setCourses] = useState<Course.Record[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<Course.Record[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [newCourse, setNewCourse] = useState<Course.Record>({ id: 0, code: '', name: '', credits: 0, knowledgeBlocks: [] });
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [editingCourse, setEditingCourse] = useState<Course.Record | null>(null);
	const [newKnowledgeBlock, setNewKnowledgeBlock] = useState('');

	useEffect(() => {
		const storedCourses = localStorage.getItem('courses');
		if (storedCourses) {
			const parsedCourses = JSON.parse(storedCourses);
			setCourses(parsedCourses);
			setFilteredCourses(parsedCourses);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('courses', JSON.stringify(courses));
		setFilteredCourses(
			courses.filter(
				(c) =>
					c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					c.code.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		);
	}, [courses, searchTerm]);

	const handleAddKnowledgeBlock = () => {
		if (newKnowledgeBlock.trim()) {
			setNewCourse((prev) => ({ ...prev, knowledgeBlocks: [...prev.knowledgeBlocks, newKnowledgeBlock.trim()] }));
			setNewKnowledgeBlock('');
		}
	};

	const handleAddKnowledgeBlockEdit = () => {
		if (newKnowledgeBlock.trim() && editingCourse) {
			setEditingCourse((prev) => ({
				...prev!,
				knowledgeBlocks: [...prev!.knowledgeBlocks, newKnowledgeBlock.trim()],
			}));
			setNewKnowledgeBlock('');
		}
	};

	const handleDeleteKnowledgeBlock = (index: number) => {
		if (editingCourse) {
			const updatedBlocks = editingCourse.knowledgeBlocks.filter((_, i) => i !== index);
			setEditingCourse({ ...editingCourse, knowledgeBlocks: updatedBlocks });
		}
	};

	const handleAddCourse = () => {
		if (!newCourse.code || !newCourse.name || newCourse.credits <= 0) {
			message.error('Vui lòng nhập đầy đủ thông tin hợp lệ!');
			return;
		}

		const updatedCourses = [...courses, { ...newCourse, id: Date.now() }];
		setCourses(updatedCourses);
		setNewCourse({ id: 0, code: '', name: '', credits: 0, knowledgeBlocks: [] });
		setAddModalVisible(false);
		message.success('Đã thêm môn học!');
	};

	const handleEditCourse = (course: Course.Record) => {
		setEditingCourse(course);
		setEditModalVisible(true);
	};

	const handleUpdateCourse = () => {
		if (!editingCourse) return;

		setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? editingCourse : c)));
		setEditModalVisible(false);
		setEditingCourse(null);
		setNewKnowledgeBlock(''); // Reset newKnowledgeBlock khi đóng modal
		message.success('Đã cập nhật môn học!');
	};

	const handleDeleteCourse = (id: number) => {
		const updatedCourses = courses.filter((c) => c.id !== id);
		setCourses(updatedCourses);
		message.success('Đã xóa môn học!');
	};

    return {
        courses,
        setCourses,
        filteredCourses,
        setFilteredCourses,
        searchTerm,
        setSearchTerm,
        newCourse,
        setNewCourse,
        addModalVisible,
        setAddModalVisible,
        editModalVisible,
        setEditModalVisible,
        editingCourse,
        setEditingCourse,
        newKnowledgeBlock,
        setNewKnowledgeBlock,
        handleAddKnowledgeBlock,
        handleAddKnowledgeBlockEdit,
        handleDeleteKnowledgeBlock,
        handleAddCourse,
        handleEditCourse,
        handleUpdateCourse,
        handleDeleteCourse
    }
}