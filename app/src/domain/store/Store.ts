import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appMiddleware } from '@app/common'
import { reservesReducer } from '@packages/reserves'
import { feedReducer } from '@packages/feed'
import { moreReducer } from '@packages/more'

/**
 * Creates the store for the app.
 *
 * This function creates the store for the app by using the configureStore
 * function from @reduxjs/toolkit. The store is configured with the appReducer
 * and with the appMiddleware.
 *
 * @returns {Store} The configured store
 * @notExported
 */
const createStore = (): ReturnType<typeof configureStore> =>
  configureStore({
    reducer: {
      ...appReducer,
      ...reservesReducer,
      ...feedReducer,
      ...moreReducer,
    },
    /**
     * Custom middleware for the app
     *
     * Adds the appMiddleware to the default middleware provided by
     * getDefaultMiddleware(). The appMiddleware is used to save the auth
     * token in the app's storage when the `setAuthToken` action is
     * dispatched.
     *
     **/
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(appMiddleware),
  })

/**
 * The store for the app.
 */
const store = createStore()

export { store }
