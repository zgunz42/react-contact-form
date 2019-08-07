import React, {useState, useEffect} from "react";

export default function ContactOption({initOption, onOptionChange}) {

    let [active, setActive] = useState(initOption || 'email');

    useEffect(() => {
        onOptionChange(active)
    });

    let getNameClass = function (name) {
        let classes = "item-option";
        if (name === active) {
            classes = classes + ' active'
        }

        return classes;
    };

    return (
        <div className="contact-option">
            <a onClick={() => setActive('whatsapp')}
               className={getNameClass('whatsapp')}
               href="#whatsapp">
                <i className="fa fa-whatsapp fa-2x"/>
            </a>
            <a onClick={() => setActive('email')}
               className={getNameClass('email')}
               href="#mail">
                <i className="fa fa-envelope fa-2x"/>
            </a>
            <a onClick={() => setActive('sms')}
               className={getNameClass('sms')}
               href="#phone">
                <i className="fa fa-sms fa-2x"/>
            </a>
        </div>
    )
}
