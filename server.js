const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) =>{
    const randomElement = getRandomElement(quotes)
    const body = {
        quote: randomElement
    }
    
    res.send(body)
})

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person
    const personArray = quotes.filter(obj => obj.person === person)
    if(person){
        res.send( 
            {
            quotes: personArray
            }
        )
    } else {
        res.send(
            {
                quotes: quotes
            }
        ) 
    }
})

app.post('/api/quotes', (req, res, next) => {
    const newQuote = {quote: req.query.quote,
                    person: req.query.person}
    
    if(newQuote.quote && newQuote.person){
        quotes.push(newQuote)
        res.send({quote: newQuote});
    }else(
        res.status(400).send()
    )
})

app.listen(PORT)

