import { Button, Input, Table, Modal, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const MonHoc = () => {
	const {
		filteredCourses,
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
		handleDeleteCourse,
	} = useModel('QuanLy.monhoc');

	return (
		<div style={{ padding: 20 }}>
			<h2>Quản lý Môn Học</h2>
			<Input
				placeholder='Tìm kiếm theo mã hoặc tên'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ marginBottom: 16 }}
			/>
			<Button type='primary' onClick={() => setAddModalVisible(true)} style={{ marginBottom: 16 }}>
				<PlusOutlined /> Thêm Môn Học
			</Button>
			<Table
				dataSource={filteredCourses}
				columns={[
					{ title: 'Mã Môn', dataIndex: 'code', key: 'code' },
					{ title: 'Tên Môn', dataIndex: 'name', key: 'name' },
					{ title: 'Số Tín Chỉ', dataIndex: 'credits', key: 'credits' },
					{
						title: 'Khối Kiến Thức',
						dataIndex: 'knowledgeBlocks',
						key: 'knowledgeBlocks',
						render: (blocks: string[]) => blocks.map((block, index) => <Tag key={index}>{block}</Tag>),
					},
					{
						title: 'Hành động',
						key: 'actions',
						render: (_, record) => (
							<>
								<Button icon={<EditOutlined />} onClick={() => handleEditCourse(record)} style={{ marginRight: 8 }} />
								<Popconfirm title='Bạn có chắc chắn muốn xóa?' onConfirm={() => handleDeleteCourse(record.id)}>
									<Button icon={<DeleteOutlined />} danger />
								</Popconfirm>
							</>
						),
					},
				]}
				rowKey='id'
			/>
			{/* Modal Thêm Môn Học */}
			<Modal
				title='Thêm Môn Học'
				visible={addModalVisible}
				onOk={handleAddCourse}
				onCancel={() => setAddModalVisible(false)}
			>
				<Input
					placeholder='Mã Môn'
					value={newCourse.code}
					onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
					style={{ marginBottom: 8 }}
				/>
				<Input
					placeholder='Tên Môn'
					value={newCourse.name}
					onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
					style={{ marginBottom: 8 }}
				/>
				<Input
					type='number'
					placeholder='Số Tín Chỉ'
					value={newCourse.credits}
					onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
					style={{ marginBottom: 8 }}
				/>
				<div style={{ display: 'flex', gap: '8px', marginBottom: 8 }}>
					<Input
						placeholder='Thêm Khối Kiến Thức'
						value={newKnowledgeBlock}
						onChange={(e) => setNewKnowledgeBlock(e.target.value)}
					/>
					<Button onClick={handleAddKnowledgeBlock}>Thêm</Button>
				</div>
				<div>
					{newCourse.knowledgeBlocks.map((block, index) => (
						<Tag
							key={index}
							closable
							onClose={() =>
								setNewCourse({
									...newCourse,
									knowledgeBlocks: newCourse.knowledgeBlocks.filter((_, i) => i !== index),
								})
							}
						>
							{block}
						</Tag>
					))}
				</div>
			</Modal>
			{/* Modal Chỉnh Sửa Môn Học */}
			<Modal
				title='Chỉnh Sửa Môn Học'
				visible={editModalVisible}
				onOk={handleUpdateCourse}
				onCancel={() => setEditModalVisible(false)}
			>
				{editingCourse && (
					<>
						<Input
							placeholder='Mã Môn'
							value={editingCourse.code}
							onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
							style={{ marginBottom: 8 }}
						/>
						<Input
							placeholder='Tên Môn'
							value={editingCourse.name}
							onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
							style={{ marginBottom: 8 }}
						/>
						<Input
							type='number'
							placeholder='Số Tín Chỉ'
							value={editingCourse.credits}
							onChange={(e) => setEditingCourse({ ...editingCourse, credits: Number(e.target.value) })}
							style={{ marginBottom: 8 }}
						/>

						<div style={{ display: 'flex', gap: '8px', marginBottom: 10 }}>
							<Input
								placeholder='Thêm Khối Kiến Thức'
								value={newKnowledgeBlock}
								onChange={(e) => setNewKnowledgeBlock(e.target.value)}
							/>
							<Button onClick={handleAddKnowledgeBlockEdit}>Thêm</Button>
						</div>
						<div style={{}}>
							{editingCourse.knowledgeBlocks.map((block, index) => (
								<Tag key={index} closable onClose={() => handleDeleteKnowledgeBlock(index)}>
									{block}
								</Tag>
							))}
						</div>
					</>
				)}
			</Modal>
		</div>
	);
};

export default MonHoc;
