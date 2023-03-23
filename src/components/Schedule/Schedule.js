import React, {useState} from 'react';
import './Schedule.css';

function Schedule({data}) {
    const [payments, setPayments] = useState([]);

    const getPayments = () => {
        let arrayPayments = [];

        if (data.type === 'IL') {
            const daysPayment = data.days / 14;
            let credit = Number(data.sum);

            for (let i = 0; i < daysPayment; i++) {
                let dateTime = new Date();
                dateTime.setDate(dateTime.getDate() + 14 * i);
                const options = { day: 'numeric', month: 'long', year: 'numeric'};
                dateTime = dateTime.toLocaleDateString('ru-RU', options);

                credit = (credit * data.rate * 14) + credit - data.rep;

                arrayPayments.push({
                    id: i,
                    dateTime: dateTime,
                    repayment: data.rep.toFixed(2),
                    credit: i + 1 === daysPayment ? 0 : credit.toFixed(2)
                })
            }
        } else {
            const daysPayment = 1;

            let dateTime = new Date();
            dateTime.setDate(dateTime.getDate() + data.days);
            const options = { day: 'numeric', month: 'long', year: 'numeric'};
            dateTime = dateTime.toLocaleDateString('ru-RU', options);

            arrayPayments.push({
                id: daysPayment,
                dateTime: dateTime,
                repayment: data.rep,
                credit: data.rep
            })
        }



        return arrayPayments;
    }

    React.useEffect(() => {
        const payments = getPayments(data);
        setPayments(payments);

    }, [data]);

    return (
        <div className="schedule">
            <h2 className="schedule__title">График платежей</h2>
            {payments &&
                <>
                    <div className="schedule__row-title">
                        <p className="schedule__subtitle">Дата платежа</p>
                        <p className="schedule__subtitle">Сумма платежа, руб</p>
                        <p className="schedule__subtitle">Сумма остатка, руб</p>
                    </div>
                    <ul className="schedule__list">
                        {payments.map((item) => (
                            <li className="schedule__item" key={item.id}>
                                <div className="schedule__row">
                                    <p className="schedule__text">{item.dateTime}</p>
                                    <p className="schedule__text">{item.repayment}</p>
                                    <p className="schedule__text">{item.credit}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            }
        </div>
    );
}

export default Schedule;
