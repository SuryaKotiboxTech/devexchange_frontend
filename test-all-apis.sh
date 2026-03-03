#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "🔍 TESTING ALL API ENDPOINTS"
echo "=========================================="

# First login to get token
echo -e "\n${YELLOW}1. Getting authentication token...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST https://devexchangee.in/api/login-admin \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"admin123"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}❌ Failed to get token${NC}"
  echo $LOGIN_RESPONSE
  exit 1
else
  echo -e "${GREEN}✅ Token obtained successfully${NC}"
fi

echo -e "\n${YELLOW}2. Testing API Endpoints${NC}"
echo "=========================================="

# Array of endpoints to test
declare -a endpoints=(
  "user-info"
  "get-match-list"
  "get-sport-list"
  "bets"
  "get-market-list"
  "get-user-list"
  "accountstatements"
  "balances"
  "casinobets"
  "fancies"
)

# Test each endpoint
for endpoint in "${endpoints[@]}"; do
  echo -ne "Testing /api/${endpoint}... "
  
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X GET \
    "https://devexchangee.in/api/${endpoint}" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json")
  
  if [ "$RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ 200 OK${NC}"
  elif [ "$RESPONSE" = "401" ]; then
    echo -e "${RED}❌ 401 Unauthorized${NC}"
  elif [ "$RESPONSE" = "404" ]; then
    echo -e "${RED}❌ 404 Not Found${NC}"
  elif [ "$RESPONSE" = "502" ]; then
    echo -e "${RED}❌ 502 Bad Gateway${NC}"
  else
    echo -e "${RED}❌ ${RESPONSE}${NC}"
  fi
done

echo -e "\n${YELLOW}3. Testing WebSocket Connections${NC}"
echo "=========================================="

# Test WebSocket endpoints
websockets=(
  "wss://devexchangee.in/socket.io/?EIO=4&transport=websocket"
  "wss://devexchangee.in/ws"
)

for ws in "${websockets[@]}"; do
  echo -ne "Testing ${ws}... "
  # Quick check if port is open (not full WebSocket test)
  HOST=$(echo $ws | cut -d'/' -f3 | cut -d':' -f1)
  PORT=$(echo $ws | cut -d':' -f3 | cut -d'/' -f1)
  if [ -z "$PORT" ]; then PORT=443; fi
  
  timeout 2 nc -zv $HOST $PORT 2>/dev/null
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Port reachable${NC}"
  else
    echo -e "${RED}❌ Cannot connect${NC}"
  fi
done

echo -e "\n${YELLOW}4. Testing API Response Data${NC}"
echo "=========================================="

# Get sample data from working endpoints
echo -e "\nSample from /api/user-info:"
curl -s -X GET "https://devexchangee.in/api/user-info" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" | json_pp | head -20

echo -e "\nSample from /api/get-sport-list:"
curl -s -X GET "https://devexchangee.in/api/get-sport-list" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" | json_pp | head -20

echo -e "\n${GREEN}✅ API Testing Complete!${NC}"
