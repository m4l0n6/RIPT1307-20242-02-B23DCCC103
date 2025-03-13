import { Form, Input, Select, Button } from 'antd';
import { useModel } from 'umi';

const FormCauhoi = () => {
	const [form] = Form.useForm();
	const { setVisible, addOrUpdateQuestion, row, isEdit, courses, filteredKnowledgeBlocks, filterKnowledgeBlocks } =
		useModel('QuanLy.cauhoi');

	const handleSubmit = (values: {
		question_content: string;
		question_subject: string;
		question_level: string;
		question_knowledge: string;
	}) => {
		const newQuestion = {
			id: isEdit && row ? row.id : Date.now(),
			question_content: values.question_content,
			question_subject: values.question_subject,
			question_knowledge: values.question_knowledge,
			question_level: values.question_level,
		};

		addOrUpdateQuestion(newQuestion);
		setVisible(false);
		form.resetFields();
	};

	return (
		<Form form={form} onFinish={handleSubmit} layout='vertical'>
			<Form.Item
				initialValue={isEdit ? row?.question_content : ''}
				name='question_content'
				label='Nội dung'
				rules={[{ required: true, message: 'Nhập nội dung câu hỏi!' }]}
			>
				<Input.TextArea placeholder='Nhập nội dung câu hỏi ...' />
			</Form.Item>
			<Form.Item
				initialValue={isEdit ? row?.question_subject : ''}
				name='question_subject'
				label='Môn học'
				rules={[{ required: true, message: 'Chọn môn học câu hỏi!' }]}
			>
				<Select onChange={filterKnowledgeBlocks}>
					{courses.map((course) => (
						<Select.Option key={course.id} value={course.name}>
							{course.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item
				initialValue={isEdit ? row?.question_level : ''}
				name='question_level'
				label='Mức độ'
				rules={[{ required: true, message: 'Chọn mức độ câu hỏi!' }]}
			>
				<Select>
					<Select.Option value='Dễ'>Dễ</Select.Option>
					<Select.Option value='Vừa'>Vừa</Select.Option>
					<Select.Option value='Khó'>Khó</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item
				initialValue={isEdit ? row?.question_knowledge : ''}
				name='question_knowledge'
				label='Kiến thức'
				rules={[{ required: true, message: 'Chọn kiến thức câu hỏi!' }]}
			>
				<Select>
					{filteredKnowledgeBlocks.map((block, index) => (
						<Select.Option key={index} value={block}>
							{block}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<div className='form-footer'>
				<Button onClick={() => setVisible(false)}>Hủy</Button>
				<Button type='primary' htmlType='submit'>
					{isEdit ? 'Sửa' : 'Thêm'}
				</Button>
			</div>
		</Form>
	);
};

export default FormCauhoi;
