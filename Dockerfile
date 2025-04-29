FROM node:21-alpine as build

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY eslint.config.js ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY src/ ./src/
COPY public/ ./public/

# Construir la aplicación
RUN npm run build

# Imagen de producción
FROM nginx:alpine

# Copiar la aplicación construida
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración de nginx personalizada si es necesaria
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Archivo de configuración para variables de entorno en tiempo de ejecución
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"] 