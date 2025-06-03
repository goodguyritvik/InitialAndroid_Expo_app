# Test backend API endpoints for users collection using curl commands

# Base URL of your backend server (change if needed)
BASE_URL="http://localhost:3000"

echo "1. List all users"
curl -X GET "$BASE_URL/users" -H "Content-Type: application/json"
echo -e "\n"

echo "2. Create a new user"
curl -X POST "$BASE_URL/users" -H "Content-Type: application/json" -d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "role": "pilot",
  "licenseId": "LIC12345",
  "aadharNo": "AADHAR123",
  "panNo": "PAN12345",
  "location": "New York",
  "active": true,
  "completedFlights": 5
}'
echo -e "\n"

echo "3. Get user by ID (replace USER_ID with actual id)"
echo "curl -X GET \"$BASE_URL/users/USER_ID\" -H \"Content-Type: application/json\""
echo -e "\n"

echo "4. Update user by ID (replace USER_ID with actual id)"
echo "curl -X PUT \"$BASE_URL/users/USER_ID\" -H \"Content-Type: application/json\" -d '{\"active\": false}'"
echo -e "\n"

echo "5. Delete user by ID (replace USER_ID with actual id)"
echo "curl -X DELETE \"$BASE_URL/users/USER_ID\" -H \"Content-Type: application/json\""
echo -e "\n"

echo "Replace USER_ID with the actual user document ID from your Firestore or from the create response."
