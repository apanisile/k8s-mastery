import React, {useRef, useState} from 'react';
import './App.css';
import { MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Polarity from "./components/Polarity.js";
import axios from 'axios'

const style = {
    marginLeft: 12,
};

const Tosin = () =>{
const ref = useRef()
const [sentence, setSentence] = useState('')
const [polarity, setPolarity] = useState(undefined)
const  analyzeSentence = async() => {
 
 await axios.post('http://localhost:8080/sentiment', sentence)
        .then(response => 
            // console.log("response,", response)
            response.json()
            )
        .then(data => setSentence(data))
        .catch(err => console.log(err))  
}

const polarityComponent = polarity !== undefined ?
<Polarity sentence={sentence} polarity={polarity}/> :
null;

return (
    <MuiThemeProvider>
        <div className="centerize">
            <Paper zDepth={1} className="content">
                <h2>Sentiment Analyser</h2>
                <TextField ref={ref} onChange={(e) =>setSentence(e.target.value)}
                           hintText="Type your sentence."
                           variant="outlined"/>
                           
                <Button  variant="contained" label="Send" style={style} onClick={analyzeSentence}>Send</Button>
                {polarityComponent}
            </Paper>
        </div>
    </MuiThemeProvider>
);
}

export default Tosin