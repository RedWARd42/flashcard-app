# Flashcard App

A simple web application for creating and managing flashcards to enhance learning anSd memorization. This was made using typescript, react, and pico css.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://example.com)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Installation

1. Open a new terminal.
2. Install the dependencies using the following command:
   ```bash
   npm install
   ```
3. Obtain a Gemini API key and add it to your `.env` file as `VITE_API_KEY`.
4. Start the local development server using the command:
   ```bash
   npm run dev
   ```
5. Open the application in your browser.

## Features

The following features are implemented:

- Users can shuffle flashcards, changing their order.
- Users can randomize cards, keeping their order.
- Users can enter information about a new cardset and generate new flashcards based on that information.
- Users can guess the answer for each flashcard.

## Usage/Examples

To use the application, simply navigate to the local server URL in your browser after starting the development server. You can create, manage, and guess flashcards from the interface.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='public\fourthIteration.gif' title='Video gif' width='' alt='Video Walkthrough' />

GIF created with ...  
[ScreenToGif](https://www.screentogif.com/) for Windows

## Notes

- The guessing button is not working after the update.
- There is some lagginess.
- A loading animation needs to be created for the flashcards and generating them.
- The links for the images after generating do not work.
- A better frontend is needed.
- A database for storing sets should be implemented.
- An input for the number of cards needs to be added.

## Contributing

We welcome contributions! Please submit a pull request or open an issue to discuss improvements.

## License

    Copyright [2025] [Ryan Edward]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
