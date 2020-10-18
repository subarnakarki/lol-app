import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function getSummonerData(req, res) {
  // Run cors
  await cors(req, res)
  
  // Rest of the API logic
  const info = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com",
      "X-Riot-Token": process.env.NEXT_PUBLIC_API_KEY
    }
  });
  res.json(info.data);
}
