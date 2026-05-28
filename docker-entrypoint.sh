#!/bin/sh
set -e

if [ -n "$DOMAIN" ] && [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "SSL certificate found for $DOMAIN, enabling HTTPS..."
    envsubst '$DOMAIN' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
else
    echo "No SSL certificate found (or DOMAIN not set), running HTTP-only..."
fi

exec nginx -g "daemon off;"
