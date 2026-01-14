# Template Usage Documentation

Aka. **Get started**

## Introduction

This project serves as a comprehensive and **completely free** template for creating conference and meetup websites. The template, its dependencies, and the integrated **Nuxt Studio** CMS are all free to use. It provides **visual editors**, real-time **live previews**, and a seamless updating experience directly in the browser. This effortless workflow allows organizers to focus entirely on the event content rather than the technical infrastructure.

> [!NOTE]
> Hosting and deployment are separate and might incur costs depending on your chosen provider.

## Requirements

- You need a local workspace with Node.js and a package manager of your choice (pnpm, npm, bun, or yarn). Pnpm is highly recommended as the template is developed and tested with it, but others will work as well.
- You need a Git provider to host the code. We recommend GitHub, but other Git providers will work as well.
- You need a hoster to host your website for your audience. We recommend Vercel or Netlify, but others will work as well. If you aim for Docker, you need to configure this yourself, as there is no Docker preset yet (you can contribute to the project and provide one <3).

## First Installation

For easily managing the template, we provide a CLI tool to streamline the process. This CLI helps you install and update the template while preserving your content.

1. You have two options to start with your first installation. Choose carefully and only use one of them:

   <details>
   <summary>1. Use GitHub Template Function (recommended if you use GitHub)</summary>

   > It is highly recommended to use this method if you want to host your code on GitHub.
   1. Log in to your GitHub Account.
   2. Go to the main page of the project: [https://github.com/toddeTV/quick-conf](https://github.com/toddeTV/quick-conf)
   3. Click the button `Use this template` on the top right and then click on `Create a new repository`:
      ![GitHub Use Template Button](./assets/template-usage/github-use-template.png 'GitHub Use Template Button')
   4. Fill out the form as you like. You can leave all fields as they are except `Owner` and `Repository name` under General; pick these carefully. Then click on `Create repository` on the bottom right of the form to confirm. Now you have successfully created a new repository with the template.
   5. Pull your own repository that you just created into a local workspace.
   6. Open a terminal inside the pulled workspace.
   7. Execute the following command:

      ```bash
      node quick-conf-cli.mjs
      ```

   8. Read and confirm the first few prompts until you are in the **Main Menu**.
   9. Here, choose **Fresh Installation after using the Template on GitHub**. Answer the questions and go through the wizard. This will ensure the correct name is set for your project and more. Be aware that everything should run smoothly without any errors. If some occur, fix them.
   10. Test locally if the project runs and that there are no errors.
   11. **IMPORTANT:** The folders `/content` and `/public` contain example data not covered under the MIT license. Replace all example content in these folders with your own data before pushing, as you most likely do not have permission to redistribute the example content.<br>
       **IMPORTANT:** Ensure that the files `public/robots.txt` and `public/custom-styles.css` exist but contain your own content, as they are needed!
   12. Push the changes that the CLI made onto the main branch of your repository.

   </details>

   <details>
   <summary>2. Use our custom CLI Tool (recommended only if you are outside of GitHub)</summary>

   > It is recommended to use this method if you want to host your code on another Git provider than GitHub.
   1. Download the CLI tool into an empty folder in a local workspace. Therefore you have multiple options; choose wisely and select only one:

      <details>
      <summary>1. Via terminal</summary>

      > Open a Terminal inside your empty workspace folder.
      - For Linux & macOS:

      ```bash
      curl -o quick-conf-cli.mjs https://raw.githubusercontent.com/toddeTV/quick-conf/main/quick-conf-cli.mjs
      ```

      - For Windows (PowerShell):

        ```powershell
        iwr https://raw.githubusercontent.com/toddeTV/quick-conf/main/quick-conf-cli.mjs -OutFile quick-conf-cli.mjs
        ```

      </details>

      <details>
      <summary>2. Manually</summary>

      Download the [`quick-conf-cli.mjs`](https://raw.githubusercontent.com/toddeTV/quick-conf/refs/heads/main/quick-conf-cli.mjs) file directly from the repository and save it to your project folder.

      </details>

   2. Open a terminal inside the pulled workspace.
   3. Execute the following command:

      ```bash
      node quick-conf-cli.mjs
      ```

   4. Read and confirm the first few prompts until you are in the **Main Menu**.
   5. Here, choose **Fresh Installation in an empty folder**. Answer the questions and go through the wizard. This will ensure the correct name is set for your project and more. Be aware that everything should run smoothly without any errors. If some occur, fix them.
   6. Test locally if the project runs and that there are no errors.
   7. **IMPORTANT:** The folders `/content` and `/public` contain example data not covered under the MIT license. Start and test the template locally, then replace all example content in these folders with your own data before pushing, as you most likely do not have permission to redistribute the example content.<br>
      **IMPORTANT:** Ensure that the files `public/robots.txt` and `public/custom-styles.css` exist but contain your own content, as they are needed!
   8. Push the files that the CLI made onto the main branch of your repository.

   </details>

2. Now you have a repository with the base code of the template online in a Git repository.
3. Now, host your website and add a Git workflow so that your Git provider or hoster will build a new application every time your main branch has a new version (this is important for the Git-based CMS the project uses).
4. After your website is hosted and deployed, open the deployed website with suffix `_studio` (e.g. `https://<YOUR-URL>/_studio`) and authorize your Application in your GIT provider. After that you'll be redirected back to Studio ready to edit your content.
5. Enjoy :)

### License Compliance

Please be aware that the `/content` and `/public` folders in this template contain example data, including images and text, which are not covered under the MIT license of the code.

**Important:** You must replace all example content in the `/content` and `/public` folders with your own assets and information to ensure you are not infringing on any copyrights or usage rights associated with the placeholder data.

**Essential Files**: The files `public/robots.txt` and `public/custom-styles.css` are required for the project to function correctly. While you must not use the provided example content directly, these files must remain in place. You should update their contents according to your project's needs (e.g., updating any variables or site-specific rules).

## Updating the Template

If you have already set up your conference website and want to pull in the latest features and bug fixes from the `quick-conf` template, you can do the following:

1. Pull your code from your repository into a local workspace.
2. Open your workspace in a terminal.
3. Execute the following command:

   ```bash
   node quick-conf-cli.mjs
   ```

4. Read and confirm the first few prompts until you are in the **Main Menu**.
5. Here, choose **Update**. Answer the questions and go through the wizard. This will ensure to set the correct name for your project and more. Be aware that everything runs smoothly without any errors. If some occur, fix them. This process is designed to safely update the core application files while preserving your custom data. Specifically, it will preserve:
   - The `/content/` directory (your talks, speakers, pages, etc.)
   - The `/public/` directory (your static assets)
   - The `/.env` file (your environment configuration)
6. **Migrations:**<br>
   When updating between versions, there might be breaking changes or required data structure updates. Migration guides are available to help you transition smoothly.<br>
   You can access these guides in two ways:
   1. Via the CLI tool during the update process or via the option **View Migration Notes** in the Main Menu.
   2. By checking the `docs/migrations` folder in the repository.
7. Test locally if the project runs and that there are no errors.
8. Push the changes that the CLI made onto the main branch of your repository.
