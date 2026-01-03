const axios = require('axios');
const fs = require('fs');

async function claim() {
    try {
        const token = fs.readFileSync('private_keys.txt', 'utf8').trim();
        // Zmieniony adres na aktualny punkt dostępu API Hana Network
        const response = await axios.post('https://api.hana.network/v1/pity/claim', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        console.log('✅ Sukces:', response.data.message || 'Akcja wykonana!');
    } catch (error) {
        if (error.response) {
            console.log(`❌ Serwer odpowiedział błędem: ${error.response.status}`);
            if (error.response.status === 401) console.log('Token wygasł – odśwież go!');
        } else {
            console.log('❌ Błąd połączenia: Serwer Hanafuda może być przeciążony.');
        }
    }
}

claim();
