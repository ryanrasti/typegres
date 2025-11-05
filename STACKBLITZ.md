# Deploying to StackBlitz

## Simplest Method: Import Entire Repo

Since your project is on GitHub and has multiple npm projects, you can import the entire repository:

1. **Go to StackBlitz**: [stackblitz.com](https://stackblitz.com)

2. **Import from GitHub**:
   - Click "Import from GitHub"
   - Enter your repo URL: `https://github.com/YOUR_USERNAME/YOUR_REPO`
   - Or use the direct URL: `https://stackblitz.com/github/YOUR_USERNAME/YOUR_REPO`

3. **StackBlitz will automatically**:
   - Detect the monorepo structure
   - Install dependencies from the root `package.json`
   - Look for configuration files

4. **Run the demo**:
   - The `.stackblitzrc` file tells StackBlitz to:
     - Change to `src/capnweb-demo` directory
     - Run `npm install` (to install demo-specific deps)
     - Run `npm run dev` (to start the Vite dev server)
   - Or manually run: `cd src/capnweb-demo && npm install && npm run dev`

## How It Works

- StackBlitz imports the entire repo, so all your Typegres source code is available
- The demo's imports (`from "../../types"`, etc.) will resolve correctly
- No need to copy files or create a standalone version
- All dependencies from all package.json files get installed

## Alternative: Manual Setup

If automatic detection doesn't work:

1. Import the repo
2. Open the terminal
3. Run:
   ```bash
   cd src/capnweb-demo
   npm install
   npm run dev
   ```
4. StackBlitz will show you the preview URL

## Notes

- The entire repo is available, so you can modify any Typegres code
- Changes are saved automatically
- Share the URL to let others see and edit the code
- All 3 npm projects are available in the file tree

