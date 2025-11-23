# Grimoire, a Grimwild Character Keeper

Grimoire is a character keeper for Grimwild, a tabletop role-playing game by Oddity Press. It is designed to help players manage their characters, track their progress, and export or share printable character sheets as their characters change over time.

## Core Features

- **Manage characters** that are stored in the browser's local storage. Any number of characters can be created, edited, and deleted.
- **Edit characters** with a user-friendly interface that uses a form-based approach. Core talents and some talents that require customization are editable in their own bespoke sections.
- **Export a character** either to a high-resolution PNG character sheet to print, or to a URL containing a base64-encoded JSON string, which can be shared with other players.

## Installation

To install Grimoire, clone the repository and install the required dependencies:

```bash
# Clone the repository
git clone

# Navigate to the project directory
cd grimoire

# Install the dependencies
npm install
```

## Usage

To run Grimoire, use the following command:

```bash
# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Contributing Localization

If you would like to contribute to the localization of Grimoire, please follow these steps:

1. Fork the repository.
2. Create a new branch for your localization changes.
3. Make your changes to the localization files in the `src/i18n/locales` directory.
4. Commit your changes and push them to your forked repository.
5. Create a pull request to the main repository.
6. In your pull request, please include a brief description of your changes and the language you are localizing.
7. If you are localizing a language that is already present, please include a note about the changes you made to the existing localization.
8. If you are adding a new language, please include a note about the language and any special considerations for that language.

## License

- **Code**: [MIT](./LICENSE) — free to use, modify, and distribute with attribution.

- **Game Text / Content**: Portions of this app are based on [Grimwild](https://www.drivethrurpg.com/en/product/508618/grimwild) by [Oddity Press](https://www.odditypress.com/), licensed under [Creative Commons Attribution (CC-BY 4.0)](https://creativecommons.org/licenses/by/4.0/).  
  Please credit the original authors when reusing or adapting the content.