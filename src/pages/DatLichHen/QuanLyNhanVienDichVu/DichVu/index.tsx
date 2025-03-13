import { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, List, message, Modal } from 'antd';

interface Service {
	name: string;
	description: string;
	price: number;
	duration: number;
}

const DichVu = () => {
	const [form] = Form.useForm();
	const [services, setServices] = useState<Service[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onFinish = (values: Service) => {
		setServices([...services, values]);
		form.resetFields();
		message.success('Dịch vụ đã được thêm!');
		setIsModalOpen(false);
	};

	const removeService = (index: number) => {
		const updatedServices = services.filter((_, i) => i !== index);
		setServices(updatedServices);
		message.warning('Dịch vụ đã bị xoá!');
	};

	return (
		<div className='flex flex-col items-center bg-gray-100 p-4 min-h-screen'>
			<Button type='primary' onClick={() => setIsModalOpen(true)} className='mb-4'>
				Thêm Nhiệm Vụ
			</Button>

			<Modal title='Thêm Dịch Vụ' visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
				<Form form={form} layout='vertical' onFinish={onFinish}>
					<Form.Item
						label='Tên dịch vụ'
						name='name'
						rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
					>
						<Input placeholder='Nhập tên dịch vụ' />
					</Form.Item>

					<Form.Item
						label='Mô tả'
						name='description'
						rules={[{ required: true, message: 'Vui lòng nhập mô tả dịch vụ!' }]}
					>
						<Input.TextArea placeholder='Nhập mô tả dịch vụ' rows={3} />
					</Form.Item>

					<Form.Item label='Giá (VNĐ)' name='price' rules={[{ required: true, message: 'Vui lòng nhập giá dịch vụ!' }]}>
						<InputNumber className='w-full' min={0} step={1000} placeholder='Nhập giá dịch vụ' />
					</Form.Item>

					<Form.Item
						label='Thời gian thực hiện (phút)'
						name='duration'
						rules={[{ required: true, message: 'Vui lòng nhập thời gian thực hiện!' }]}
					>
						<InputNumber className='w-full' min={1} step={5} placeholder='Nhập thời gian thực hiện' />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' className='w-full'>
							Thêm Dịch Vụ
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			<Card title='Danh Sách Dịch Vụ' className='shadow-lg w-full max-w-lg'>
				<List
					dataSource={services}
					renderItem={(service, index) => (
						<List.Item
							actions={[
								<Button type='link' danger onClick={() => removeService(index)}>
									Xoá
								</Button>,
							]}
						>
							<List.Item.Meta
								title={`${service.name} - ${service.price} VNĐ`}
								description={`${service.description} (Thời gian: ${service.duration} phút)`}
							/>
						</List.Item>
					)}
				/>
			</Card>
		</div>
	);
};

export default DichVu;
