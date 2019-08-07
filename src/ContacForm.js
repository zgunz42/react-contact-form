import React, {Fragment, createRef} from 'react'

class ContactFrom extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.realname = createRef();
        this.email = createRef();
        this.subject = createRef();
        this.message = createRef();
        this.state = {
            message: null,
            sending: false
        }
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

        let {status} = await fetch('https://cors-anywhere.herokuapp.com/http://bungamata.com', {
            method: 'POST',
            referrer: 'no-referer',
            body: JSON.stringify({name, email, subject, message})
        });

        if (status === 200) {
            this.setState({
                message: 'message has been sent to author',
                sending: false
            })
        }else {
            this.setState({
                message: 'something went wrong, try again!',
                sending: false
            })
        }

    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="form form-contact">
                    <h1>Contact From</h1>
                    <div className="contact-option">
                        <a className="item-option" href="#whatsapp">
                            <i className="fa fa-whatsapp fa-2x" />
                        </a>
                        <a className="item-option" href="#mail">
                            <i className="fa fa-envelope fa-2x" />
                        </a>
                        <a className="item-option" href="#phone">
                            <i className="fa fa-sms fa-2x" />
                        </a>
                    </div>
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
                            <p className="flash">{this.state.message}</p>
                        )}
                    </div>
                </form>
            </Fragment>
        )
    }
}


export default ContactFrom
