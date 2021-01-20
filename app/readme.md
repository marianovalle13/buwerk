## Solucionar error de compilación ##
```
ionic cordova plugin add cordova-plugin-file
npm install --save @ionic-native/file@4.3.3

ionic cordova plugin add cordova-plugin-file-transfer --force
ionic cordova plugin add cordova-plugin-file-transfer@4.3.3
```

## Otro Error que no funcionan los WS en el dispositivo ##
```
 cordova plugin remove cordova-plugin-whitelist
 cordova plugin add cordova-plugin-whitelist
 ```

## Generar versión ##

export ANDROID_HOME=/Users/sebastian/Library/Android/sdk

cd platforms/android
./gradlew bundleRelease

ir a la carpeta raiz de la app (por ejemplo: /app)
cd ../..

cp /Users/sebastian/Sites/diproach/projects/buwerk/app/platforms/android/app/build/outputs/bundle/release/app.aab .

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore buwerk.keystore app.aab buwerk

~/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 app.aab buwerk_v14.aab