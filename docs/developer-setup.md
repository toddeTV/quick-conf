# Development Environment Setup

This guide provides instructions for setting up your local development environment for the Nuxt project. Follow these steps to get the application running.

## 1. Prerequisites

To set up your development environment, ensure your system meets the Node.js and pnpm version requirements specified in the `engines` field of the `package.json` file.

## 2. Clone the Repository

Clone the project repository to your local machine in a folder of your choice and open it.

## 3. Install Dependencies

Install the project dependencies by executing the following command:

```bash
pnpm i --frozen-lockfile --prefer-offline
```

This command will:

1. Install all project dependencies
1. Run Nuxt prepare steps
1. Run `postinstall` script if present

## 4. Environment Variables

Duplicate the `.env.example` as `.env` and fill out all necessary variables for your environment.

## 5. Start the Development Server

Once dependencies are installed and environment variables are configured, you can start the Nuxt development server and use the project, see [package.json](/package.json) for available script commands.
