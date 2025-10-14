// Mengekspor fungsi utama yang akan dijalankan oleh Vercel
export default async function handler(request, response) {
  // Pastikan metode request adalah POST, sesuai permintaan curl
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // Mengambil API Key dari Environment Variable Vercel (lebih aman)
  const apiKey = process.env.GOPHER_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'API Key for Gopher AI is not configured.' });
  }

  // URL endpoint Gopher AI
  const GopherAI_URL = "https://data.gopher-ai.com/api/v1/search/live";

  // Body request yang akan dikirim
  const requestBody = {
    type: "twitter",
    arguments: {
      type: "searchbyquery",
      query: "AI",
      max_results: 10
    }
  };

  try {
    // Melakukan panggilan API ke Gopher AI menggunakan fetch
    const gopherResponse = await fetch(GopherAI_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    // Jika Gopher AI merespon dengan error, teruskan error tersebut
    if (!gopherResponse.ok) {
      const errorData = await gopherResponse.json();
      return response.status(gopherResponse.status).json(errorData);
    }

    // Jika berhasil, ambil data JSON dari Gopher AI
    const data = await gopherResponse.json();

    // Kirim kembali data dari Gopher AI sebagai respons dari API kita
    response.status(200).json(data);

  } catch (error) {
    // Tangani jika ada error jaringan atau lainnya
    console.error('Error fetching from Gopher AI:', error);
    response.status(500).json({ error: 'Failed to fetch data from Gopher AI.' });
  }
}
