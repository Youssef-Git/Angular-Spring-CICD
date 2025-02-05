# Étape 1: Utilisation d'une image de base avec Node.js
FROM node:latest AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (si disponible)
COPY package*.json ./

# Run a clean install of the dependencies
RUN npm ci

# Copier le reste de l'application Angular
COPY . .

# Étape 2: Construire l'application Angular
RUN npm run build --configuration=production

# Étape finale : Utilisation d'une image Nginx pour servir l'application construite
FROM nginx:latest

#Copy the build output to replace the default nginx contents
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copier le dossier de build généré par Angular
COPY --from=builder /app/dist/pmt/browser /usr/share/nginx/html

# Exposer le port 80 (ou tout autre port si nécessaire)
EXPOSE 8080

# Template pour remplacer le port dans nginx.conf
CMD sed -i -e 's/$PORT/'"${PORT:-8080}"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

