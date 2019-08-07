import React, {Fragment, createRef} from 'react'
import ContactOption from "./ContactOption";

class ContactFrom extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.realname = createRef();
        this.email = createRef();
        this.subject = createRef();
        this.message = createRef();
        this.contactForm = createRef();

        this.state = {
            message: null,
            active: 'email',
            sending: false
        };

        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleSwitchOption(ev, target) {
        ev.preventDefault();

        this.setState({
            active: target
        })
    }

    async startEmailAction(name, email, subject, message) {
        let {status} = await fetch(`https://cors-anywhere.herokuapp.com/${this.props.email}`, {
            method: 'POST',
            referrer: 'no-referer',
            body: JSON.stringify({name, email, subject, message})
        });

        if (status === 200) {
            this.setState({
                message: 'message has been sent to author',
                sending: false
            });

            // just clear all input
            this.contactForm.current.reset()
        }else {
            this.setState({
                message: 'something went wrong, try again!',
                sending: false
            })
        }

        return  status === 200;
    }

    async startWhatsappAction(name, email, subject, message) {
        let templateMessage = `Hello I am ${name} (${email}), about ${subject}. ${message}`;
        let url = `${this.props.phone}?text=${encodeURIComponent(templateMessage)}`;

        window.open(url, '_blank');
        await (new Promise(resolve => setTimeout(resolve, 200)));

        return true;
    }

    async startSMSAction(name, email, subject, message) {
        let templateMessage = `Hello I am ${name} (${email}), about ${subject}. ${message}`;
        let url = `sms:${this.props.phone}?body=${encodeURIComponent(templateMessage)}`;

        window.open(url, '_blank');
        await (new Promise(resolve => setTimeout(resolve, 200)));

        return true;
    }

    async handleSubmit(ev) {
        ev.preventDefault();
        let name = this.realname.current.value;
        let email = this.email.current.value;
        let subject = this.subject.current.value;
        let message = this.message.current.value;

        this.setState({
            sending: true
        });

        let send = false;

        if (this.state.active === 'email') {
            send = await this.startEmailAction(name, email, subject, message)
        }

        if (this.state.active === 'whatsapp') {
            send = await this.startWhatsappAction(name, email, subject, message)
        }

        if (this.state.active === 'sms' ) {
            send = await this.startSMSAction(name, email, subject, message)
        }

        if (send) {
            this.setState({
                message: 'message has been sent to author',
                sending: false
            });

            // just clear all input
            this.contactForm.current.reset()
        }else {
            this.setState({
                message: 'something went wrong, try again!',
                sending: false
            })
        }

    }

    handleOptionChange(option) {
        console.log(option);
        this.setState({
            active: option
        })
    }

    render() {

        return (
            <Fragment>
                <form ref={this.contactForm} onSubmit={this.handleSubmit.bind(this)} className="form form-contact">
                    <h1>Contact From</h1>
                    <ContactOption initOption={this.state.active} onOptionChange={this.handleOptionChange} />
                    <div className="App-field-group">
                        <div className="App-field">
                            <label htmlFor="name">Full Name:</label>
                            <input ref={this.realname} id="name" className="App-input" type="text" required={true}/>
                        </div>
                        <div className="App-field">
                            <label htmlFor="email">Notify Email:</label>
                            <input ref={this.email} id="email" className="App-input" type="text" required={true}/>
                        </div>
                        <div className="App-field">
                            <label htmlFor="subject">Subject Email:</label>
                            <input ref={this.subject} id="subject" name="subject" className="App-input" type="text" required={true}/>
                        </div>
                        <div className="App-field">
                            <label htmlFor="message">Message:</label>
                            <textarea ref={this.message} id="message" className="App-input" required={true}/>
                        </div>
                        <button className="App-btn btn-submit" type="submit">
                            {this.state.sending ? (
                                <i className="fa fa-spinner fa-spin fa-pull-left" />
                            ): (
                                <i className="fa fa-send fa-pull-left" />
                            )}

                            Send Now
                        </button>

                        {this.state.message != null && (
                            <p className="flash success">{this.state.message}</p>
                        )}
                    </div>
                </form>
            </Fragment>
        )
    }
}


export default ContactFrom
