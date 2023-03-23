import React, {useState} from 'react';
import './Parameters.css';

function Parameters({creditInfo, onUpdateInfo}) {
    let {minsumm, mindays} = creditInfo;
    const [days, setDays] = useState(0);
    const [creditSum, setCreditSum] = useState(0);
    const [lastDate, setLastDate] = useState(null);
    const [repayment, setRepayment] = useState(0);

    function numWord(value, words) {
        value = Math.abs(value) % 100;
        let num = value % 10;
        if (value > 10 && value < 20) return words[2];
        if (num > 1 && num < 5) return words[1];
        if (num === 1) return words[0];
        return words[2];
    }

    const updateLastDate = (period) => {
        let date = new Date();
        date.setDate(date.getDate() + period);
        const options = { day: 'numeric', month: 'long', year: 'numeric'};
        setLastDate(date.toLocaleDateString('ru-RU', options));
    }

    const getAnuSumCredit = (days, summa) => {
        const creditSum = Number(summa);

        switch(creditInfo.type) {
            case 'PDL':
                const creditRepayment = days * creditSum * creditInfo.rate + creditSum;
                setRepayment(creditRepayment);
                onUpdateInfo({
                    days: days,
                    rate: creditInfo.rate,
                    type: creditInfo.type,
                    sum: summa,
                    rep: creditRepayment,
                });
                break;
            case 'IL':
                const percentPeriod = ((creditInfo.rate * 365) / 26);
                const period = days / 14;
                const percent = (percentPeriod * Math.pow((1 + percentPeriod), period)) / (Math.pow((1 + percentPeriod), period) - 1);
                const creditRep = percent * creditSum;
                setRepayment(creditRep);
                onUpdateInfo({
                    days: days,
                    rate: creditInfo.rate,
                    type: creditInfo.type,
                    sum: summa,
                    rep: creditRep,
                });
                break;
        }
    }

    const handleChangeDays = (event) => {
        setDays(event.target.value);
        const period = event.target.value;
        getAnuSumCredit(period, creditSum);
        updateLastDate(period);
    }

    const handleChangeSum = (event) => {
        setCreditSum(event.target.value);
        getAnuSumCredit(days, event.target.value);
        updateLastDate(days);
    }

    React.useEffect(() => {
        if (creditInfo) {
            setDays(mindays);
            setCreditSum(minsumm);
            getAnuSumCredit(mindays, minsumm);
            updateLastDate(mindays);
        }
    }, [creditInfo, mindays, minsumm]);

    return (
        <div className="parameters">
            <h2 className="parameters__title">
                Параметры займа /
                {{
                    'PDL':
                        <span className="parameters__title_accent">
                            {` ${creditSum} рублей на ${days} ${numWord(days, ['день', 'дня', 'дней'])}`}
                        </span>,
                    'IL':
                        <span className="parameters__title_accent">
                            {` ${creditSum} рублей на ${days / 7} ${numWord(days / 7, ['неделя', 'недели', 'недель'])}`}
                        </span>
                }[creditInfo.type]}
            </h2>
            <ul className="parameters__list">
                <li className="parameters__item">
                    <p className="parameters__subtitle">{`Сумма (${creditInfo.minsumm} - ${creditInfo.maxsumm} рублей)`}</p>
                    <div className="parameters__range">
                        <input type='range'
                               name='sum'
                               id='sum'
                               onChange={handleChangeSum}
                               min={creditInfo.minsumm}
                               max={creditInfo.maxsumm}
                               step={creditInfo.stepsumm}
                               value={creditSum ?? 0}
                               className='parameters__range-value'/>
                    </div>
                </li>
                <li className="parameters__item">
                    {{
                        'PDL':
                            <p className="parameters__subtitle">{`Срок (${creditInfo.mindays} ${numWord(creditInfo.mindays, ['день', 'дня', 'дней'])} - ${creditInfo.maxdays} ${numWord(creditInfo.maxdays, ['день', 'дня', 'дней'])})`}</p>,
                        'IL':
                            <p className="parameters__subtitle">{`Срок (${creditInfo.mindays / 7} ${numWord(creditInfo.mindays / 7, ['неделя', 'недели', 'недель'])} - ${creditInfo.maxdays / 7} ${numWord(creditInfo.maxdays / 7, ['неделя', 'недели', 'недель'])})`}</p>
                    }[creditInfo.type]}
                    <div className="parameters__range">
                        <input type='range'
                               name='days'
                               id='days'
                               onChange={handleChangeDays}
                               min={creditInfo.mindays}
                               max={creditInfo.maxdays}
                               step={creditInfo.stepdays}
                               value={days ?? 0}
                               className='parameters__range-value'/>
                    </div>
                </li>
            </ul>
            {creditInfo.type === 'PDL' ?
                <div className="parameters__description-wrapper">
                    <p className="parameters__description">
                        Вы берёте
                        <b> {creditSum} рублей </b>
                        на
                        <b> {days} {numWord(days, ['день', 'дня', 'дней'])} </b>
                        под
                        <b> {(creditInfo.rate * 100).toFixed(2)}% в сутки</b>
                    </p>
                    <p className="parameters__description">
                        Вы возвращаете
                        <b> {repayment} </b>
                        через
                        <b> {days} {numWord(days, ['день', 'дня', 'дней'])} {lastDate}</b>
                    </p>
                </div> :
                <div className="parameters__description-wrapper">
                    <p className="parameters__description">
                        Вы берёте
                        <b> {creditSum} рублей </b>
                        на
                        <b> {days / 7} {numWord(days / 7, ['неделя', 'недели', 'недель'])} </b>
                        под
                        <b> {(creditInfo.rate * 100).toFixed(2)}% в сутки</b>
                    </p>
                    <p className="parameters__description">
                        Вы возвращаете
                        <b> {days / 14} {numWord(days / 14, ['платеж', 'платежа', 'платежей'])} </b>
                        по
                        <b> {repayment.toFixed(2)} {numWord(Math.floor(repayment), ['рубль', 'рубля', 'рубли'])} </b>
                        каждые 2 недели до
                        <b> {lastDate}</b>
                    </p>
                </div>
            }
        </div>
    );
}

export default Parameters;
