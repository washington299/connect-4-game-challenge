## The Challenge

We have created a very simple Connect 4 game using some of our favorite [front-end technologies](#technology-choices). The rules of the game are simple: the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally) wins. There is one issue that we'd like you to solve: the logic to determine a winner does not check for 4 in a row diagonally, you should implement this logic with tests. We've also come up with a list of [possible improvements](#possible-improvements). Feel free to implement as many or as few of these as you like or try something not on this list (you have complete creative freedom). We understand that your time is precious so try not to spend more than a couple of hours on this.

### Aditional features i did

I solved the logic problem, so now we're able to determine the winner when someone get 4 in a row diagonally, and also did some aditional features like:

- Test the diagonally winner.
- Change reset modal color.
- Create a modal to get players name and color.
- Create new global state with players info.
- Show the winner based on his name.
- Make the modal 100% responsive for any devices.

## Getting Started

`npm i` - install dependences

`npm start` - run the application

`npm t` - run the tests

## Possible Improvements

- Persist game state between sessions (hint - https://recoiljs.org/docs/guides/atom-effects#local-storage-persistence)
- Record and present game stats
- Allow players to select their name and color
- Play againt a bot
- Increase unit test coverage
- Add end-to-end tests
- UX improvements
- Responsive styles
- Performance optimization

## Technology Choices

- React
- Typescript
- Create React App
- React Testing Library
- [Chakra UI](https://chakra-ui.com/docs/components)
- [RecoilJS](https://recoiljs.org/)