import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'Language',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'Camera',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
