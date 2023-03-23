import React from 'react';
import DOMPurify from 'dompurify';
import './CreditCard.css';

function CreditCard({credit, onCardClick, activeId}) {
    function handleClick() {
        onCardClick(credit);
    }

    let description = DOMPurify.sanitize(credit.description, { USE_PROFILES: { html: true } });

    return (
        <div className={`credit-card ${credit.id === activeId ? 'credit-card_active' : ''}`} onClick={handleClick}>
            <h3 className="credit-card__title">
                {credit.name} / <span dangerouslySetInnerHTML={{__html: description}} />
            </h3>
            <p className="credit-card__text">
                от {credit.minsumm} до {credit.maxsumm} рублей
            </p>
            <p className="credit-card__text">
                от {credit.mindays} до {credit.maxdays} дней
            </p>
            <p className="credit-card__text">под {(credit.rate * 100).toFixed(2)} % в сутки</p>
            {
                credit.type === "PDL" &&
                <p className="credit-card__description">Один платёж в конце срока</p>
            }
            {
                credit.type === "IL" &&
                <p className="credit-card__description">Аннуитетные платежи раз в 2 недели</p>
            }
        </div>
    );
}

export default CreditCard;
