import 'reflect-metadata'
import { registerRootComponent } from 'expo'
import App from './src/App'
import { registerDependencies } from './src/domain/di/Register'
/**
 * Registers the application's dependencies.
 *
 * @description This function is called to register the application's dependencies.
 */
registerDependencies()
/**
 * Registers the App component as the root component for the Expo application.
 *
 * @description This function is called to register the App component as
 * the root component for the Expo application.
 */
registerRootComponent(App)
