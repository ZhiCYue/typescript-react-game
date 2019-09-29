import React, { Component } from 'react'

interface IProps {
    name: string,
    age?: number
}

// type IProps = {
//     name: string,
//     age?: number
// }

interface IState {
    age: number,
    name: string,
    [key: string]: number | string
}

class Form extends Component<IProps, IState> {
    state = {
        age: 18,
        name: 'react typescript'
    }

    handleClick = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value }: { name: keyof IState, value: number | string } = e.currentTarget
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                name: { this.props.name }<br/>
                age: { this.props.age }<br/>
                state: { this.state.age }
                <input type="text" name="name" onChange={this.handleClick} value={this.state.name}/>
                <input type="text" name="age" onChange={this.handleClick} value={this.state.age}/>
            </div>
        )
    }
}

export default Form
