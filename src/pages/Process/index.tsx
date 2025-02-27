import { Card, Button, Tag, Progress, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import FormProcess from './Form';
import './components/style.less';
import { useModel } from 'umi';

const Process = () => {
	const { data, setVisible, setRow, isEdit, setIsEdit, visible, deleteTask, toggleProgress } = useModel('process');
	return (
		<div style={{ padding: 20, background: '#fff', borderRadius: '10px' }}>
			<h1>Tiến độ học tập</h1>
			<p style={{ fontStyle: 'italic' }}>Bạn cần phải học 30 phút mỗi ngày cho mỗi môn học</p>
			<div>
				<Button
					type='primary'
					style={{ borderRadius: '5px', marginBottom: '10px' }}
					onClick={(e) => {
						setRow(undefined);
						setVisible(true);
						setIsEdit(false);
					}}
				>
					Thêm mới
				</Button>
			</div>
			<div>
				{data.map((item) => (
					<Card title={item.name} style={{ borderRadius: '10px', position: 'relative', marginBottom: '10px' }}>
						<div style={{ position: 'absolute', top: 15, right: 10 }}>
							<EditOutlined
								style={{ fontSize: '18px', padding: '5px', borderRadius: '5px', marginRight: '4px', cursor: 'pointer' }}
								onClick={() => {
									setVisible(true);
									setIsEdit(true);
									setRow(item);
								}}
							/>
							<DeleteOutlined
								style={{ fontSize: '18px', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}
								onClick={() => deleteTask(item.id)}
							/>
						</div>
						<div>
							<Tag style={{ fontSize: '14px', marginBottom: '10px' }} color='red'>
								Nội dung
							</Tag>
							<table style={{ marginBottom: '10px' }}>
								<tr>
									<td style={{ width: '8%', fontWeight: 'bold', paddingRight: '10px' }}>Nội dung:</td>
									<td>{item.content}</td>
								</tr>
								<tr>
									<td style={{ fontWeight: 'bold' }}>Ghi chú:</td>
									<td>{item.note}</td>
								</tr>
							</table>
						</div>
						<div>
							<div>
								<Tag style={{ fontSize: '14px', marginBottom: '10px' }} color='red'>
									Tiến độ học tập
								</Tag>
								<Button
									type={item.progress ? 'default' : 'primary'}
									style={{ borderRadius: '5px', marginLeft: '10px' }}
									onClick={() => toggleProgress(item.id)}
								>
									{item.progress ? 'Dừng' : 'Bắt đầu học'}
								</Button>
							</div>
							<Progress status='active' percent={Math.floor((item.time / 60 / 30) * 100)} />
							<p style={{ color: 'gray' }}>Thời gian học ngày này: {Math.floor(item.time / 60)} phút</p>
							{item.progress && <p style={{ color: 'green' }}>Đang học...</p>}
						</div>
					</Card>
				))}
			</div>
			<Modal
				destroyOnClose
				footer={false}
				visible={visible}
				onOk={() => {}}
				onCancel={() => {
					setRow(undefined);
					setVisible(false);
				}}
				title={isEdit ? 'Sửa môn học' : 'Thêm môn học'}
			>
				<FormProcess></FormProcess>
			</Modal>
		</div>
	);
};

export default Process;
