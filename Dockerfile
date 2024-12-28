# Étape 1 : Construire l'application Angular
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendance
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construction de l'application 
RUN npm run build --prod

# Étape 2 : Servir l'application avec nginx
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape 1
COPY --from=build /app/dist/pmt/ /usr/share/nginx/html

# Exposer le port 80 (le port par défaut de nginx)
EXPOSE 80

# Lancer nginx en mode "démon"
CMD ["nginx", "-g", "daemon off;"]
