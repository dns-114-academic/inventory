# Système d'Inventaire en Temps Réel (Node.js + MongoDB)


---

## Description

Application web de **gestion des stocks en temps réel**, développée avec Node.js, Express et MongoDB (via Mongoose). Chaque modification de stock impacte immédiatement l'interface et déclenche des alertes visuelles lorsque le stock passe sous un seuil d'alerte.

---

## Structure du projet

```
inventory/
├── server.js              # Serveur Express + routes API
├── package.json           # Dépendances Node.js
├── models/
│   └── Product.js         # Schéma Mongoose du produit
├── public/
│   └── index.html         # Interface web (HTML + CSS + JS vanilla)
└── en/
    └── README.md          # English version of this README
```

---

## Stack technique

| Élément | Technologie |
|---------|------------|
| Backend | Node.js + Express |
| Base de données | MongoDB (local) via Mongoose |
| Frontend | HTML / CSS / JavaScript vanilla |

---

## Modèle de données (`Product`)

| Champ | Type | Contraintes |
|-------|------|-------------|
| `name` | String | Requis, unique |
| `category` | String | Enum : Électronique, Mobilier, Consommables |
| `quantity` | Number | Minimum 0 |
| `minThreshold` | Number | Défaut 5 (seuil d'alerte) |
| `lastUpdated` | Date | Automatique à chaque modification |

---

## API REST

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/products?category=X` | Récupérer les produits (filtre optionnel par catégorie) |
| `POST` | `/api/products` | Créer un produit (erreur 400 si nom déjà existant) |
| `PATCH` | `/api/products/:id/stock` | Modifier le stock (`add` ou `remove` + montant) |
| `DELETE` | `/api/products/:id` | Supprimer un produit (uniquement si quantité = 0) |

---

## Interface web

- Formulaire de création avec validations
- Menu déroulant pour filtrer par catégorie
- Tableau/cartes des produits avec mise à jour dynamique (sans rechargement)
- Alerte visuelle (fond rouge / classe `.low-stock`) si `quantity <= minThreshold`
- Boutons `+` / `-` pour ajuster le stock via `fetch PATCH`

---

## Prérequis & Lancement

### Prérequis
- **Node.js** (v16+)
- **MongoDB** en local (port 27017)

### Installation et lancement
```bash
# Installer les dépendances
npm install

# Lancer le serveur
node server.js
# → http://localhost:3000
```

> MongoDB doit être démarré avant de lancer le serveur.
