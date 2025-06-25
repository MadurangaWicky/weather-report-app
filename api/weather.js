export default async function handler(req, res) {

  const apiKey = process.env.WEATHER_API_KEY;
  const city = req.query.city || 'Colombo';

  if (!apiKey) {
    return res.status(500).json({ error: 'API_KEY not set' });
  }

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch weather data' });
  }
}