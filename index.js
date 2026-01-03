const axios = require('axios');
const fs = require('fs');

async function claim() {
    try {
        const token = fs.readFileSync('private_keys.txt', 'utf8').trim();
        const response = await axios.post('https://api.hanafuda.hana.network/v1/pity/claim', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });
        console.log('✅ Status:', response.data.message || 'Punkty odebrane!');
    } catch (error) {
        console.log('❌ Błąd:', error.response ? error.response.status : error.message);
        console.log('Sprawdź czy token w Secrets jest aktualny.');
    }
}

claim();
