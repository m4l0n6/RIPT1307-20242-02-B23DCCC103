import './components/style.less';
import type { IColumn } from '@/components/Table/typing';
import { Button, Modal, Table, Input } from 'antd';
import FormCauhoi from '../CauHoi/Form';
import { useModel } from 'umi';

const CauHoi = () => {
	const { visible, setVisible, questionList, handleDelete, setRow, setIsEdit, isEdit, searchQuery, setSearchQuery } =
		useModel('QuanLy.cauhoi');

	const columns: IColumn<Question.Record>[] = [
		{
			title: 'Mã câu hỏi',
			dataIndex: 'id',
			key: 'id',
			width: 200,
			align: 'center',
		},
		{
			title: 'Môn học',
			dataIndex: 'question_subject',
			key: 'question_subject',
			width: 200,
			align: 'center',
		},
		{
			title: 'Mức độ',
			dataIndex: 'question_level',
			key: 'question_level',
			width: 200,
			align: 'center',
		},
		{
			title: 'Khối kiến thức',
			dataIndex: 'question_knowledge',
			key: 'question_knowledge',
			width: 200,
			align: 'center',
		},
		{
			title: 'Nội dung',
			dataIndex: 'question_content',
			key: 'question_content',
			width: 400,
			align: 'center',
		},
		{
			title: 'Thao tác',
			key: 'actions',
			width: 200,
			align: 'center',
			render: (record) => (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						type='primary'
						onClick={() => {
							setVisible(true);
							setRow(record);
							setIsEdit(true);
						}}
					>
						Sửa
					</Button>
					<Button type='primary' danger onClick={() => handleDelete(record.id)}>
						Xóa
					</Button>
				</div>
			),
		},
	];

	const filteredQuestions = questionList.filter((question) =>
		question.question_content.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className='container'>
			<h1>Quản lý câu hỏi</h1>
			<Input
				placeholder='Tìm kiếm câu hỏi'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				style={{ marginBottom: '10px' }}
			/>
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
				}}
				style={{ marginBottom: '10px' }}
			>
				Thêm câu hỏi
			</Button>
			<Table columns={columns} dataSource={filteredQuestions} rowKey='id' />
			<Modal
				destroyOnClose
				footer={false}
				visible={visible}
				onCancel={() => setVisible(false)}
				onOk={() => {}}
				title={isEdit ? 'Sửa câu hỏi' : 'Thêm câu hỏi'}
			>
				<FormCauhoi />
			</Modal>
		</div>
	);
};

export default CauHoi;
