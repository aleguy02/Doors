/*  Set up tailwind and firebase  */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
// upgrading to Expo SDK 53 broke Firebase, add this line to fix
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './app/globals.css' });
