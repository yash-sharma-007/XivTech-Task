const express = require('express');
const router = express.Router();

router.post('/getweather', async (req, res) => {
    try {
        let { cities } = req.body;
        cities = cities.filter(city => city.trim() !== '');

        let arr = await Promise.all(cities.map(async (city) => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}`;
                
                let data;
                await fetch(url)
                    .then(response => response.json())
                    .then(responseData => {
                        data = responseData;
                    })
                    .catch(error => {
                        console.error(`Error fetching weather data for ${city}:`, error.message);
                        return { city:"undefined", error: `Error: ${error.message}` };
                    });

                if (data && data.cod === 200) {
                    return { city, temperature: data.main.temp };
                } else {
                    console.error(`Error fetching weather data for ${city}:`, data.message);
                    return { city:"undefined", error: `Error: ${data.cod}, ${data.message}` };
                }
            } catch (error) {
                console.error(`Error fetching weather data for ${city}:`, error.message);
                return { city:"undefined", error: `Error: ${error.message}` };
            }
        }));
        arr  = arr.filter(data => data.city!=="undefined")
        console.log(arr)
        if (arr.length === 0) {
            res.json({ data: arr, success: false });
        } else {
            res.json({ data: arr, success: true });
        }
    } catch (error) {
        console.error('Unexpected error:', error.message);
        res.json({ success: false });
    }
});

module.exports = router;


