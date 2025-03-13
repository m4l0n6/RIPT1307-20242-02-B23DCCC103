import { useState } from 'react';
import { List, Modal, Rate, Input, Button, Typography, Row, Col, Card, Avatar, Divider, Tag } from 'antd';
import { EditOutlined, MessageOutlined, StarOutlined, UserOutlined, ToolOutlined, StarFilled } from '@ant-design/icons';
import { useModel } from 'umi';
const { TextArea } = Input;
const { Title, Text } = Typography;

const DanhGiaDichVu = () => {
	const {
		// State
		selectedEmployee,
		visible,
		rating,
		comment,
		response,
		editIndex,
		editResponseIndex,
		nameSearch,
		serviceSearch,
		ratingSearch,
		filteredEmployees,

		// Getters
		getAverageRating,
		getAverageRatingDisplay,

		// Setters
		setRating,
		setComment,
		setResponse,
		setNameSearch,
		setServiceSearch,
		setRatingSearch,

		// Actions
		closeModal,
		openReviewModal,
		submitReview,
		editReview,
		submitResponse,
		editReviewResponse,
	} = useModel('DatLichHen.danhgia');

	const renderStars = (starRating: number) => {
		return (
			<div>
				{[...Array(5)].map((_, index) => (
					<StarFilled
						key={index}
						style={{
							color: index < starRating ? '#fadb14' : '#e8e8e8',
							fontSize: '16px',
							marginRight: '2px',
						}}
					/>
				))}
			</div>
		);
	};

	return (
		<div style={{ padding: 20, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
			<Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
				Đánh Giá Nhân Viên
			</Title>

			{/* Tách thành 3 trường tìm kiếm riêng biệt */}
			<Row gutter={16} style={{ marginBottom: 20 }}>
				<Col xs={24} sm={8}>
					<Input
						placeholder='Tìm theo tên nhân viên'
						prefix={<UserOutlined />}
						value={nameSearch}
						onChange={(e) => setNameSearch(e.target.value)}
						allowClear
					/>
				</Col>
				<Col xs={24} sm={8}>
					<Input
						placeholder='Tìm theo dịch vụ'
						prefix={<ToolOutlined />}
						value={serviceSearch}
						onChange={(e) => setServiceSearch(e.target.value)}
						allowClear
					/>
				</Col>
				<Col xs={24} sm={8}>
					<Input
						placeholder='Tìm theo điểm trung bình'
						prefix={<StarOutlined />}
						value={ratingSearch}
						onChange={(e) => setRatingSearch(e.target.value)}
						allowClear
					/>
				</Col>
			</Row>

			{/* Danh sách nhân viên với giao diện card */}
			<Row gutter={[16, 16]}>
				{filteredEmployees.map((employee) => (
					<Col xs={24} sm={12} md={8} key={employee.id}>
						<Card
							hoverable
							onClick={() => openReviewModal(employee)}
							style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Avatar size={64} style={{ backgroundColor: '#ff4d4f' }}>
									{employee.name.charAt(0)}
								</Avatar>
								<div style={{ marginLeft: 16 }}>
									<Title level={4} style={{ margin: 0 }}>
										{employee.name}
									</Title>
									<Tag color='blue'>{employee.service}</Tag>
									<div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
										{employee.reviews.length > 0 ? (
											<>
												{renderStars(getAverageRating(employee))}
												<Text style={{ marginLeft: 8 }}>
													({getAverageRatingDisplay(employee)}) - {employee.reviews.length} đánh giá
												</Text>
											</>
										) : (
											<Text type='secondary'>Chưa có đánh giá</Text>
										)}
									</div>
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			{/* Modal đánh giá đã được làm đẹp */}
			<Modal
				title={
					<div style={{ textAlign: 'center' }}>
						{selectedEmployee && (
							<>
								<Avatar size={64} style={{ backgroundColor: '#ff4d4f', marginBottom: 16 }}>
									{selectedEmployee.name.charAt(0)}
								</Avatar>
								<Title level={3} style={{ margin: 0 }}>
									{selectedEmployee?.name}
								</Title>
								<Tag color='blue' style={{ margin: '8px 0' }}>
									{selectedEmployee?.service}
								</Tag>
								{selectedEmployee.reviews.length > 0 && (
									<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										{renderStars(getAverageRating(selectedEmployee))}
										<Text style={{ marginLeft: 8 }}>({getAverageRatingDisplay(selectedEmployee)})</Text>
									</div>
								)}
							</>
						)}
					</div>
				}
				visible={visible}
				onCancel={closeModal}
				footer={null}
				width={800}
				bodyStyle={{ padding: '20px' }}
				centered
			>
				<Card style={{ marginBottom: 20, borderRadius: 8 }}>
					<Title level={4}>Đánh giá của bạn</Title>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
						<div>
							<Text>Mức độ hài lòng:</Text>
							<Rate allowHalf onChange={setRating} value={rating} style={{ marginLeft: 10 }} />
						</div>
						<TextArea
							rows={4}
							placeholder='Nhập nhận xét chi tiết của bạn...'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							style={{ borderRadius: 4 }}
						/>
						<Button
							type='primary'
							onClick={submitReview}
							disabled={rating === 0 || comment.trim() === ''}
							style={{ alignSelf: 'flex-end', borderRadius: 4 }}
						>
							{editIndex !== null ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}
						</Button>
					</div>
				</Card>

				{/* Hiển thị đánh giá cũ */}
				{selectedEmployee?.reviews.length ? (
					<div>
						<Title level={4} style={{ marginBottom: 16 }}>
							Đánh giá trước đó
						</Title>
						<List
							itemLayout='vertical'
							dataSource={selectedEmployee.reviews}
							renderItem={(review, index) => (
								<Card
									style={{
										marginBottom: 16,
										borderRadius: 8,
										boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
									}}
								>
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
										<div>
											{renderStars(review.rating)}
											<Text type='secondary' style={{ display: 'block', marginTop: 4 }}>
												{review.date || 'Không có ngày'}
											</Text>
										</div>
										<Button icon={<EditOutlined />} size='small' type='text' onClick={() => editReview(index)} />
									</div>

									<Text style={{ display: 'block', margin: '12px 0' }}>{review.comment}</Text>

									<Divider style={{ margin: '12px 0' }} />

									{review.response && editResponseIndex !== index ? (
										<div style={{ background: '#f6ffed', padding: 12, borderRadius: 4, marginTop: 8 }}>
											<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
												<Text strong style={{ color: '#52c41a' }}>
													Phản hồi:
												</Text>
												<Button
													icon={<EditOutlined />}
													size='small'
													type='text'
													onClick={() => editReviewResponse(index)}
												/>
											</div>
											<Text style={{ display: 'block', marginTop: 8 }}>{review.response}</Text>
										</div>
									) : (
										<div style={{ marginTop: 8 }}>
											<Input
												placeholder='Nhập phản hồi cho đánh giá này...'
												value={response[index] || ''}
												onChange={(e) => setResponse({ ...response, [index]: e.target.value })}
												style={{ borderRadius: 4 }}
											/>
											<Button
												type='primary'
												ghost
												icon={<MessageOutlined />}
												onClick={() => submitResponse(index)}
												style={{ marginTop: 8, borderRadius: 4 }}
												disabled={!response[index]?.trim()}
											>
												{editResponseIndex === index ? 'Cập nhật phản hồi' : 'Gửi phản hồi'}
											</Button>
										</div>
									)}
								</Card>
							)}
						/>
					</div>
				) : (
					<div style={{ textAlign: 'center', padding: 20 }}>
						<StarOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
						<Text style={{ display: 'block', marginTop: 16, fontStyle: 'italic' }}>
							Chưa có đánh giá nào cho nhân viên này.
						</Text>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default DanhGiaDichVu;
