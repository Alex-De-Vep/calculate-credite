import React from 'react';
import './CreditCardList.css';
import CreditCard from "../CreditCard/CreditCard";

function CreditCardList({cards, onCardClick, activeId}) {

    return (
        <div className="credit-card-list">
            <h2 className="credit-card-list__title">Доступные продукты</h2>
            <ul className="credit-card-list__list">
                {cards.length > 0 && cards.map((item) => (
                    <li className="credit-card-list__item" key={item.id}>
                        <CreditCard credit={item} activeId={activeId} onCardClick={onCardClick}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CreditCardList;
