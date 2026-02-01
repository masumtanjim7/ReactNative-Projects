module.exports = function (api) {
    api.cache(true);

    const nativewind = require('nativewind/babel');
    const nativewindPlugin = nativewind.default ?? nativewind;

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            nativewindPlugin,
            require('react-native-reanimated/plugin'),
        ],
    };
};
