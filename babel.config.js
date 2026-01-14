module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets-core/plugin', // VisionCamera frame processors
    // ... other plugins ...
    [
      'react-native-reanimated/plugin',
      {
        // Reanimated (last)
        processNestedWorklets: true,
      },
    ],
  ],
};
