module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@storage": "./src/storage",
          "@theme": "./src/theme",
          "@utils": "./src/utils",
          "@service": "./src/service",
          "@contexts": "./src/contexts",
          "@dtos/*": "./src/dtos/*",
          "@hooks/*": "./src/hooks/*",
          "@notifications/*": "./src/notifications/*",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
