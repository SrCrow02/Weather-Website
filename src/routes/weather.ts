import { api_key } from '../config.json';
import axios from 'axios';
import express from 'express';

const router = express.Router();

async function getWeather(city: string, apiKey: string) {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(api_url);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

let city = 'São Paulo';

router.get('/', (req, res) => {
    getWeather(city, api_key)
        .then((data) => {

            const templateData = {
                weather: data.weather[0].main, 
                temperature: Math.trunc(data.main.temp),
                humidity: data.main.humidity,
                wind: data.wind,
                name: data.name
            };

            console.log(data);
            res.render('index', templateData);
            
        }).catch ((err) => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    city = req.body.city;

    if (!req.body.city) {
        res.send('Write some place.');
    }

    getWeather(city, api_key);
    res.redirect('/');
});

export default router;