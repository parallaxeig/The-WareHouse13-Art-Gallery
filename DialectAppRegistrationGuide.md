# Dialect App Registration Guide for API Access

To integrate Dialect alerts and blinks with your X account, you need to register an app on Dialect to obtain API credentials.

## Steps to Register a Dialect App

1. Visit the Dialect Developer Portal or Dashboard:
   - URL: https://dashboard.dialect.to/ (or the URL provided in Dialect docs)

2. Sign in or create an account if you don't have one.

3. Navigate to the "App Registration" or "Create New App" section.

4. Fill in the required details:
   - App Name: Choose a descriptive name (e.g., "X Alerts Integration").
   - Redirect URI: If applicable, provide your service URL or `http://localhost` for local testing.
   - Permissions: Select permissions related to alerts and blinks access.

5. Submit the registration form.

6. After registration, note down the following credentials:
   - Client ID
   - Client Secret
   - API Key or Access Token (if provided)

7. Use these credentials in your integration service to authenticate API requests.

## Additional Resources

- Dialect API Documentation: https://docs.dialect.to/api
- Alerts API: https://docs.dialect.to/alerts/api
- Blinks API: https://docs.dialect.to/blinks/api

If you encounter any issues during registration, consult the Dialect support or documentation.

---

Once you have the credentials, please share them securely so we can proceed with the integration service development.
