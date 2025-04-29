#!/bin/sh

# Reemplazar variables de entorno en los archivos JavaScript
if [ -n "$VITE_API_URL" ]; then
  echo "Configurando API URL: $VITE_API_URL"
  find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|http://localhost:3000|$VITE_API_URL|g" {} \;
fi

# Ejecutar el comando pasado (nginx)
exec "$@" 