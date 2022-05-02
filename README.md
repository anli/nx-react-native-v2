# NX React Native

Habit Tracker Mobile App build with [React Native](https://reactnative.dev/) and [NX monorepo](https://nx.dev/)

## Decryption of environment variables

Environment variables are encrypted using [Git Secret](https://git-secret.io/).

Get access to the secret for this repository then run

```
git secret reveal
```

## Run the App

Install packages

```
npm ci
```

Run metro

```
npm run start
```

Run on Android

```
npm run android
```

Run on iOS

```
npm run ios
```

## Run e2e tests with Detox

If you are not using the default `iPhone 13` or `Pixel_4a_API_30`

Update `.env.local`

```
# available variables can be found in .env.local.sample
E2E_IOS_SIMULATOR=
E2E_ANDROID_SIMULATOR=
```

Run on development build

```
npm run e2e-start
npm run e2e-build-android
npm run e2e-test-android

npm run e2e-build-ios
npm run e2e-test-ios
```

Run on production build

```
npm run e2e-start
npm run e2e-build-android -- --configuration=production
npm run e2e-test-android -- --configuration=production

npm run e2e-build-ios -- --configuration=production
npm run e2e-test-ios -- --configuration=production
```

## Run Jest Unit Tests

Run all tests

```
# run on all modules, and do not use caching
npm run test -- --all --skip-nx-cache
```

Run test coverage checks

```
npm run test-coverage

# open coverage report if needed
open coverage/combine-coverage/index.html
```

Only run affected tests due to changes to their files

```
npm run test
```

## Run linting

```
# run on all modules, and do not use caching
npm run lint -- --all --skip-nx-cache
```

## Run type checking

Run all

```
npm run type-check -- --all --skip-nx-cache
```

Run affected

```
npm run type-check
```

## Run Release App to App Store's Testflight and Google Play Store's Internal Track

Run

```
npm run alpha-release-android
npm run alpha-release-ios
```

## Key File and Folder Architecture

```
__mocks__                               // global jest mocks
.github                                 // CI scripts
apps
├──habit-app
│   ├──android/fastlane                 // release scripts for android
│   ├──ios/fastlane                     // release scripts for ios
│   ├──src
│   │  ├──app                           // library initialization, navigation
│   │  └──screens                       // screens
│   ├──.env                             // development env
│   ├──.env.e2e                         // e2e testing env
│   ├──.env.production                  // production env
│   └──.env.sample                      // reference for all env used
└──habit-app-e2e
    ├──utils                            // e2e screen helper functions
    └──*.spec.ts                        // detox e2e test files
coverage                                // unit test coverage files
libs
├──habit                                // habit specific libraries
│  ├──data-access                       // API queries
│  └──ui                                // sharable UI, forms, lists
└──shared                               // store reusable libraries across different apps or libs
   ├──auth                              // authentication with Auth0
   ├──feature-flag                      // feature flag with split.io
   ├──i18n                              // translation with i18nexus
   ├──ui                                // ui with restyle
   │  └──src
   │     ├──components                  // generic UI components
   │     ├──themes                      // theming files
   │     └──utils
   ├──utils                             // generic helpers i.e. filter nullable
   ├──utils-apollo-provider             // graphQL helpers
   ├──utils-date                        // date helpers
   ├──utils-suspense                    // react suspense helpers
   └──utils-testing                     // unit tests helpers
tools                                   // custom scripts
└──combine-coverage-final.js
.env                                    // repository env
.env.local                              // repository local env
.env.local.sample                       // reference for repository local env
...
```

## Key Technology Stack or Libraries

- [NX monorepo](https://nx.dev/): Smart, Fast and Extensible Build System for monorepo
- [Typescript](https://www.typescriptlang.org/): Strongly typed programming language that builds on JavaScript
- [Standard JS](https://standardjs.com/): Enforce consistent style for code clarity and conventions
- [Restyle](https://github.com/Shopify/restyle): A type-enforced system for building UI components in React Native with TypeScript
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/): Allows for creating smooth animations and interactions that runs on the UI thread.
- [why did you render](https://github.com/welldone-software/why-did-you-render): Detect potentially avoidable re-renders.
- [Sonar Cloud](https://sonarcloud.io/): Feedback on Code Quality and Code Security
- [Detox](https://github.com/wix/Detox): Gray box end-to-end testing and automation framework
- [Faker](https://github.com/faker-js/faker): Generate massive amounts of fake (but realistic) data for testing and development.
- [Graphql Codegen](https://github.com/dotansimha/graphql-code-generator): A tool for generating code based on a GraphQL schema and GraphQL operations
- [React Native Testing Library](https://github.com/callstack/react-native-testing-library): Simple and complete React Native testing utilities that encourage good testing practices.
- [React Native Heap](https://github.com/heap/react-native-heap): React Native integration for Heap Analytics
- [React Hook Form](https://github.com/react-hook-form/react-hook-form): React Hooks for form state management and validation
- [React Native Sentry](https://github.com/getsentry/sentry-react-native): Error and Performance Monitoring
