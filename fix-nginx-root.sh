#!/bin/bash

echo "🔧 Fixing Nginx root path..."

# Update the root path in Nginx config
sudo sed -i 's|root /var/www/devexchangee.in/html;|root /root/devexchange_frontend/build;|g' /etc/nginx/sites-available/devexchangee

# Test and reload
sudo nginx -t && sudo systemctl reload nginx

echo -e "\n📡 Testing..."
echo -n "HTTP: "
curl -s -o /dev/null -w "%{http_code}" http://devexchangee.in/
echo -n " HTTPS: "
curl -s -k -o /dev/null -w "%{http_code}" https://devexchangee.in/

echo -e "\n\n✅ Fix applied! Your frontend should now load."
