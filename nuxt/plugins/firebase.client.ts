import {initializeApp} from "@firebase/app"
import {getFunctions} from "@firebase/functions"
import {getAuth} from "@firebase/auth"
import {initializeAppCheck, ReCaptchaV3Provider} from "@firebase/app-check"

export default defineNuxtPlugin(({$config}) => {
  const app = initializeApp($config.public.isFirebaseDev
    ? $config.public.firebaseConfigDev
    : $config.public.firebaseConfigProd)

  if (process.dev) {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider($config.public.recaptchaSiteKey),
  })

  return {
    provide: {
      auth: getAuth(app),
      functions: getFunctions(app),
    },
  }
})
