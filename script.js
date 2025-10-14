document.getElementById('fetchButton').addEventListener('click', fetchData);

async function fetchData() {
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');
    
    // Tampilkan loading dan bersihkan hasil sebelumnya
    loadingDiv.style.display = 'block';
    resultsDiv.innerHTML = '';

    const url = 'https://data.gopher-ai.com/api/v1/search/live';
    const bearerToken = '6va0qP333OhXVdQ9qbqWBVYrThMb9YHxeukQF61jaA2XLtrS'; // Token Anda

    const requestBody = {
        type: 'twitter',
        arguments: {
            type: 'searchbyquery',
            query: 'AI',
            max_results: 10
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayData(data.results); // Asumsi data ada di dalam 'results'

    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red;">Gagal mengambil data: ${error.message}</p>`;
        console.error('Error fetching data:', error);
    } finally {
        // Sembunyikan loading
        loadingDiv.style.display = 'none';
    }
}

function displayData(tweets) {
    const resultsDiv = document.getElementById('results');
    if (!tweets || tweets.length === 0) {
        resultsDiv.innerHTML = '<p>Tidak ada data yang ditemukan.</p>';
        return;
    }

    tweets.forEach(tweet => {
        const tweetElement = document.createElement('div');
        tweetElement.className = 'tweet';
        tweetElement.innerHTML = `
            <p>${tweet.text}</p>
            <a href="${tweet.url}" target="_blank">Lihat di Twitter</a>
        `;
        resultsDiv.appendChild(tweetElement);
    });
}
