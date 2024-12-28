# Étape 1 : Utiliser l'image de Node.js
FROM node:18-buster AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour l'installation des dépendances
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le code source du projet
COPY . .

# Étape 2 : Installer Chromium et dépendances nécessaires
RUN apt-get update && apt-get install -y \
    chromium \
    libstdc++6 \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    libx11 \
    libxcb \
    libxcomposite \
    libxrandr \
    libxi \
    libxtst \
    libxrender \
    libxdamage \
    libnss3 \
    wget \
    && rm -rf /var/lib/apt/lists/*

# # Étape 3 : Créer un utilisateur non-root pour exécuter ChromeHeadless
# RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
#     && mkdir -p /home/pptruser/Downloads \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /node_modules

# # Passer à l'utilisateur non-root
# USER pptruser

# Étape 4 : Exposer le port pour servir l'application (si vous avez un front à tester)
EXPOSE 4200

# Étape 5 : Exécuter les tests avec ChromeHeadless
CMD ["npm", "run", "test", "--", "--browsers=ChromeHeadlessNoSandbox", "--watch=false"]
