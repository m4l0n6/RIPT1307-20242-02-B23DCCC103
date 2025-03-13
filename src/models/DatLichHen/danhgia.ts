import React, { useState, useCallback } from 'react';
import { Employee, Review } from '@/services/DatLichHen/DanhGia/typing';

export default () => {
    const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Nguyễn Văn A', service: 'Lễ tân', reviews: [] },
    { id: 2, name: 'Trần Thị B', service: 'Phục vụ', reviews: [] },
    { id: 3, name: 'Phạm Văn C', service: 'Đầu bếp', reviews: [] },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [response, setResponse] = useState<{ [key: number]: string }>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editResponseIndex, setEditResponseIndex] = useState<number | null>(null);

  // Search states
  const [nameSearch, setNameSearch] = useState<string>('');
  const [serviceSearch, setServiceSearch] = useState<string>('');
  const [ratingSearch, setRatingSearch] = useState<string>('');

  // Helper functions
  const getCurrentDate = useCallback(() => {
    const now = new Date();
    return now.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const getAverageRating = useCallback((employee: Employee) => {
    if (employee.reviews.length === 0) return 0;
    const avg = employee.reviews.reduce((sum, review) => sum + review.rating, 0) / employee.reviews.length;
    return parseFloat(avg.toFixed(1));
  }, []);

  const getAverageRatingDisplay = useCallback((employee: Employee) => {
    if (employee.reviews.length === 0) return 'Chưa có đánh giá';
    return getAverageRating(employee).toString();
  }, [getAverageRating]);

  // Actions
  const closeModal = useCallback(() => {
    setVisible(false);
    setRating(0);
    setComment('');
    setResponse({});
    setEditIndex(null);
    setEditResponseIndex(null);
  }, []);

  const openReviewModal = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setVisible(true);
  }, []);

  const submitReview = useCallback(() => {
    if (!selectedEmployee || rating === 0 || comment.trim() === '') return;

    setEmployees(prevEmployees => 
      prevEmployees.map(emp =>
        emp.id === selectedEmployee.id
          ? {
              ...emp,
              reviews:
                editIndex !== null
                  ? emp.reviews.map((rev, i) =>
                      i === editIndex ? { ...rev, rating, comment, date: getCurrentDate() } : rev
                    )
                  : [...emp.reviews, { rating, comment, date: getCurrentDate() }],
            }
          : emp
      )
    );

    closeModal();
  }, [selectedEmployee, rating, comment, editIndex, getCurrentDate, closeModal]);

  const editReview = useCallback((index: number) => {
    if (!selectedEmployee) return;
    const review = selectedEmployee.reviews[index];
    setRating(review.rating);
    setComment(review.comment);
    setEditIndex(index);
  }, [selectedEmployee]);

  const submitResponse = useCallback((index: number) => {
    if (!selectedEmployee || !response[index]?.trim()) return;

    setEmployees(prevEmployees => 
      prevEmployees.map(emp =>
        emp.id === selectedEmployee.id
          ? {
              ...emp,
              reviews: emp.reviews.map((rev, i) => 
                i === index ? { ...rev, response: response[index] } : rev
              ),
            }
          : emp
      )
    );

    setResponse(prev => ({ ...prev, [index]: '' }));
    setEditResponseIndex(null);
    closeModal();
  }, [selectedEmployee, response, closeModal]);

  const editReviewResponse = useCallback((index: number) => {
    if (!selectedEmployee) return;
    const currentResponse = selectedEmployee.reviews[index].response || '';
    setResponse(prev => ({ ...prev, [index]: currentResponse }));
    setEditResponseIndex(index);
  }, [selectedEmployee]);

  // Filtered employees
  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = employee.name.toLowerCase().includes(nameSearch.toLowerCase());
    const serviceMatch = employee.service.toLowerCase().includes(serviceSearch.toLowerCase());

    let ratingMatch = true;
    if (ratingSearch.trim() !== '') {
      const avgRating = getAverageRating(employee);
      ratingMatch = avgRating.toString().includes(ratingSearch);
    }

    return nameMatch && serviceMatch && ratingMatch;
  });

  return {
    // State
    employees,
    selectedEmployee,
    visible,
    rating,
    comment,
    response,
    editIndex,
    editResponseIndex,
    nameSearch,
    serviceSearch,
    ratingSearch,
    filteredEmployees,
    
    // Getters
    getAverageRating,
    getAverageRatingDisplay,
    getCurrentDate,
    
    // Setters
    setRating,
    setComment,
    setResponse,
    setNameSearch,
    setServiceSearch,
    setRatingSearch,
    
    // Actions
    closeModal,
    openReviewModal,
    submitReview,
    editReview,
    submitResponse,
    editReviewResponse
  };
}