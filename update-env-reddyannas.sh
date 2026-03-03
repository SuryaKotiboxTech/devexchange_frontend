#!/bin/bash

echo "🔄 Updating environment with Reddyannas API..."

cd /root/devexchange_frontend

# Backup current .env.production
cp .env.production .env.production.backup

# Create new .env.production
cat > .env.production << 'ENV'
REACT_APP_API_KEY = 'my-secret-api-key'
REACT_APP_API_BASEURL = 'https://devexchangee.in/api/'
REACT_APP_API_SPORTS_URL = 'https://api.reddyannas.live/api/'
REACT_APP_API_SPORTS_FANCY_URL = 'https://api.reddyannas.live/api/'
REACT_APP_API_SOCKET_URL = 'wss://api.reddyannas.live/'
REACT_APP_IP_API_URL="https://ipapi.co/json"
REACT_APP_USER_SOCKET="wss://api.reddyannas.live/"
GENERATE_SOURCEMAP=false;
REACT_APP_CASINO_SOCKET_URL = 'wss://api.reddyannas.live/'
REACT_APP_T10_STREAM = 'https://marketsarket.qnsports.live/virtualgames'
REACT_APP_PYTHON_SERVER='http://127.0.0.1:5000/api/'
REACT_APP_SITE_URL="https://devexchangee.in"
ENV

echo "✅ Environment updated!"

# Rebuild
echo "🏗️ Rebuilding frontend..."
npm run build

# Copy to web directory
echo "📂 Copying to web directory..."
sudo cp -r build/* /var/www/devexchangee.in/html/
sudo chown -R www-data:www-data /var/www/devexchangee.in/html

echo "✅ All done! New API URLs:"
grep -E "SPORTS|SOCKET|USER_SOCKET|CASINO" .env.production
