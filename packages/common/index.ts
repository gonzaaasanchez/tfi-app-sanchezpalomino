import './src/presentation/i18n'
import { Resolver, Token } from './src/domain/interfaces/Resolver'
import { HttpClient } from './src/domain/interfaces/HttpClient'
import { useInjection } from './src/domain/hooks/Resolver'
import { useI18n } from './src/domain/hooks/i18n'
import { ResolverProvider } from './src/domain/hooks/Resolver'
import { UIState } from './src/presentation/UIState'
import {
  appReducer,
  getAuthToken,
  setAuthToken,
  AppState,
} from './src/domain/store/AppSlice'
import { UserModel } from './src/data/models/UserModel'
import { PetModel } from './src/data/models/PetModel'
import { LocationModel } from './src/data/models/LocationModel'
import { appMiddleware } from './src/domain/store/AppMiddleware'
import { $ as Types } from './src/domain/di/Types'
import { createResolver } from './src/data/di/Resolver'
import { CommonRegister } from './src/domain/di/Register'
import { Color, StateColor } from './src/style/Color'
import { LabelStyle, LightTheme, GeneralStyle } from './src/style/Styles'
import { Button, ButtonState } from './src/components/Button'
import { StringValidator } from './src/utils/StringUtils'
import { DateUtils } from './src/utils/DateUtils'
import { Loader } from './src/components/Loader'
import { AnimatedView } from './src/components/AnimatedView'
import { PPBottomSheetContainer } from './src/components/bottom-sheet/PPBottomSheetContainer'
import {
  PPBottomSheet,
  useBottomSheetModalRef,
} from './src/components/bottom-sheet/PPBottomSheet'
import { EmptyView } from './src/components/EmptyView'
import {
  GenericToastType,
  GenericToast,
  ShowToast,
} from './src/components/Toast'
import {
  PPMaterialIconsName,
  PPMaterialIcon,
} from './src/components/PPMaterialIcon'

export {
  Resolver,
  Token,
  createResolver,
  CommonRegister,
  useInjection,
  useI18n,
  ResolverProvider,
  UIState,
  appReducer,
  appMiddleware,
  getAuthToken,
  setAuthToken,
  AppState,
  HttpClient,
  UserModel,
  PetModel,
  LocationModel,
  Types,
  LabelStyle,
  LightTheme,
  GeneralStyle,
  Color,
  StateColor,
  Button,
  ButtonState,
  StringValidator,
  DateUtils,
  Loader,
  AnimatedView,
  PPBottomSheetContainer,
  PPBottomSheet,
  useBottomSheetModalRef,
  EmptyView,
  GenericToastType,
  GenericToast,
  ShowToast,
  PPMaterialIconsName,
  PPMaterialIcon,
}
