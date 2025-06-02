# Chrome Tab Manager

A Chrome extension to efficiently manage and organize your open tabs and bookmarks using Markdown link files.

## Features
- Upload Markdown files containing links and load them as bookmarks in the browser

## Todo
- Search and filter tabs by title or URL

## Installation

1. Clone or download this repository.
2. Go to `chrome://extensions/` in Chrome.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the extension folder.

## Usage

- Click the extension icon to open the popup.
- Upload a Markdown file with links to import them as bookmarks.
- Manage your open tabs and imported bookmarks from the popup.

## Permissions

- `tabs`: To view and manage open tabs.
- `bookmarks`: To create and organize bookmarks from uploaded Markdown files.
- `storage`: To save user preferences and imported bookmarks.

## Development

- To build or modify the extension, edit the files in the `src` folder.
- Key files:
    - `popup.html` / `popup.js`: Main popup UI and logic
    - `background.js`: Handles background tasks
    - `manifest.json`: Extension configuration

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

MIT License

## Contact

For support or questions, open an issue on GitHub.