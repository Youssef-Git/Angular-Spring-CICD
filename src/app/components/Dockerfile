# Étape 1 : Construire l'application Angular
FROM node:18 as build

# Installer Chromium
RUN apk add --no-cache chromium

# Définir les variables d'environnement
ENV CHROME_BIN=/usr/bin/chromium

# Installer les dépendances de votre application
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copier le reste de votre application
COPY . .

# Exécuter les tests
CMD ["npm", "test"]