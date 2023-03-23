import React, {useEffect, useState} from "react";
import CreditCardList from "../CardList/CardList";
import api from "../../utils/Api";
import Parameters from "../Parameters/Parameters";
import Schedule from "../Schedule/Schedule";
import './Main.css';

function Main() {
    const [creditCards, setCreditCards] = useState([]);
    const [activeCredit, setActiveCredit] = useState({});
    const [creditInfo, setCreditInfo] = useState({});

    const getCredits = (data) => {
        return data.reduce((acc, item) => {
            let {maxsumm, minsumm, stepsumm} = item;

            item.products.forEach((creditInfo) => {
                creditInfo = {maxsumm, minsumm, stepsumm, ...creditInfo};
                acc.push(creditInfo);
            })

            return acc;
        }, [])
    }

    useEffect(() => {
        api.getData().then(data => {
            const credits = getCredits(data);
            setActiveCredit(credits[0]);
            setCreditCards(credits);
        });
    }, []);

    const handleCardClick = (card) => {
        setActiveCredit(card);
    }

    const updateCreditInfo = (data) => {
        setCreditInfo(data);
    }

    return (
        <main>
            <div className="main">
                <div className="main__container">
                    <h1 className="main__title">Экспресс деньги</h1>
                    <div className="main__info">
                        <div>
                            <CreditCardList cards={creditCards} activeId={activeCredit.id} onCardClick={handleCardClick} />
                            {activeCredit && <Parameters creditInfo={activeCredit} onUpdateInfo={updateCreditInfo}/>}
                        </div>
                        <Schedule data={creditInfo} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main;