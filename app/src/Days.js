import React, { useState } from "react";

const dateTimeNow = Date.now();
const oneDay = 1000 * 60 * 60 * 24;

const localizedDaysOfWeek = new Map([
    [0, "вс"],
    [1, "пн"],
    [2, "вт"],
    [3, "ср"],
    [4, "чт"],
    [5, "пт"],
    [6, "сб"],
]);

const months = {
    0: {
        month: "Январь",
        countDay: 31,
    },
    1: {
        month: "Февраль",
        countDay: 28,
    },
    2: {
        month: "Март",
        countDay: 31,
    },
    3: {
        month: "Апрель",
        countDay: 30,
    },
    4: {
        month: "Май",
        countDay: 31,
    },
    5: {
        month: "Июнь",
        countDay: 30,
    },
    6: {
        month: "Июль",
        countDay: 31,
    },
    7: {
        month: "Август",
        countDay: 31,
    },
    8: {
        month: "Сентябрь",
        countDay: 30,
    },
    9: {
        month: "Октябрь",
        countDay: 31,
    },
    10: {
        month: "Ноябрь",
        countDay: 30,
    },
    11: {
        month: "Декабрь",
        countDay: 31,
    },
};

const localizeDayOfWeek = (dayNumber) => {
    const dayName = localizedDaysOfWeek.get(dayNumber);
    return dayName || "";
};

const formatDate = (dateItem) => {
    const date = new Date(dateItem);
    return (
        <>
            <span className='day_text'>{date.getDate()}</span>
            <span className='day_text'>{localizeDayOfWeek(date.getDay())}</span>
        </>
    );
};

const getMonth = (dateItem) => {
    const date = new Date(dateItem);
    return months[date.getMonth()].month;
};

// React.FC
const Days = () => {
    const [visibleDays, setVisibleDays] = useState([
        dateTimeNow,
        dateTimeNow + 1 * oneDay,
        dateTimeNow + 2 * oneDay,
        dateTimeNow + 3 * oneDay,
        dateTimeNow + 4 * oneDay,
        dateTimeNow + 5 * oneDay,
        dateTimeNow + 6 * oneDay,
    ]);
    const [currentDay, setCurrentDay] = useState(dateTimeNow);

    const changeWeek = (direction) => {
        setVisibleDays((prev) => {
            const newDateNow = prev[0];

            let ratioDirection = -1;

            if (direction === "right") {
                ratioDirection = 1;
            }

            return [
                newDateNow + 7 * oneDay * ratioDirection,
                newDateNow + 1 * oneDay + 7 * oneDay * ratioDirection,
                newDateNow + 2 * oneDay + 7 * oneDay * ratioDirection,
                newDateNow + 3 * oneDay + 7 * oneDay * ratioDirection,
                newDateNow + 4 * oneDay + 7 * oneDay * ratioDirection,
                newDateNow + 5 * oneDay + 7 * oneDay * ratioDirection,
                newDateNow + 6 * oneDay + 7 * oneDay * ratioDirection,
            ];
        });
    };

    const changeMonth = (direction) => {
        setVisibleDays((prev) => {
            const newDateNow = prev[0];
            const date = new Date(newDateNow);
            const currentMonth = date.getMonth()
            let nextMonth = currentMonth + 1 <= 11 ? currentMonth + 1 : 0;

            let ratioDirection = 1;

            if (direction === "left") {
                ratioDirection = -1;
                nextMonth = currentMonth - 1 >= 0 ? currentMonth - 1 : 11
            }

            const currentCountDay = months[currentMonth].countDay
            const nextCountDay = months[nextMonth].countDay

            const countDay = currentCountDay <= nextCountDay ? currentCountDay : nextCountDay 
            
            return [
                newDateNow + countDay * oneDay * ratioDirection,
                newDateNow + 1 * oneDay + countDay * oneDay * ratioDirection,
                newDateNow + 2 * oneDay + countDay * oneDay * ratioDirection,
                newDateNow + 3 * oneDay + countDay * oneDay * ratioDirection,
                newDateNow + 4 * oneDay + countDay * oneDay * ratioDirection,
                newDateNow + 5 * oneDay + countDay * oneDay * ratioDirection,
                newDateNow + 6 * oneDay + countDay * oneDay * ratioDirection,
            ];
        });
    };


    return (
        <>
            <nav className='days'>
                <div className='btns'>
                    <button onClick={() => changeMonth("left")} className='btn mounth left'></button>

                    <button
                        onClick={() => changeWeek("left")}
                        className='btn week left'></button>
                </div>

                <ul className='days_line'>
                    {visibleDays.map((it) => (
                        <li
                            onClick={() => setCurrentDay(it)}
                            key={it}
                            className={
                                "day" + `${it === currentDay ? " active" : ""}`
                            }>
                            {formatDate(it)}
                        </li>
                    ))}
                </ul>

                <div className='btns'>
                    <button
                        onClick={() => changeWeek("right")}
                        className='btn week right'></button>
                        
                    <button onClick={() => changeMonth("right")} className='btn mounth right'></button>
                </div>
            </nav>

            <div className='month__wrapper'>
                <span className='month__content'>
                    {getMonth(visibleDays[0])}
                </span>
            </div>
        </>
    );
};

export default Days;
