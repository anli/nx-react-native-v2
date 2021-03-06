module.exports = {
  testRunner: 'jest',
  runnerConfig: 'jest.config.json',
  apps: {
    'ios.debug': {
      type: 'ios.app',
      build:
        'cd ../habit-app/ios && RN_SRC_EXT=e2e.ts,e2e.tsx xcodebuild -workspace Habit.xcworkspace -scheme Habit -configuration Debug -sdk iphonesimulator -derivedDataPath ./build -quiet',
      binaryPath:
        '../habit-app/ios/build/Build/Products/Debug-iphonesimulator/Habit.app'
    },
    'ios.release': {
      type: 'ios.app',
      build:
        'cd ../habit-app/ios && RN_SRC_EXT=e2e.ts,e2e.tsx xcodebuild -workspace Habit.xcworkspace -scheme Habit -configuration Release -sdk iphonesimulator -derivedDataPath ./build -quiet',
      binaryPath:
        '../habit-app/ios/build/Build/Products/Release-iphonesimulator/Habit.app'
    },
    'android.debug': {
      type: 'android.apk',
      build:
        'cd ../habit-app/android && RN_SRC_EXT=e2e.ts,e2e.tsx ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      binaryPath:
        '../habit-app/android/app/build/outputs/apk/debug/app-debug.apk'
    },
    'android.release': {
      type: 'android.apk',
      build:
        'cd ../habit-app/android && RN_SRC_EXT=e2e.ts,e2e.tsx ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
      binaryPath:
        '../habit-app/android/app/build/outputs/apk/release/app-release.apk'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: process.env.E2E_IOS_SIMULATOR || 'iPhone 13'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: process.env.E2E_ANDROID_SIMULATOR || 'Pixel_4a_API_30'
      }
    }
  },
  configurations: {
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    }
  }
}
