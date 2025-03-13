import route from "mock/route";
import path from "path";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'Todo List',
		component: './TodoList',
		icon: 'CheckSquareOutlined',
	},
	{
		path: '/guessnumber',
		name: 'Guess Number',
		component: './GuessNumber',
		icon: 'QuestionCircleOutlined',
	},
	{
		path: '/process',
		name: 'Process',
		component: './Process',
		icon: 'RiseOutlined'
	},
	{
		path: '/onetwothree',
		name: 'Oẳn tù tì ',
		component: './OneTwoThree',
		icon: 'RobotFilled'
	},
	{
		name: 'Ngân hàng câu hỏi',
		path: '/quan-ly',
		icon: '📃',
		routes: [
			{
				name: 'Môn học',
				path: 'mon-hoc',
				component: './QuanLy/MonHoc',
			}, 
			{
				name: 'Câu hỏi',
				path: 'cau-hoi',
				component: './QuanLy/CauHoi',
			},
			{
				name: 'Tạo đề thi',
				path: 'tao-de-thi',
				component: './QuanLy/TaoDeThi',
			},
			{
				name: 'Danh sách đề thi',
				path: 'danh-sach-de-thi',
				component: './QuanLy/DanhSachDeThi',
			}
		]
	},
	{
		name: "Đặt lịch hẹn",
		path: '/dat-lich-hen',
		icon: '📅',
		routes: [
			{
				name: 'Quản nhân viên và dịch vụ',
				path: 'quan-ly',
				routes: [
					{
						name: 'Quản lý nhân viên',
						path: 'nhan-vien',
						exact: true,
						component: './DatLichHen/QuanLyNhanVienDichVu/NhanVien',
					},
					{
						name: 'Quản lý dịch vụ',
						path: 'dich-vu',
						exact: true,
						component: './DatLichHen/QuanLyNhanVienDichVu/DichVu',
					}
				]
			},
			{
				name: 'Quản lý lịch hẹn',
				path: 'quan-ly-lich-hen',
				component: './DatLichHen/QuanLyLichHen',
			},
			{
				name: 'Đánh giá dịch vụ',
				path: 'danh-gia-dich-vu',
				component: './DatLichHen/DanhGiaDichVu',
			},
			{
				name: 'Thống kê',
				path: 'thong-ke',
				component: './DatLichHen/ThongKe',
			}
		]
	},
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
