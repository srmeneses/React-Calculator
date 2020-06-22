import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.setTransmormation = this.setTransmormation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setTransmormation(operation){
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const values = [...this.state.values]
            
            let isFirst=false;
            
            if(values[1]===0){
                isFirst = true;
            }

            switch(operation){
                case '√':
                    if(isFirst){
                        values[0] = Math.sqrt(values[0]).toFixed(2);
                    }else{
                        values[1] = Math.sqrt(values[1]).toFixed(2);
                    }
                    break;

                case '+/-':
                    if(isFirst){
                        values[0] = -1*(values[0]);
                    }else{
                        values[1] = -1*(values[1]);
                    }                    
                    break;
            }

            this.setState({
                displayValue: isFirst? values[0]: values[1],
                operation: operation,
                current: isFirst ? 0 : 1,
                clearDisplay: true,
                values
            });

            console.log(`Opa valores ${values} e operação ${operation}`);
        }
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            switch(currentOperation){
                case '+':
                    values[0] = values[0] + values[1];
                    break;
                    
                case '-':
                    values[0] = values[0] - values[1];
                    break;

                case '÷':
                    values[0] = values[0] / values[1];
                    break;

                case 'x':
                    values[0] = values[0] * values[1];
                    break;                
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
            console.log(`Opa valores ${values} e operação ${operation}`);
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory}/>
                <Button label="+/-" click={this.setTransmormation} />
                <Button label="√" click={this.setTransmormation} />
                <Button label="÷" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="x" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
                
            </div>
        )
    }
}