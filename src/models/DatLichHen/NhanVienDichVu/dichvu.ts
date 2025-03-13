import React, { useState } from 'react';
import { Service } from '@/services/DatLichHen/NhanVienDichVu/DichVu/typing';
import { message } from 'antd';

export default () => {
    	
	const [services, setServices] = useState<Service[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	

	const removeService = (index: number) => {
		const updatedServices = services.filter((_, i) => i !== index);
		setServices(updatedServices);
		message.warning('Dịch vụ đã bị xoá!');
	};

    return {
        services,
        isModalOpen,
        setIsModalOpen,
        removeService
    }
}