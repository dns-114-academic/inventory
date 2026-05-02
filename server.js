var express = require('express');
var mongoose = require('mongoose');
var Product = require('./models/Product');

var app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/inventaire').then(function() {
  console.log('MongoDB connecté');
}).catch(function(err) {
  console.log('Erreur MongoDB : ' + err);
});

// récuperer tous les produits 
app.get('/api/products', function(req, res) {
  var filtre = {};
  if (req.query.category) {
    filtre.category = req.query.category;
  }
  Product.find(filtre).then(function(products) {
    res.json(products);
  });
});

// ajouter un produit
app.post('/api/products', function(req, res) {
  // verifier si existe déjà
  Product.findOne({ name: req.body.name }).then(function(existing) {
    if (existing) {
      return res.status(400).json({ error: 'Ce produit existe déjà' });
    }
    var p = new Product(req.body);
    p.save().then(function(saved) {
      res.status(201).json(saved);
    }).catch(function(err) {
      res.status(400).json({ error: err.message });
    });
  });
});

// modifier le stock d'un produit
app.patch('/api/products/:id/stock', function(req, res) {
  var action = req.body.action;
  var amount = req.body.amount;

  Product.findById(req.params.id).then(function(product) {
    if (!product) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }

    if (action === 'add') {
      product.quantity = product.quantity + amount;
    } else {
      product.quantity = product.quantity - amount;
    }

    if (product.quantity < 0) {
      return res.status(400).json({ error: 'Stock insuffisant' });
    }

    product.lastUpdated = Date.now();
    product.save().then(function(updated) {
      res.json(updated);
    });
  });
});

// supprimer un produit si tock = 0
app.delete('/api/products/:id', function(req, res) {
  Product.findById(req.params.id).then(function(product) {
    if (!product) {
      return res.status(404).json({ error: 'Produit introuvable' });
    }
    if (product.quantity != 0) {
      return res.status(400).json({ error: 'Le stock doit être vide pour supprimer' });
    }
    Product.findByIdAndDelete(req.params.id).then(function() {
      res.json({ message: 'Produit supprimé' });
    });
  });
});

app.listen(3000, function() {
  console.log('Serveur lancé sur http://localhost:3000');
});