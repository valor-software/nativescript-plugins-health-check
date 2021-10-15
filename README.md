
# What is this project for?

The purpose of this project is to check the health of the NativeScript plugins
added to this project for testing. Github use actions to run this project once a day
to find the latest plugin versions and make a builds with them to check if they work.

You can find the result of the plugins build at the following file:

**[PLUGINS_COMPATIBILITY.md](PLUGINS_COMPATIBILITY.md)**


## How does it fork?

Currently, this workspace contains several projects with own dependencies,
for which [plugins](.github/plugins-list.ts) are installed and builds are created
one by one to check compatibility in different environments:  android, iOS,
NativeScript, angular so on.

- ns-7-angular/
  ```
    NativeScript 7.2.1
    angular 11.2.0
    typescript 4.0.0
  ```
- ns-8-angular/
  ```
    NativeScript 8.1.2
    angular 12.2.0
    typescript 4.2.5
  ```
At the end of the build, the result is recorded in the [PLUGINS_COMPATIBILITY.md](PLUGINS_COMPATIBILITY.md)
(success or failed). You can also find the status for each plugin
in the `report` folder (*.json format). Json files keep the latest tested
version and status for all plugins. If a plugin with a new version is released,
a build will be created to check this version.

## How to add a new plugin check?
```
npm start
```

For each project, create an angular module which should use the new plugin.
Then add the appropriate line to the [plugins-list.ts](.github/plugins-list.ts).
