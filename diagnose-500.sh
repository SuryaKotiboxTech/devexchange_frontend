#!/bin/bash

echo "🔍 500 Error Diagnostic"
echo "======================="

echo -e "\n1. File permissions:"
ls -ld /root/devexchange_frontend/build/
ls -l /root/devexchange_frontend/build/test.html

echo -e "\n2. Nginx user access:"
sudo -u www-data ls -la /root/devexchange_frontend/build/test.html 2>&1 || echo "❌ Cannot access"

echo -e "\n3. Nginx error log (last 10 lines):"
sudo tail -10 /var/log/nginx/error.log

echo -e "\n4. SELinux status:"
getenforce 2>/dev/null || echo "SELinux not active"

echo -e "\n5. Testing with moved files:"
sudo mkdir -p /var/www/devexchangee.in/html
sudo cp /root/devexchange_frontend/build/test.html /var/www/devexchangee.in/html/
sudo chown www-data:www-data /var/www/devexchangee.in/html/test.html
curl -s -k -o /dev/null -w "Test from /var/www: %{http_code}\n" https://devexchangee.in/test.html
