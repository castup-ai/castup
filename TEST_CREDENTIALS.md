# Test User Credentials for Local Development

## Test Account

Use these credentials to login and test the application locally:

```
📧 Email: test@castup.com
🔑 Password: test123
```

## User Details

- **Name:** Test User
- **Department:** Actor
- **Email:** test@castup.com

## How to Login

1. Open your browser and navigate to: `http://localhost:3000`
2. Click on the "Login" button
3. Enter the credentials above:
   - Email: `test@castup.com`
   - Password: `test123`
4. Click "Login" or "Sign In"

## Creating Additional Test Users

If you need to create more test users, you can either:

### Option 1: Use the Signup Page
1. Navigate to `http://localhost:3000/signup`
2. Fill in the registration form
3. Create a new account

### Option 2: Run the Test User Script
You can modify the `create-test-user.js` script in the backend folder to create different test users:

```bash
cd backend
node create-test-user.js
```

## Troubleshooting

### Backend Not Running
If login fails, make sure the backend server is running:

```bash
cd backend
npm run dev
```

The backend should be running on `http://localhost:5000` (or check your .env file for the PORT)

### Frontend Not Running
Make sure the frontend is running:

```bash
npm run dev
```

The frontend should be running on `http://localhost:3000`

### Database Connection Issues
If you see database errors, ensure:
1. PostgreSQL is running
2. The DATABASE_URL in `backend/.env` is correct
3. The database tables have been created

## Current Server Status

✅ **Frontend:** Running on `http://localhost:3000`
✅ **Backend:** Running (check console for port)
✅ **Test User:** Created and ready to use

## Next Steps

Once logged in, you can:
- Navigate to your profile to see the new Instagram-style interface
- Upload photos and videos to your portfolio
- Edit your social media links
- View and manage connections
- Explore other features of CastUp
