import { Button, Modal, Table } from 'antd';
import type { IColumn } from '@/components/Table/typing';
import FormDatLichHen from './Form';
import { useModel } from 'umi';

const QuanLyLichHen = () => {
	const { visible, setVisible, setRow, setIsEdit, handleDelete, isEdit, bookList } =
		useModel('DatLichHen.quanlylichhen');

	const columns: IColumn<Book.Record>[] = [
		{
			title: 'Tên khách hàng',
			dataIndex: 'name',
			key: 'name',
			width: 200,
			align: 'center',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: 'phone',
			width: 200,
			align: 'center',
		},
		{
			title: 'Dịch vụ',
			dataIndex: 'service',
			key: 'service',
			width: 200,
			align: 'center',
		},
		{
			title: 'Nhân viên',
			dataIndex: 'staff',
			key: 'staff',
			width: 200,
			align: 'center',
		},
		{
			title: 'Thời gian',
			dataIndex: 'calendar',
			key: 'calendar',
			width: 200,
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
	return (
		<div>
			<h1>Quản lý lịch hẹn</h1>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
				<Button
					type='primary'
					onClick={() => {
						setVisible(true);
						setIsEdit(false);
					}}
					style={{ marginRight: '10px' }}
				>
					Tạo lịch hẹn mới
				</Button>
				<Button type='primary'>Xem lịch</Button>
			</div>
			<Table columns={columns} dataSource={bookList} />
			<Modal
				destroyOnClose
				footer={false}
				visible={visible}
				onCancel={() => setVisible(false)}
				onOk={() => {}}
				title={isEdit ? 'Sửa lịch hẹn' : 'Tạo lịch hẹn'}
				style={{ width: '50%' }}
			>
				<FormDatLichHen />
			</Modal>
		</div>
	);
};

export default QuanLyLichHen;
