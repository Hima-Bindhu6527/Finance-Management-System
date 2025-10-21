const express = require('express');
const fetch = global.fetch || require('node-fetch');
const router = express.Router();

// Simple in-memory cache
const cache = {};
const now = () => Date.now();
const setCache = (key, value, ttlMs) => {
    cache[key] = { value, expires: now() + ttlMs };
};
const getCache = (key) => {
    const entry = cache[key];
    if (!entry) return null;
    if (entry.expires < now()) {
        delete cache[key];
        return null;
    }
    return entry.value;
};

const GRAM_PER_TROY_OUNCE = 31.1034768;

// Helper to fetch FX timeseries; provider configurable via FX_API_URL and FX_API_KEY
const fetchFxTimeseries = async (start_date, end_date) => {
    const fxApiUrl = process.env.FX_API_URL || 'https://api.exchangerate.host/timeseries';
    const key = process.env.FX_API_KEY || '';
    let url = `${fxApiUrl}?start_date=${start_date}&end_date=${end_date}&base=USD&symbols=INR`;
    if (key && fxApiUrl.includes('your-paid-provider-domain')) {
        // placeholder for providers that require key in query
        url += `&access_key=${key}`;
    }
    const res = await fetch(url);
    return res.ok ? await res.json() : null;
};

// GET /api/metals/spot?metal=gold|silver
// Note: city handling removed; backend will use Bengaluru for any city-provider calls
router.get('/spot', async (req, res) => {
    const metal = (req.query.metal || 'gold').toLowerCase();
    const symbol = metal === 'silver' ? 'XAG' : 'XAU';

    const cacheKey = `spot:${metal}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    try {
        // If a city-specific provider is configured, call it for Bengaluru (hardcoded)
        const cityProvider = process.env.CITY_PRICE_PROVIDER_URL || null; // e.g. https://example.com/price?city={city}&metal={metal}
        if (cityProvider) {
            try {
                const city = 'Bengaluru';
                const cityUrl = cityProvider.replace('{city}', encodeURIComponent(city)).replace('{metal}', encodeURIComponent(metal));
                const cityRes = await fetch(cityUrl);
                if (cityRes.ok) {
                    const cityJson = await cityRes.json();
                    // Expecting { price_per_gram: number }
                    if (cityJson && typeof cityJson.price_per_gram === 'number') {
                        setCache(cacheKey, { price_per_gram: cityJson.price_per_gram, source: 'city-provider' }, 5 * 60 * 1000);
                        return res.json({ price_per_gram: cityJson.price_per_gram, source: 'city-provider' });
                    }
                }
            } catch (e) {
                // ignore and continue
            }
        }

        const apiKey = process.env.METALS_API_KEY;
        if (!apiKey) return res.status(400).json({ error: 'METALS_API_KEY not set on server' });

        // Use metals-api latest endpoint
        const metalsUrl = `https://metals-api.com/api/latest?access_key=${apiKey}&base=USD&symbols=${symbol}`;
        const metalsRes = await fetch(metalsUrl);
        if (!metalsRes.ok) throw new Error('metals latest failed');
        const metalsJson = await metalsRes.json();
        if (!metalsJson || !metalsJson.rates || typeof metalsJson.rates[symbol] === 'undefined') throw new Error('invalid metals response');

        // metals-api returns metal per 1 USD (e.g., XAU: 0.0006). USD per ounce = 1 / rate
        const metalRate = parseFloat(metalsJson.rates[symbol]);
        const ounceUsd = 1 / metalRate;

        // Get USD->INR latest rate
        const fxUrl = (process.env.FX_API_URL || 'https://api.exchangerate.host/latest') + '?base=USD&symbols=INR';
        const fxRes = await fetch(fxUrl);
        const fxJson = fxRes.ok ? await fxRes.json() : null;
        const usdToInr = fxJson && fxJson.rates && fxJson.rates.INR ? parseFloat(fxJson.rates.INR) : null;

        if (!usdToInr) throw new Error('FX rate fetch failed');

        const ounceInr = ounceUsd * usdToInr;
        const perGram = Math.round((ounceInr / GRAM_PER_TROY_OUNCE) * 100) / 100;

        const result = { price_per_gram: perGram, source: 'metals-api + fx' };
        setCache(cacheKey, result, 5 * 60 * 1000); // cache 5 minutes
        return res.json(result);
    } catch (err) {
        console.error('spot error', err.message || err);
        return res.status(500).json({ error: 'Failed to fetch spot price', detail: err.message });
    }
});

// GET /api/metals/history?metal=gold|silver&days=30
// Note: city handling removed; backend will use Bengaluru when calling city provider
router.get('/history', async (req, res) => {
    const metal = (req.query.metal || 'gold').toLowerCase();
    const days = parseInt(req.query.days, 10) || 30;

    const symbol = metal === 'silver' ? 'XAG' : 'XAU';
    const apiKey = process.env.METALS_API_KEY;
    if (!apiKey) {
        return res.status(400).json({ error: 'METALS_API_KEY not set in server environment. Please set it to enable historical data.' });
    }

    const pad = (n) => String(n).padStart(2, '0');
    const formatDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (days - 1));
    const start_date = formatDate(start);
    const end_date = formatDate(end);

    const cacheKey = `history:${metal}:${days}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    try {
        // If city provider supports history, try it for Bengaluru (hardcoded)
        const cityProvider = process.env.CITY_PRICE_PROVIDER_URL || null; // e.g. https://example.com/history?city={city}&metal={metal}&days={days}
        if (cityProvider) {
            try {
                const city = 'Bengaluru';
                const cityUrl = cityProvider.replace('{city}', encodeURIComponent(city)).replace('{metal}', encodeURIComponent(metal)).replace('{days}', String(days));
                const cityRes = await fetch(cityUrl);
                if (cityRes.ok) {
                    const cityJson = await cityRes.json();
                    // Expecting { dates: [...], prices: [...] }
                    if (cityJson && Array.isArray(cityJson.dates) && Array.isArray(cityJson.prices)) {
                        setCache(cacheKey, cityJson, 30 * 60 * 1000);
                        return res.json(cityJson);
                    }
                }
            } catch (e) {
                // ignore and fall back
            }
        }

        // Metals-API timeseries (base=USD). Requires API key.
        const metalsUrl = `https://metals-api.com/api/timeseries?access_key=${apiKey}&start_date=${start_date}&end_date=${end_date}&base=USD&symbols=${symbol}`;
        const metalsRes = await fetch(metalsUrl);
        if (!metalsRes.ok) throw new Error('Metals API request failed');
        const metalsJson = await metalsRes.json();

        if (!metalsJson || !metalsJson.rates) throw new Error('Invalid metals API response');

        // Get USD->INR timeseries for same period
        const fxJson = await fetchFxTimeseries(start_date, end_date);

        const dates = [];
        const prices = [];

        // metalsJson.rates is an object keyed by date
        const rateDates = Object.keys(metalsJson.rates).sort();
        for (const d of rateDates) {
            const dayRates = metalsJson.rates[d];
            if (!dayRates || typeof dayRates[symbol] === 'undefined') continue;

            const metalRate = parseFloat(dayRates[symbol]);
            if (isNaN(metalRate) || metalRate === 0) continue;

            // metals-api returns rate as amount of metal per 1 USD (e.g., XAU: 0.0006 meaning 1 USD = 0.0006 XAU)
            // To get USD price per ounce: ounceUsd = 1 / metalRate
            const ounceUsd = 1 / metalRate;

            // Get USD->INR for this date
            const fxRate = fxJson && fxJson.rates && fxJson.rates[d] && fxJson.rates[d].INR ? parseFloat(fxJson.rates[d].INR) : null;
            const usdToInr = fxRate || (fxJson && fxJson.rates && Object.values(fxJson.rates).length ? Object.values(fxJson.rates)[0].INR : null) || null;

            if (!usdToInr) continue;

            const ounceInr = ounceUsd * usdToInr;
            const perGram = Math.round((ounceInr / GRAM_PER_TROY_OUNCE) * 100) / 100;

            dates.push(d);
            prices.push(perGram);
        }

        if (dates.length === 0) {
            return res.status(502).json({ error: 'No historical data available from metals provider' });
        }

        const out = { dates, prices, source: 'metals-api + fx' };
        setCache(cacheKey, out, 30 * 60 * 1000); // cache 30 minutes
        return res.json(out);
    } catch (err) {
        console.error('Error fetching metals history:', err.message || err);
        return res.status(500).json({ error: 'Failed to fetch metals history', detail: err.message });
    }
});

module.exports = router;
