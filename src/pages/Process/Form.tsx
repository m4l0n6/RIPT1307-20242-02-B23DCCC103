import { Form, Input, Button } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';

const FormProcess = () => {
	const { row, isEdit, setVisible, addOrUpdateTask } = useModel('process');
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			name: row?.name || '',
			note: row?.note || '',
			content: row?.content || '',
		});
	}, [row, form]);

	const handleSubmit = (values: any) => {
		const taskData = {
			id: row?.id || Date.now(),
			name: values.name,
			note: values.note,
			content: values.content,
			progress: row?.progress || false,
			time: row?.time || 0,
		};

		addOrUpdateTask(taskData);
		setVisible(false);
	};

	return (
		<Form form={form} onFinish={handleSubmit}>
			<Form.Item name='name' label='Tên môn học' rules={[{ required: true, message: 'Vui lòng nhập tên môn học' }]}>
				<Input type='text' placeholder='Nhập tên môn học ...' />
			</Form.Item>
			<Form.Item name='content' label='Nội dung' rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
				<Input type='text' placeholder='Nhập nội dung'></Input>
			</Form.Item>
			<Form.Item name='note' label='Ghi chú' rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}>
				<Input.TextArea placeholder='Nhập ghi chú ...' />
			</Form.Item>
			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Sửa' : 'Thêm mới'}
				</Button>
				<Button
					onClick={() => {
						setVisible(false);
						form.resetFields();
					}}
				>
					Thoát
				</Button>
			</div>
		</Form>
	);
};

export default FormProcess;
