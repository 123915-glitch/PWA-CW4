document.getElementById('register-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Zatrzymuje domyślne działanie formularza

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  try {
    // Wysyłanie zapytania POST do serwera backendowego
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST', // Zmieniamy metodę na POST
      headers: {
        'Content-Type': 'application/json', // Wysyłamy dane w formacie JSON
      },
      body: JSON.stringify({ name: username, email: email }), // Dane użytkownika
    });

    const result = await response.json(); // Odbieramy odpowiedź w formacie JSON

    if (response.ok) {
      console.log('Użytkownik zarejestrowany:', result);
      alert('Użytkownik został zarejestrowany!');
    } else {
      console.error('Błąd:', result.error);
      alert('Błąd podczas rejestracji: ' + result.error);
    }
  } catch (error) {
    console.error('Błąd połączenia z serwerem:', error);
    alert('Wystąpił błąd podczas rejestracji');
  }
});
