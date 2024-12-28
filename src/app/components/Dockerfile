FROM node:18

# Installer Chromium
RUN apt-get update && apt-get install -y chromium

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