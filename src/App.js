import React from 'react';
import ContactFrom from './ContacForm';
import './App.css';

function App() {
    let email = 'http://bungamata.com';
    let phone = '6287705635438';

    return (
        <div className="App">
            <div className="App-body">
                <div className="App-content content-center content-card">
                    <ContactFrom
                        email={email}
                        phone={phone}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
