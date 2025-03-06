import { useEffect, useState } from 'react';

export default () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<Question.Record>();
    const [questionList, setQuestionList] = useState<Question.Record[]>([]);
    const [courses, setCourses] = useState<Course.Record[]>([]);
    const [knowledgeBlocks, setKnowledgeBlocks] = useState<string[]>([]);
    const [filteredKnowledgeBlocks, setFilteredKnowledgeBlocks] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('question') || '[]');
        setQuestionList(savedData);
    }, []);

    useEffect(() => {
        const storedCourses = localStorage.getItem('courses');
        if (storedCourses) {
            const parsedCourses: Course.Record[] = JSON.parse(storedCourses);
            setCourses(parsedCourses);
            const allKnowledgeBlocks: string[] = parsedCourses.flatMap(course => course.knowledgeBlocks);
            setKnowledgeBlocks([...new Set(allKnowledgeBlocks)]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('question', JSON.stringify(questionList));
    }, [questionList]);

    const addOrUpdateQuestion = (question: Question.Record) => {
        if (isEdit) {
            const updateQuestion = questionList.map((item) => {
                if (row && item.id === row.id) {
                    return { ...item, ...question };
                }
                return item;
            });
            setQuestionList(updateQuestion);
        } else {
            setQuestionList([...questionList, { ...question, id: Date.now() }]);
        }
    };

    const handleDelete = (id: number) => {
        setQuestionList(questionList.filter((q) => q.id !== id));
    };

    const filterKnowledgeBlocks = (courseName: string) => {
        const course = courses.find(c => c.name === courseName);
        if (course) {
            setFilteredKnowledgeBlocks(course.knowledgeBlocks);
        } else {
            setFilteredKnowledgeBlocks([]);
        }
    };

    return {
        visible,
        setVisible,
        isEdit,
        row,
        setRow,
        questionList,
        setQuestionList,
        handleDelete,
        addOrUpdateQuestion,
        setIsEdit,
        courses,
        knowledgeBlocks,
        filteredKnowledgeBlocks,
        filterKnowledgeBlocks,
        searchQuery,
        setSearchQuery
    };
};
