const linking = {
  prefixes: [
    /** {{DEEP_LINKING_PREFIX}} */
  ],
  config: {
    screens: {
      homeScreen: {
        path: 'homeScreen',
        screens: {
          feed: 'feed',
          reserves: 'reserves',
          services: 'services',
          loads: 'loads',
          more: {
            path: 'more',
            screens: {
              moreStack: 'more',
              profile: 'profile',
            },
          },
        },
      },
      detailScreen: {
        path: 'detailScreen',
        screens: {
          detail: 'detail/:param',
        },
      },
    },
  },
}

export { linking }
