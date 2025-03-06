import React, { useState } from 'react';
import { Button, Form, InputNumber, Select, ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN'; // Locale tiếng Việt
import enUS from 'antd/es/locale/en_US'; // Locale tiếng Anh

const { Option } = Select;

const TaoDeThi = () => {
	const [locale, setLocale] = useState(viVN); // Mặc định tiếng Việt
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log('Dữ liệu từ form:', values);
	};

	return (
		<ConfigProvider locale={locale}>
			<div style={{ padding: 20, maxWidth: 600, margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: 8 }}>
				<h2 style={{ textAlign: 'center', marginBottom: 20 }}>Tạo Đề Thi</h2>
				<Form form={form} onFinish={onFinish} layout='vertical'>
					<Form.Item label='Môn học' name='subject' rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}>
						<Select placeholder='Chọn môn học'>
							<Option value='Toán'>Toán</Option>
							<Option value='Lý'>Lý</Option>
						</Select>
					</Form.Item>

					<Form.Item label='Số câu Dễ' name='easy'>
						<InputNumber min={0} placeholder='0' style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item label='Số câu Trung bình' name='medium'>
						<InputNumber min={0} placeholder='0' style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item label='Số câu Khó' name='hard'>
						<InputNumber min={0} placeholder='0' style={{ width: '100%' }} />
					</Form.Item>

					<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
						Tạo đề thi
					</Button>
				</Form>
			</div>
		</ConfigProvider>
	);
};

export default TaoDeThi;
