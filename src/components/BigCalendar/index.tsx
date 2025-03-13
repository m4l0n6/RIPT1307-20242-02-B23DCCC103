import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './style.less';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
	{
		title: 'Sự kiện mẫu',
		start: new Date(),
		end: new Date(),
		allDay: true,
	},
];

const BigCalendar: React.FC = () => {
	return (
		<div>
			<Calendar localizer={localizer} events={events} startAccessor='start' endAccessor='end' />
		</div>
	);
};

export default BigCalendar;
