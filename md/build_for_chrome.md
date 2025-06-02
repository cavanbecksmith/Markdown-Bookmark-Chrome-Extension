# Steps to create a build for a Chrome plugin (extension):

1. Place your extension files (manifest.json, JS, HTML, CSS, icons, etc.) in a folder, e.g., `my-extension/`.

2. (Optional) Minify/optimize your code and assets for production.

3. Ensure your `manifest.json` is correct and references all needed files.

4. To build (package) your extension:
    - Open Chrome and go to `chrome://extensions/`
    - Enable "Developer mode" (top right)
    - Click "Pack extension"
    - Select your extension's root folder
    - Click "Pack Extension"

5. Chrome will generate a `.crx` file (the packaged extension) and a `.pem` private key.

6. Distribute the `.crx` file or upload your folder to the Chrome Web Store.

# Example folder structure:
my-extension/
  ├── manifest.json
  ├── background.js
  ├── popup.html
  ├── popup.js
  └── icons/
          └── icon.png

# Note: For publishing, zip the folder (not the .crx) and upload to the Chrome Web Store.