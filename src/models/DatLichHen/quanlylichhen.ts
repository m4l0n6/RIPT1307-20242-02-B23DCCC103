import { useEffect, useState } from 'react';



export default () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [row, setRow] = useState<Book.Record>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [bookList, setBookList] = useState<Book.Record[]>([]);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('book') || '[]');
        setBookList(savedData);
    }, [])

    useEffect(() => {
        localStorage.setItem('book', JSON.stringify(bookList));
    }, [bookList]);

    const addOrUpdateBook = (book: Book.Record) => {
        if (isEdit) {
            const updateBook = bookList.map((item) => {
                if (row && item.id === row.id) {
                    return { ...item, ...book };
                }
                return item;
            });
            setBookList(updateBook);
        } else {
            setBookList([...bookList, { ...book, id: Date.now() }]);
        }
    }

    const handleDelete = (id: number) => {
        setBookList(bookList.filter((q) => q.id !== id));
    }

    return{
        visible,
        setVisible,
        isEdit,
        setIsEdit,
        row,
        setRow,
        bookList,
        setBookList,
        addOrUpdateBook,
        handleDelete
    }
}