require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const sTodo = require('./models/cities');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('DB is OK'))
  .catch(() => console.log('DB failed'));
  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });

app.use(express.json());


app.post('/cities', (req, res, next) => {
  const city = new sTodo({...req.body});
  city.save().then(() => {
    res.status(201).json({
      message: 'city enregistrée'
    })
  }).catch((error) => {
    res.status(400).json({error})
  })
});

app.get('/cities', (req, res, next) => {
  sTodo.find()
  .then(todos => res.status(200).json(todos))
  .catch(error => res.status(400).json({ error }));
});

app.get('/cities/:id', (req, res, next) => {
  sTodo.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

app.put('/cities/:id', (req, res, next) => {
  sTodo.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Todo modifiée'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/cities/:id', (req, res, next) => {
  sTodo.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Todo supprimée'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;



    // /*
    //   TODO: 1 
    //   Récupérer les villes visitées depuis la base de données
    //   Remplacer "cities" par le résultat du fetch
    // */
    //   let cities = [{"CountryName":"Somaliland","CapitalName":"Hargeisa"}]
      
    //   /* 
    //     Mise à jour de l'affichage
    //   */
    //   renderCities();
  
    //   /*
    //     TODO: 2 
    //     Ajouter une ville dans la base de données
    //   */
    //   let addform = document.getElementById('addform');
  
    //   addform.addEventListener('submit', (e) => {
    //     e.preventDefault();
  
    //     /* 
    //       Récupération des données du formualire
    //     */
    //     let form = document.forms.addform;
    //     let city = form.city.value;
    //     // ...
  
    //     console.log(form);
    //     console.log(city);
  
    //     renderCities();
    //   })
  
    //   /*
    //     TODO 3: 
    //     Supprimer un élément au clic sur "Delete"
    //   */
    //  function deleteItem(){
  
    //  }
  
    //  /*
    //     TODO 4: Création d'une WishList: 
    //     Ajoutez un formulaire qui va permettre d'ajouter 
    //     une ville dans un tableau "wishlist"
  
    //     1. Création du formulaire ou réutilisaiton de celui déjà présent
    //     2. Ajouter d'un nouveau tableau 'Villes à visiter' dans la partie front
    //     3. Mettre à jour du back-end pour permettre le CRUD sur la wishlist
    //  */
  
    //   /*
    //   * On crée une nouvelle ligne dans le tableau "Cities" pour chaque ville 
    //   * du tableau "let cities = [...]"
    //   */
      
    //   }
        