# Étape 1 : Construire l'application Angular
FROM node:18 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application pour la production
RUN npm run build -- --output-path=dist/app --configuration=production

# Étape 2 : Préparer l'environnement pour exécuter Chrome et installer libstdc++
FROM nginx:stable-alpine

# Installer les dépendances nécessaires pour Chromium et libstdc++@edge
RUN apk update && apk add --no-cache \
    chromium \
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
    libstdc++@edge 

# Ajouter un utilisateur non-root pour plus de sécurité
RUN adduser -D -u 1000 user
USER user

# Copier les fichiers construits par Angular dans le répertoire de Nginx
COPY --from=build /app/dist/app /usr/share/nginx/html

# Copier la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour le service HTTP
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
