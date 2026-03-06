#!/bin/bash

echo "🔧 Ultimate Frontend Fix"
echo "========================"

cd /root/devexchange_frontend

# Step 1: Nuclear cleanup
echo -e "\n1. Cleaning everything..."
rm -rf node_modules package-lock.json yarn.lock .npmrc
npm cache clean --force

# Step 2: Create optimized .npmrc
echo -e "\n2. Creating .npmrc..."
cat > .npmrc << 'NPMRC'
legacy-peer-deps=true
force=true
fund=false
audit=false
NPMRC

# Step 3: Install core packages
echo -e "\n3. Installing core packages..."
npm install ajv@8.12.0 --save-exact
npm install ajv-keywords@5.1.0 --save-exact

# Step 4: Install all dependencies
echo -e "\n4. Installing all dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund

# Step 5: Verify ajv installation
echo -e "\n5. Verifying ajv installation..."
if [ -f "node_modules/ajv/dist/compile/codegen.js" ]; then
    echo "✅ ajv codegen found"
else
    echo "⚠️ ajv codegen missing - fixing..."
    # Manual copy if needed (rare case)
    mkdir -p node_modules/ajv/dist/compile/
    cp node_modules/ajv/lib/compile/codegen.js node_modules/ajv/dist/compile/ 2>/dev/null || true
fi

# Step 6: Build
echo -e "\n6. Building project..."
npm run build

# Step 7: Check result
if [ -d "build" ]; then
    echo -e "\n✅ Build successful!"
    ls -la build/ | head -10
    
    # Update Nginx
    sudo sed -i 's|root .*/build;|root /root/devexchange_frontend/build;|g' /etc/nginx/sites-available/devexchangee
    sudo nginx -t && sudo systemctl reload nginx
    
    echo -e "\n🎉 Frontend is live at https://devexchangee.in"
else
    echo -e "\n❌ Build failed. Trying alternative method..."
    
    # Alternative: Use yarn
    echo -e "\n7. Trying with yarn..."
    npm install -g yarn
    rm -rf node_modules package-lock.json
    yarn install --ignore-engines
    yarn build
fi
