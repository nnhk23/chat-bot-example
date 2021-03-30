import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import '../css/ChatBot.css'

export default class ChatBot extends Component {
    state={
        userInput: '',
        userHistory: [],
        botHistory: []
    }

    // handle user's input
    handleChange = (e) => this.setState({userInput: e.target.value})

    // handle user's submission
    onKeyUp = (e) => {
        if(e.key === "Enter"){
            this.setState(prevState => {
                return{ 
                    userHistory: [e.target.value, ...prevState.userHistory],
                    userInput: '',
                    botReply: ''
                }
            })

            this.matchReply(e.target.value)
        }

    }

    matchReply = (userInput) => {
        const trigger = [
            ["hi", "hey", "hello"],
            ["how are you", "how are things", "how you doing"],
            ["what is going on", "what is up"],
            ["happy", "good", "amazing", "fantastic", "cool"],
            ["bad", "bored", "tired", "sad"],
            ["thanks", "thank you"],
            ["bye", "good bye", "goodbye"]
        ];
            
        const reply = [
            ["Hello", "Hi", "It's nice seeing you!"],
            ["I'm doing good... how are you?", "I feel kind of lonely, how are you?", "I feel happy, how are you?"],
            ["Nothing much", "Exciting things!", "I'm happy to see you!"],
            ["Glad to hear it", "Yayyy!! That's the spirit!"],
            ["There is always a rainbow after the rain!"],
            ["You're welcome", "No problem", "It's my pleasure!"],
            ["Goodbye, it was a nice talk"]
        ];
        
        const alternative = ["Same","Go on...","Try again please?", "I'm listening..."];

        let botMsg = this.generateReply(trigger, reply, userInput)

        if(!botMsg){
            botMsg = alternative[Math.floor(Math.random()*alternative.length)]
        }

        this.setState(prevState => {
            return{
                botHistory: [botMsg, ...prevState.botHistory]
            }
        })

    }

    generateReply = (trigger, reply, text) => {
        let item;
        let items;
        for (let x = 0; x < trigger.length; x++) {
            for (let y = 0; y < reply.length; y++) {
                if (text.includes(trigger[x][y])) {
                    items = reply[x];
                    item = items[Math.floor(Math.random() * items.length)];
                }
            }
        }
        return item;
    }

    render() {
        return (
            <div>
                <div>
                    <img 
                        className='bot-cover-photo'
                        src='https://www.userlike.com/api/proxy/resize/do-i-need-a-chatbot/header-chat-box.png?height=720' 
                        alt='chatbot-pic'
                    />  
                </div>
                
                <div className='human-input'>
                    <InputGroup className="mb-3">

                        <Form.Control
                            className="mb-2"
                            type="text" 
                            placeholder="Ask me something"
                            value={this.state.userInput}
                            onChange={this.handleChange}
                            onKeyPress={this.onKeyUp}
                        />

                    </InputGroup>
                </div>

                {this.state.userHistory.map((userReply, indx) => 
                    <div className='conversation-box'>
                        <div id='bot-reply'>
                            <h3>Bot: {this.state.botHistory[indx]}</h3>
                        </div>

                        <div id='user-input'>
                            <h3>You: {userReply}</h3>
                        </div>
                    </div>
                )}
                    
            </div>
        )
    }
}
