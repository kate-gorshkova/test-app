import React from 'react';

import Days from "./Days";

const App = () => (
    <>
        <header></header>
        <section className="dashboard">
            <section className="calendar">
                <Days/>
            </section>
        </section>
    </>
);

export default App;