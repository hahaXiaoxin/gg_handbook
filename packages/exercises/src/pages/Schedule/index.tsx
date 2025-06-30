import React, { useCallback, useRef, useState } from "react";
import { Card, Button, List } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import "./styles.css";

// 获取当前月份的天数
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

// 获取当前月份第一天是星期几
const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};

// 获取上个月的天数
const getDaysInPrevMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
};

// 定义日历中每一格的对象实例
interface CalendarDay {
    day: number;
    isCurrentMonth: boolean;
    date: Dayjs;
}

interface Schedule {
    startDate: Dayjs;
    endDate: Dayjs;
    title: string;
    color: string;
}

const DayCell: React.FC<{
    dayInstance: CalendarDay;
    onStart: (day: CalendarDay) => void;
    onEnd: (day: CalendarDay) => void;
    scheduleList: Schedule[];
}> = ({ dayInstance, onStart, onEnd, scheduleList }) => {
    const { day, isCurrentMonth, date } = dayInstance;
    const currentDate = dayjs();

    const isToday = currentDate.date() === day && currentDate.month() === date.month() && currentDate.year() === date.year();

    const handleMouseDown = useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (e) => {
            e.stopPropagation();
            onStart(dayInstance);
        },
        [dayInstance, onStart]
    );

    const handleMouseUp = useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (e) => {
            e.stopPropagation();
            onEnd(dayInstance);
        },
        [dayInstance, onEnd]
    );

    // 首先过滤出包含当前格子的日程
    const scheduleFilterList = scheduleList
        .map((item, index) => ({ ...item, index }))
        .filter((schedule) => {
            return (
                (schedule.startDate.isBefore(dayInstance.date) && schedule.endDate.isAfter(dayInstance.date)) ||
                schedule.startDate.isSame(dayInstance.date) ||
                schedule.endDate.isSame(dayInstance.date)
            );
        });

    return (
        <div
            className={`calendar-day ${isCurrentMonth ? "current-month" : "no-current-month"} ${isToday ? "today" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ position: "relative" }}
        >
            <span style={{ userSelect: "none" }}>{day}</span>

            <div>
                {scheduleFilterList.map((schedule) => (
                    <div
                        className="schedule-list-item"
                        key={schedule.title}
                        style={{
                            position: "absolute",
                            bottom: schedule.index * 30,
                            left: 0,
                            backgroundColor: schedule.color,
                        }}
                    >
                        {
                            schedule.startDate.isSame(dayInstance.date) || schedule.endDate.isSame(dayInstance.date) ? (
                                <div>
                                    <div className="schedule-list-item-title">{schedule.title}</div>
                                    <div className="schedule-list-item-description">
                                        {schedule.startDate.format("YYYY-MM-DD")} - {schedule.endDate.format("YYYY-MM-DD")}
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

const Schedule: React.FC = () => {
    const [date, setDate] = useState(new Date());

    const startDate = useRef<CalendarDay | null>(null);

    const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

    const scheduleKey = useRef(1);

    // 创建日程
    const handleCreateSchedule = useCallback((startDate: Dayjs, endDate: Dayjs, title: string) => {
        setScheduleList((prev) =>
            prev.concat({
                startDate,
                endDate,
                title,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            })
        );
    }, []);

    // 鼠标按下时
    const handleMouseDown = useCallback((dayInstance: CalendarDay | null) => {
        startDate.current = dayInstance;
    }, []);

    // 鼠标抬起时
    const handleMouseUp = useCallback(
        (dayInstance: CalendarDay | null) => {
            if (!dayInstance) {
                startDate.current = null;
                return;
            }

            if (startDate.current) {
                const [start, end] = startDate.current.date.isBefore(dayInstance.date)
                    ? [startDate.current.date, dayInstance.date]
                    : [dayInstance.date, startDate.current.date];

                handleCreateSchedule(start, end, `日程${scheduleKey.current++}`);
            }
        },
        [handleCreateSchedule]
    );

    // 处理上一个月
    const handlePrevMonth = useCallback(() => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() - 1);
            return newDate;
        });
    }, []);

    // 处理下一个月
    const handleNextMonth = useCallback(() => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + 1);
            return newDate;
        });
    }, []);

    // 渲染日历
    const renderCalendar = useCallback(() => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);
        const daysInPrevMonth = getDaysInPrevMonth(year, month);

        const days: CalendarDay[] = [];

        // 上个月的日期
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({
                isCurrentMonth: false,
                day: daysInPrevMonth - i,
                date: dayjs(new Date(year, month - 1, daysInPrevMonth - i)),
            });
        }

        // 当前月的日期
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                isCurrentMonth: true,
                day: i,
                date: dayjs(new Date(year, month, i)),
            });
        }

        // 下个月的日期
        const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
        const nextMonthDays = totalCells - daysInMonth - firstDayOfMonth;

        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({
                isCurrentMonth: false,
                day: i,
                date: dayjs(new Date(year, month + 1, i)),
            });
        }

        // 将每个对象渲染成对应的格子
        return days.map((day) => (
            <DayCell
                key={day.date.toString()}
                dayInstance={day}
                onStart={handleMouseDown}
                onEnd={handleMouseUp}
                scheduleList={scheduleList}
            />
        ));
    }, [date, handleMouseDown, handleMouseUp, scheduleList]);

    // 获取月份名称
    const getMonthName = (month: number) => {
        const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        return monthNames[month];
    };

    return (
        <Card
            title="简易日历"
            style={{ width: "100%", height: "100%", userSelect: "none" }}
            onMouseDown={() => handleMouseDown(null)}
            onMouseUp={() => handleMouseUp(null)}
        >
            <div className="calendar-container">
                <div className="calendar-header">
                    <Button
                        icon={<LeftOutlined />}
                        onClick={handlePrevMonth}
                    />
                    <h2>
                        {getMonthName(date.getMonth())} {date.getFullYear()}
                    </h2>
                    <Button
                        icon={<RightOutlined />}
                        onClick={handleNextMonth}
                    />
                </div>

                <div className="calendar-weekdays">
                    <div>日</div>
                    <div>一</div>
                    <div>二</div>
                    <div>三</div>
                    <div>四</div>
                    <div>五</div>
                    <div>六</div>
                </div>

                <div className="calendar-days">{renderCalendar()}</div>
            </div>

            <List
                dataSource={scheduleList}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={`${item.startDate.format("YYYY-MM-DD")} - ${item.endDate.format("YYYY-MM-DD")}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default Schedule;
