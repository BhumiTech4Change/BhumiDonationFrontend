# BhumiDonationFrontend
Ionic App that helps volunteers signup and create fundraisers for varios ngos


### Build
> npm install

### Run
> npm run start 
or
> ionic serve

### Build APK

#### Debug
> ionic cordova build android

#### Release
> ionic cordova build android --prod --release 
and
> jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore apk-name.apk bhumi
