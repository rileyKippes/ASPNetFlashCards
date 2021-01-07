import React, { Component } from 'react';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            terms: [0, 0],
            type: '+',
            types: ['+', '-', 'X', '/'],
            answer: '0',
            answerDisplayTypes: ['none', 'block'],
            answerDisplay: 0,
            config: {showBanner: false},
            loading: true
            
        }
        this.randInt = this.randInt.bind(this);
        this.generateNewCard = this.generateNewCard.bind(this);
    }

    componentDidMount() {
        this.generateNewCard();
        this.getConfig();
    }

    randInt(min, max) {
        return (Math.floor(Math.random() * Math.floor(max))) + Math.floor(min);
    }

    generateNewCard() {
        var newType = this.state.types[this.randInt(0, this.state.types.length)];
        var newTerms = [this.randInt(1, 12), this.randInt(1, 12)]
        var newAnswer = 0;
        switch (newType) {
            case '+': newAnswer = newTerms[0] + newTerms[1]; break;
            case '-': newAnswer = newTerms[0] - newTerms[1]; break;
            case 'X': newAnswer = newTerms[0] * newTerms[1]; break;
            case '/': newAnswer = newTerms[0] / newTerms[1]; break;
            default: newAnswer = newTerms[0] % newTerms[1]; break;
        }
        this.setState({
            type: newType,
            terms: newTerms,
            answer: newAnswer,
            answerDisplay: 0,
            ready: true
        });
    }

    render() {
        if (this.state.loading) {
            return <div className="m-2 alert alert-primary" role="alert"> Loading. . . </div>
        }

        if (this.state.config.showBanner) {
            setTimeout(() => this.setState({ config: { showBanner: false } }), this.state.config.bannerTime);
            return <div className="m-2 alert alert-success" role="alert"> {this.state.config.banner}</div>
        }
        return (
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-10">
                    <div className="row justify-content-around">
                        <button className="m-1 text-center btn btn-primary" onClick={() => { this.setState({ answerDisplay: 1 }) }} >Show Answer</button>

                        <button className="m-1 text-center btn btn-primary" onClick={this.generateNewCard}>Generate New Card</button>

                    </div>

                    <div className="card m-1 justify-content-center">

                        <h2 className="card-body p-1 text-center font-weight-bold"> What is {this.state.terms[0]} {this.state.type} {this.state.terms[1]} </h2>

                        <h2 className={"card-footer p-1 text-center font-weight-bold d-" + this.state.answerDisplayTypes[this.state.answerDisplay]}> {this.state.answer} </h2>

                    </div>
                </div>
            </div>
        );
    }

    async getConfig() {
        const response = await fetch('config');
        const data = await response.json();
        this.setState({ config: data, loading: false });
    }
}
