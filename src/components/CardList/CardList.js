import React from 'react';
import './CardList.css';
import CreditCard from "../CreditCard/CreditCard";

function CardList({cards, onCardClick, activeId}) {

    return (
        <div className="card-list">
            <h2 className="card-list__title">Доступные продукты</h2>
            <ul className="card-list__list">
                {cards.length > 0 && cards.map((item) => (
                    <li className="card-list__item" key={item.id}>
                        <CreditCard credit={item} activeId={activeId} onCardClick={onCardClick}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CardList;
