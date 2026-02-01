const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {  // Prevent Metro from watching transient build folders that appear/disappear on Windows
    watchFolders: [],
    resolver: {},
    watcher: {
        // Helps on Windows when folders change quickly during Gradle builds
        unstable_lazySha1: true,
    }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
