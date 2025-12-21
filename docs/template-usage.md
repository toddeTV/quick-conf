# Template Usage Documentation

## Introduction

This project serves as a comprehensive template for creating conference and meetup websites. It is designed to be easily configurable and deployable, allowing organizers to focus on the event content rather than the technical infrastructure.

## Installation

To get started with a new conference website using this template, we provide a CLI tool to streamline the process.

### Using the CLI Tool

Open the terminal and navigate inside the folder you want the project to be installed. Here you need the CLI tool. Get it by downloading it from the repository or via one of the following commands:

- For Linux & macOS:

  ```bash
  curl -o quick-conf-cli.mjs https://raw.githubusercontent.com/toddeTV/quick-conf/main/quick-conf-cli.mjs
  ```

- For Windows (PowerShell):

  ```powershell
  iwr https://raw.githubusercontent.com/toddeTV/quick-conf/main/quick-conf-cli.mjs -OutFile quick-conf-cli.mjs
  ```

- **Manual Download:**
  You can also simply download the `quick-conf-cli.mjs` file directly from the repository and save it to your project folder.

After that execute the CLI tool:

```bash
node quick-conf-cli.mjs
```

When you run this command, you will be presented with options. Choose **"Fresh Installation"** to set up a new project. This will guide you through creating the necessary directory structure and installing dependencies.

## License Compliance

Please be aware that the `content/` folder in this template contains example data, including images and text, which may not be covered under the MIT license of the code.

**Important:** You should replace all example content in the `content/` folder with your own assets and information to ensure you are not infringing on any copyrights or usage rights associated with the placeholder data.

## Updating the Template

If you have already set up your conference website and want to pull in the latest features and bug fixes from the `quick-conf` template, you can use the CLI tool for this as well.

Run the CLI tool again:

```bash
node quick-conf-cli.mjs
```

(Or download it again if you don't have it locally).

Select the **"Update"** feature. This process is designed to safely update the core application files while preserving your custom data. Specifically, it will preserve:

- The `content/` directory (your talks, speakers, pages, etc.)
- The `app/public/` directory (your static assets)
- The `.env` file (your environment configuration)

## Migrations

When updating between versions, there might be breaking changes or required data structure updates. Migration guides are available to help you transition smoothly.

You can access these guides:

1.  Via the CLI tool during the update process.
2.  By checking the `docs/migrations` folder in the repository.
