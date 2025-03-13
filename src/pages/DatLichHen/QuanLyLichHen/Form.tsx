import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import { useState } from 'react';
import { CalendarOutlined, UserOutlined, PhoneOutlined, ToolOutlined, TeamOutlined } from '@ant-design/icons';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useModel } from 'umi';
import { format } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const { RangePicker } = DatePicker;
const localizer = momentLocalizer(moment);

const FormDatLichHen = () => {
	const [form] = Form.useForm();
	const [isShowCalendar, setIsShowCalendar] = useState(false);
	const { isEdit, row, addOrUpdateBook, setVisible, bookList } = useModel('DatLichHen.quanlylichhen');

	const events = bookList.map((item) => {
		// Giả sử calendar được lưu dưới dạng "startDate to endDate"
		const [startStr, endStr] = item.calendar.split(' to ');
		return {
			title: `${item.name} - ${item.service}`,
			start: new Date(startStr),
			end: new Date(endStr),
			key: item.id,
		};
	});

	const handleSubmit = (values: any) => {
		try {
			// Kiểm tra xem calendar có được chọn không
			if (!values.calendar || !values.calendar[0] || !values.calendar[1]) {
				message.error('Vui lòng chọn thời gian');
				return;
			}

			// Lấy đối tượng Date từ values.calendar
			const start = new Date(values.calendar[0]);
			const end = new Date(values.calendar[1]);

			// Format theo định dạng dd/MM/yyyy HH:mm
			const formatDateTime = (date: Date) => format(date, 'dd/MM/yyyy HH:mm');

			const calendarString = `${formatDateTime(start)} - ${formatDateTime(end)}`;

			// Tạo đối tượng dữ liệu theo Book.Record interface
			const bookingData = {
				id: isEdit && row ? row.id : Date.now(),
				name: values.name,
				phone: values.phone,
				service: values.service,
				staff: values.staff,
				calendar: calendarString,
				createdAt: new Date().toISOString(),
			};

			console.log('Booking data:', bookingData);

			// Thêm hoặc cập nhật đặt lịch
			addOrUpdateBook(bookingData);

			// Thông báo thành công
			message.success(isEdit ? 'Cập nhật lịch hẹn thành công' : 'Đặt lịch hẹn thành công');

			// Đóng form và reset fields
			if (setVisible) {
				setVisible(false);
			}
			form.resetFields();
		} catch (error) {
			console.error('Lỗi khi đặt lịch:', error);
			message.error('Có lỗi xảy ra khi đặt lịch');
		}
	};

	return (
		<div style={{ padding: '0 16px' }}>
			<Form
				form={form}
				layout='vertical'
				style={{ width: '100%' }}
				requiredMark='optional'
				size='large'
				onFinish={handleSubmit}
			>
				<Form.Item
					initialValue={isEdit ? row?.name : ''}
					name='name'
					label='Tên khách hàng'
					rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
				>
					<Input
						placeholder='Nhập tên khách hàng'
						prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
						style={{ borderRadius: '6px' }}
					/>
				</Form.Item>

				<Form.Item
					initialValue={isEdit ? row?.phone : ''}
					name='phone'
					label='Số điện thoại'
					rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
				>
					<Input
						placeholder='Nhập số điện thoại'
						prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />}
						style={{ borderRadius: '6px' }}
					/>
				</Form.Item>

				<Form.Item
					initialValue={isEdit ? row?.service : ''}
					name='service'
					label='Dịch vụ'
					rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}
				>
					<Select
						placeholder='Chọn dịch vụ'
						suffixIcon={<ToolOutlined style={{ color: '#bfbfbf' }} />}
						style={{ borderRadius: '6px' }}
					>
						<Select.Option value='dv1'>Dịch vụ 1</Select.Option>
						<Select.Option value='dv2'>Dịch vụ 2</Select.Option>
						<Select.Option value='dv3'>Dịch vụ 3</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					initialValue={isEdit ? row?.staff : ''}
					name='staff'
					label='Nhân viên'
					rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
				>
					<Select
						placeholder='Chọn nhân viên'
						suffixIcon={<TeamOutlined style={{ color: '#bfbfbf' }} />}
						style={{ borderRadius: '6px' }}
					>
						<Select.Option value='nv1'>Nhân viên 1</Select.Option>
						<Select.Option value='nv2'>Nhân viên 2</Select.Option>
						<Select.Option value='nv3'>Nhân viên 3</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					name='calendar'
					label='Chọn thời gian'
					rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
				>
					<div style={{ display: 'flex', gap: '8px' }}>
						<RangePicker
							showTime
							style={{ width: '100%', borderRadius: '6px' }}
							placeholder={['Bắt đầu', 'Kết thúc']}
							format='DD/MM/YYYY HH:mm'
							// Chỉ định getValueProps để chuyển đổi giá trị
						/>
						{isEdit ? (
							''
						) : (
							<Button
								type={isShowCalendar ? 'default' : 'primary'}
								icon={<CalendarOutlined />}
								onClick={() => setIsShowCalendar(!isShowCalendar)}
								style={{ borderRadius: '6px', flexShrink: 0 }}
							>
								{isShowCalendar ? 'Ẩn lịch' : 'Xem lịch'}
							</Button>
						)}
					</div>
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						size='large'
						style={{ width: '100%', borderRadius: '6px', marginTop: '8px' }}
					>
						{isEdit ? 'Cập nhật' : 'Đặt lịch'}
					</Button>
				</Form.Item>
			</Form>

			{isShowCalendar && (
				<div
					style={{
						marginTop: '16px',
						width: '100%',
						height: '400px',
						border: '1px solid #f0f0f0',
						borderRadius: '8px',
						backgroundColor: '#fff',
						padding: '16px',
						overflow: 'hidden',
					}}
				>
					<Calendar
						localizer={localizer}
						events={events}
						startAccessor='start'
						endAccessor='end'
						style={{ height: '368px' }}
						views={['month', 'week', 'day']}
						messages={{
							next: 'Sau',
							previous: 'Trước',
							today: 'Hôm nay',
							month: 'Tháng',
							week: 'Tuần',
							day: 'Ngày',
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default FormDatLichHen;
