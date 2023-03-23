import React, {useState} from 'react';
import './Parameters.css';

function Parameters({creditInfo, onUpdateInfo}) {
    let {minsumm, mindays} = creditInfo;
    const [days, setDays] = useState(0);
    const [sum, setSum] = useState(0);
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
        date = date.toLocaleDateString('ru-RU', options);
        setLastDate(date);
    }

    const getAnuSumCredit = (period, summa) => {
        const numberSum = Number(summa);

        switch(creditInfo.type) {
            case 'PDL':
                const rep = period * numberSum * creditInfo.rate + numberSum;
                setRepayment(rep);
                onUpdateInfo({
                    days: period,
                    rate: creditInfo.rate,
                    type: creditInfo.type,
                    sum: summa,
                    rep,
                });
                break;
            case 'IL':
                const i = ((creditInfo.rate * 365) / 26);
                const n = period / 14;
                const k = (i * Math.pow((1 + i), n)) / (Math.pow((1 + i), n) - 1);
                setRepayment(k * numberSum);
                onUpdateInfo({
                    days: period,
                    rate: creditInfo.rate,
                    type: creditInfo.type,
                    sum: summa,
                    rep: k * numberSum,
                });
                break;
        }
    }

    const handleChangeDays = (event) => {
        setDays(event.target.value);
        const period = event.target.value;
        getAnuSumCredit(period, sum);
        updateLastDate(period);
    }

    const handleChangeSum = (event) => {
        setSum(event.target.value);
        const summa = event.target.value;
        getAnuSumCredit(days, summa);
        updateLastDate(days);
    }

    React.useEffect(() => {
        if (creditInfo) {
            setDays(mindays);
            setSum(minsumm);
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
                            {` ${sum} рублей на ${days} ${numWord(days, ['день', 'дня', 'дней'])}`}
                        </span>,
                    'IL':
                        <span className="parameters__title_accent">
                            {` ${sum} рублей на ${days / 7} ${numWord(days / 7, ['неделя', 'недели', 'недель'])}`}
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
                               value={sum ?? 0}
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
                        <b> {sum} рублей </b>
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
                        <b> {sum} рублей </b>
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
