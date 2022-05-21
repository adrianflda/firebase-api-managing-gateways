# firebase-emulator

## Creating a service account for our app

In order to access our Firestore database and admin tools from our app, we’ll need to create a service account.
To do this, click on the gear icon next to Project Overview in the left pane:

![Project Overview](/screenshots/firebase_overview.png)

From the Settings page, navigate to Service accounts, select Node.js, and click on the Generate new private key button.

This should generate a JSON configuration file for your new service account. Here’s what the JSON file should look like:

```json
{
  "type": "service_account",
  "project_id": "journal-rest-api",
  "private_key_id": "private_key_id",
  "private_key": "private_key",
  "client_email": "client_email",
  "client_id": "client_id",
  "auth_uri": "auth_url",
  "token_uri": "token_url",
  "auth_provider_x509_cert_url": "auth_provider_x509_cert_url",
  "client_x509_cert_url": "client_x509_cert_url"
}
```

## Setting up function config

Storing the needed key-value pairs as our Firebase environment variables.
For our application, we’ll need the "private_key", "project_id", and "client_email".
Let’s store these as environment variables.

```bash
cd /script

./config.env.sh PRIVATE_KEY CLIENT_ID CLIENT_EMAIL
```

## Locally initialize a Firebase project

Make sure that you install the CLI or update to its latest version.

```bash
curl -sL firebase.tools | bash
```

## Install local dependencies

```bash
cd functions
npm install
```

## Start the emulators locally

You can do:

```bash
firebase emulators:start
```

But if you want to keep the testing data then do this:

```bash
cd ..
npm run emulators:start
```
