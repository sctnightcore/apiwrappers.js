import fetch from 'node-fetch'
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}

/**
 * Make sure you get your api key from https://rapidapi.com/fyhao/api/currency-exchange
 * @param {string} rapidApiHost
 * @param {string} rapidApiKey
 * @param {string} from
 * @param {string} to
 * @param {number} amount
 * @returns {string}
 */
export const convertCurrency = async (rapidApiHost, rapidApiKey, from, to, amount=1) => {
    try {
        const data  = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=${to}&from=${from}&q=${amount}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": `${rapidApiHost}`,
            "x-rapidapi-key": `${rapidApiKey}`
        }
        })
        return data.text()
    } catch (err) {
        return new Error(err)
    }
    
}
