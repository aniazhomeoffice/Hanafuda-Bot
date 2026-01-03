const axios = require('axios');
const fs = require('fs');

async function claim() {
    try {
        const token = fs.readFileSync('private_keys.txt', 'utf8').trim();
        // Próbujemy uderzyć bezpośrednio w nowy system punktowy
        const response = await axios.post('https://api.hana.network/v1/faucet/claim', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        console.log('✅ Sukces:', response.data.message || 'Zasoby odebrane!');
    } catch (error) {
        if (error.response) {
            console.log(`❌ Serwer odpowiedział błędem: ${error.response.status}`);
            if (error.response.status === 404) {
                console.log('⚠️ Adres API wygasł. Musimy go namierzyć w przeglądarce.');
            }
        } else {
            console.log('❌ Błąd sieci: Brak dostępu do serwera.');
        }
    }
}

claim();
