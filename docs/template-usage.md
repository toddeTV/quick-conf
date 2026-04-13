# Template Usage Documentation

Aka. **Get started**

## Introduction

This project serves as a comprehensive and **completely free** template for creating conference and meetup websites. The template, its dependencies, and the integrated **Nuxt Studio** CMS are all free to use. It provides **visual editors**, real-time **live previews**, and a seamless updating experience directly in the browser. This effortless workflow allows organizers to focus entirely on the event content rather than the technical infrastructure.

> [!NOTE]
> Hosting and deployment are separate and might incur costs depending on your chosen provider.

## Requirements

- You need a local workspace with Node.js and a package manager of your choice (pnpm, npm, bun, or yarn). Pnpm is highly recommended as the template is developed and tested with it, but others will work as well.
- You need a Git provider to host the code. We recommend GitHub, but you can also use GitLab if you like.

  > [!TIP]
  > We highly recommend using a **public** repository. While Nuxt Studio supports private repositories, setup is more complex and prone to errors. Using a public repository aligns with the Open-Source spirit and enables community contributions (issues, PRs, etc.).

- You need a hoster to host your website for your audience. We recommend Vercel or Netlify, but others will work as well. If you aim for Docker, you need to configure this yourself, as there is no Docker preset present yet (you can contribute to the project and provide one <3).
- Within your Git provider, you need an OAuth App. This OAuth App must be linked via environment variables to your hoster. With this you will later be able to change content in the visual editor on your website directly in the browser while the OAuth App will push changes into the Git repository in the background.<br>
  (See more on [NuxtStudio Documentation for Auth Providers](https://nuxt.studio/auth-providers).)<br>
  Choose the Git provider you are using and follow the instructions:

  <details>
  <summary>1. on GitHub</summary>

  > Setup and link an OAuth App on GitHub:
  1. Open the Settings of either your account (if the OAuth App should live within your own account) or of an organization (if the OAuth App should live within an organization). Go to "Developer settings", click on "OAuth Apps" and click the button "New OAuth App".
  2. Fill out all fields like the following:

     | Field                      | Value                                                                   |
     | -------------------------- | ----------------------------------------------------------------------- |
     | Application name           | What you like, best practice is to set the name of the conference       |
     | Homepage URL               | `https://example.com` (use your real domain!)                           |
     | Authorization callback URL | `https://example.com/__nuxt_studio/auth/github` (use your real domain!) |
     | Enable Device Flow         | FALSE                                                                   |

  3. On the detail page of your new GitHub OAuth App, generate a Client Secret.
  4. Copy the following:
     - **Client ID** (the GitHub OAuth Client App ID, always visible)
     - **Client Secret** (One Secret inside your GitHub OAuth App, only visible _once_ after creating.)
  5. Copy the two variables inside the following environment variables on your hoster:

     ```env
     STUDIO_GITHUB_CLIENT_ID=<your_client_id>
     STUDIO_GITHUB_CLIENT_SECRET=<your_client_secret>
     # Optional: Restrict access to specific users
     # STUDIO_GITHUB_MODERATORS=admin@example.com,editor@example.com
     ```

  </details>

  <details>
  <summary>2. on GitLab</summary>

  > Setup and link an OAuth App on GitLab:
  1. Go to [User Settings → Applications](https://gitlab.com/-/user_settings/applications) (or your group/organization settings) and create a "New Application".
  2. Fill out all fields like the following:

     | Field            | Value                                                                   |
     | ---------------- | ----------------------------------------------------------------------- |
     | Application name | What you like, best practice is to set the name of the conference       |
     | Redirect URI     | `https://example.com/__nuxt_studio/auth/gitlab` (use your real domain!) |
     | Scopes           | Select `api` (required)                                                 |

  3. On the detail page of your new GitLab OAuth App, copy the following:
     - **Application ID** (visible immediately)
     - **Secret** (visible immediately)
  4. Copy the two variables inside the following environment variables on your hoster:

     ```env
     STUDIO_GITLAB_APPLICATION_ID=<your_client_id>
     STUDIO_GITLAB_CLIENT_SECRET=<your_client_secret>
     # Optional: Restrict access to specific users
     # STUDIO_GITLAB_MODERATORS=admin@example.com,editor@example.com
     ```

  </details>

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

   </details>

2. Open the file `content/0.custom-config.json` locally. Search and set the following variables with your real data:

   ```jsonc
   {
     // [...]
     "nuxtStudio": {
       "i18n": {
         "defaultLocale": "en"
       },
       "repository": {
         "branch": "...", // Most of the time `main` or `master`
         "owner": "...", // The owner of the Git repository
         "provider": "...", // The git provider, only `github` or `gitlab` is allowed
         "repo": "..." // The name of the Git repository
       }
     }
     // [...]
   }
   ```

3. Test locally if the project runs and that there are no errors.
4. **IMPORTANT:** The folders `/content` and `/public` contain example data not covered under the MIT license. Replace all example content in these folders with your own data before pushing, as you most likely do not have permission to redistribute the example content.<br>
   **IMPORTANT:** Ensure that the file `public/custom-styles.css` exists and contains your own content, as it is needed!
5. Push the files that the CLI made onto the main branch of your repository.<br>
   Now you have a repository with the base code of the template online in a Git repository.

   > [!IMPORTANT]
   > Make sure you also generated and pushed a package manager lockfile into your repository, as your hoster may need it!

6. Now, host your website and add a Git workflow so that your Git provider or hoster will build a new application every time your main branch has a new version (this is important for the Git-based CMS the project uses).
7. After your website is hosted and deployed, you have to log in to access the CMS for administrative functionality by doing the following:
   1. Open the deployed website in your browser.
   2. Then you can go on by one of the following methods:
      1. Method 1: When `footer -> bottomIcons -> showAdminLink` is enabled, you can access the NuxtStudio CMS UI by clicking the Admin-Icon link in the footer (this is enabled by default unless you disabled showAdminLink).
      2. Method 2 (always works): Manually add the suffix `/_admin` (e.g. `https://<YOUR-URL>/_admin`) to the URL in your browser.
   3. Then authorize your Application in your Git provider. After that you'll be redirected back to your website.
   4. You are now back on your website, now wait a moment. After a little wait, you will see an icon in the bottom left corner. That is the Toggle to open the CMS sidebar and in this sidebar you can visually edit your pages. Do that and edit whatever you want - pages, content and configs.
   5. **Note**: You should edit `Custom Config` (`0.custom-config.json`) in the CMS (under `Content`) as soon as possible after your first installation as there are important things that apply to the full website. So carefully go through all settings there, set them and then save and persist your changes to rebuild the website on your hoster.
8. Enjoy :)

> [!NOTE]
> Changes made in the CMS are only visible to you until saved in the sidebar. Save your updates to make them public. After saving, it takes about 2–10 minutes for changes to go live while the website rebuilds. Avoid saving too frequently; each save triggers a new build, and you may be charged per build depending on your hosting provider.
>
> Some icons can stay invisible in live preview until the next rebuild and redeploy, even when the icon name is valid; see [Icons Set in Nuxt Studio CMS](./icon-usage.md#icons-set-in-nuxt-studio-cms).

### License Compliance

Please be aware that the `/content` and `/public` folders in this template contain example data, including images and text, which are not covered under the MIT license of the code.

**Important:** You must replace all example content in the `/content` and `/public` folders with your own assets and information to ensure you are not infringing on any copyrights or usage rights associated with the placeholder data.

**Essential Files**: The file `public/custom-styles.css` is required for the project to function correctly. While you must not use the provided example content directly, these files must remain in place. You should update their contents according to your project's needs (e.g., updating any variables or site-specific rules).

### Static Asset Upload Path

Store user-uploaded images and files in `/public/assets/` and reference them via `/assets/...` URLs.

- Keeps one clear namespace for CMS and content media.
- Keeps catch-all route checks focused on known static paths.
- Makes maintenance easier when static media lives in one folder.

Root-level files in `/public/` still work and are served by the app. Keep root files for web-standard entries such as `/favicon.ico`, etc.

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
   - The `/.github/` directory (your workflows and settings)
   - The `/content/` directory (your talks, speakers, pages, etc.)
   - The `/public/` directory (your static assets)
   - The `/.env` file (your environment configuration)
   - The `/LICENSE.md` file
   - The `/README.md` file
   - The `.git` folder (your version control history)
   - IDE configuration folders (e.g. `.vscode/`, `.idea/`)
   - Specific fields in `/package.json`: `name`, `author`, `contributors`, `description`, `repository`, `bugs`, and `keywords`

   Additionally, the process automatically removes template-specific files and folders (like `docs`, `renovate.json`, and release configuration files) that are not needed in your end-project. You should create your own infrastructure files for your custom needs.

6. **Migrations:**<br>
   When updating between versions, there might be breaking changes or required data structure updates. Migration guides are available to help you transition smoothly.<br>
   You can access these guides in two ways:
   1. Via the CLI tool during the update process or via the option **View Migration Notes** in the Main Menu.
   2. By checking the `docs/migrations` folder in the repository.
7. Test locally if the project runs and that there are no errors.
8. Push the changes that the CLI made onto the main branch of your repository.

> [!IMPORTANT]
> Make sure you also generated and pushed a package manager lockfile into your repository, as your hoster may need it!
