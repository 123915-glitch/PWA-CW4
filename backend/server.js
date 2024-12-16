const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../public')); // Obsługuje pliki statyczne (frontend)

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Połączono z MongoDB'))
  .catch(err => console.error('Błąd połączenia z MongoDB:', err));

const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
}));

app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Użytkownik o tym e-mailu już istnieje!' });
      }
      const newUser = new User({ name, email });
      await newUser.save();
  
      res.status(201).json({ message: 'Użytkownik utworzony!', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Błąd podczas tworzenia użytkownika' });
    }
  });
  

app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    console.log('Otrzymane dane:', req.body); // Sprawdź, czy dane przychodzą poprawnie
  
    try {
      const newUser = new User({ name, email });
      await newUser.save();
      res.status(201).json({ message: 'Użytkownik utworzony!', user: newUser });
    } catch (error) {
      console.error('Błąd podczas tworzenia użytkownika:', error);
      res.status(500).json({ error: 'Błąd podczas tworzenia użytkownika' });
    }
  });
  


// Nasłuchiwanie na porcie 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
