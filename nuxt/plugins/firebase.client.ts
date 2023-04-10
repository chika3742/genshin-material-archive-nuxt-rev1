import {initializeApp} from "@firebase/app"
import {connectFunctionsEmulator, getFunctions} from "@firebase/functions"
import {connectAuthEmulator, getAuth} from "@firebase/auth"
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

  const auth = getAuth(app)
  const functions = getFunctions(app, "asia-northeast1")
  if (process.dev) {
    connectAuthEmulator(auth, "http://localhost:9099")
    connectFunctionsEmulator(functions, "localhost", 3005)
  }

  return {
    provide: {
      auth,
      functions,
    },
  }
})
