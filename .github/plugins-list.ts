
export interface pluginI {
  name: string;
  folderName: string;
  moduleName: string;
}

export const pluginsList: pluginI[] = [
  /*
  name: the plugins name
  folderName: the folder name in `plugins` category to find demo to testing
  moduleName: the name of the module with the demo implementation
 */

  // @nativescript/animated-circle
  // @nativescript/app-availability
  // - @nativescript/apple-pay
  // @nativescript/auto-fit-text
  // @nativescript/background-http
  // @nativescript/brightness
  // @nativescript/camera
  // @nativescript/datetimepicker
  // @nativescript/debug-ios
  // - @nativescript/detox
  // @nativescript/directions
  // @nativescript/email
  // @nativescript/fingerprint-auth
  // @nativescript/geolocation
  // - @nativescript/google-pay
  // @nativescript/imagepicker
  // @nativescript/iq-keyboard-manager
  // @nativescript/local-notifications
  // @nativescript/localize
  { name: '@nativescript/picker', folderName: 'picker', moduleName: 'PickerModule' },
  // @nativescript/shared-notification-delegate
  { name: '@nativescript/social-share', folderName: 'social-share', moduleName: 'SocialShareModule' },
  // @nativescript/zip

  //  --- Nativescript Community ---
  // - '@nativescript-community/ui-material-button',
  // - '@nativescript-community/ui-material-core',
];


// class PluginsList {
//   private _pluginsNames: string[];
//
//   get pluginsNames() {
//     if (this._pluginsNames?.length) {
//       return this._pluginsNames;
//     } else {
//       this._pluginsNames.map(item => item.name || '');
//       return this._pluginsNames;
//     }
//   }
// }
//
