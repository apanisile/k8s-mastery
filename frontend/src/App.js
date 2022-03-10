import React, {Component} from 'react';
import './App.css';
import { MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Polarity from "./components/Polarity.js";

const style = {
    marginLeft: 12,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentence: '',
            polarity: undefined
        };
        this.handleChange = this.handleChange.bind(this);
    };

    analyzeSentence() {
        fetch('http://localhost:8080/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sentence: this.state.sentence})
        })
            .then(response => response.json())
            .then(data => this.setState(data));
    }

    onEnterPress = e => {
        if (e.key === 'Enter') {
            this.analyzeSentence();
        }
    };

    render() {
        const polarityComponent = this.state.polarity !== undefined ?
            <Polarity sentence={this.state.sentence} polarity={this.state.polarity}/> :
            null;

        return (
            <MuiThemeProvider>
                <div className="centerize">
                    <Paper zDepth={1} className="content">
                        <h2>Sentiment Analyser</h2>
                        <TextField onChange={this.handleChange} value={this.state.sentence} onKeyUp={this.onEnterPress.bind(this)}
                                   placeholder="Type your sentence."
                                   variant="outlined"/>
                        <Button  variant="contained" label="Send" style={style} onClick={this.analyzeSentence.bind(this)}>Send</Button>
                        {polarityComponent}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
    handleChange(event) {
        this.setState({sentence: event.target.value});
    }
}

export default App;
