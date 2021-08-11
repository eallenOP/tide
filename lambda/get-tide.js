const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  const eventBody = JSON.parse(event.body)
  const { API_TOKEN, API_URL } = process.env
  const TIDE_API = API_URL + "?lat=-45.75&long=170.660" + API_TOKEN + eventBody.region

  const response = await fetch(TIDE_API)
  const data = await response.json()

  return {
    statusCode: 200,
    body: JSON.stringify({
      tides: data
    })
  }
}