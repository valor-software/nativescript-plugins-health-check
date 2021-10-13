
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
  // { name: '@nativescript/animated-circle', folderName: 'animated-circle', moduleName: 'AnimatedCircleModule' },
  // { name: '@nativescript/appavailability', folderName: 'appavailability', moduleName: 'AppavailabilityModule' },
  // - @nativescript/apple-pay
  // { name: '@nativescript/auto-fit-text', folderName: 'auto-fit-text', moduleName: 'AutoFitTextModule' },
  // { name: '@nativescript/background-http', folderName: 'background-http', moduleName: 'BackgroundHttpModule' },
  // { name: '@nativescript/brightness', folderName: 'brightness', moduleName: 'BrightnessModule' },
  // { name: '@nativescript/camera', folderName: 'camera', moduleName: 'CameraModule' },
  // { name: '@nativescript/datetimepicker', folderName: 'datetimepicker', moduleName: 'DatetimepickerModule' },
  // { name: '@nativescript/debug-ios', folderName: 'debug-ios', moduleName: 'DebugIosModule' },
  // - @nativescript/detox
  // { name: '@nativescript/directions', folderName: 'directions', moduleName: 'DirectionsModule' },
  // { name: '@nativescript/email', folderName: 'email', moduleName: 'EmailModule' },
  // { name: '@nativescript/fingerprint-auth', folderName: 'fingerprint-auth', moduleName: 'FingerprintAuthModule' },
  // { name: '@nativescript/geolocation', folderName: 'geolocation', moduleName: 'GeolocationModule' },
  // - @nativescript/google-pay
  // { name: '@nativescript/imagepicker', folderName: 'imagepicker', moduleName: 'ImagepickerModule' },
  // { name: '@nativescript/iqkeyboardmanager', folderName: 'iqkeyboardmanager', moduleName: 'IqkeyboardmanagerModule' },
  // { name: '@nativescript/local-notifications', folderName: 'local-notifications', moduleName: 'LocalNotificationsModule' },
  // { name: '@nativescript/localize', folderName: 'localize', moduleName: 'LocalizeModule' },
  { name: '@nativescript/picker', folderName: 'picker', moduleName: 'PickerModule' },
  // { name: '@nativescript/shared-notification-delegate', folderName: 'shared-notification-delegate', moduleName: 'SharedNotificationDelegateModule' },
  { name: '@nativescript/social-share', folderName: 'social-share', moduleName: 'SocialShareModule' },
  // { name: '@nativescript/zip', folderName: 'zip', moduleName: 'ZipModule' },

  //  --- Nativescript Community ---
  // - '@nativescript-community/ui-material-button',
  // - '@nativescript-community/ui-material-core',
];
