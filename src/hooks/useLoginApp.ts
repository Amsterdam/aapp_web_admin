import {SilentRequest} from '@azure/msal-browser'
import {useMsal} from '@azure/msal-react'
import {useEffect} from 'react'
import {currentClientId} from 'utils/environment'

declare const window: Window &
  typeof globalThis & {
    ReactNativeWebView?: {postMessage: (data: unknown) => void}
  }

const request: SilentRequest = {
  scopes: [`api://${currentClientId}/Modules.Edit`],
}
export const useLoginApp = () => {
  const {instance} = useMsal()
  const accounts = instance.getAllAccounts()
  const activeAccount = instance.getActiveAccount()
  if (!activeAccount && accounts.length > 0) {
    instance.setActiveAccount(accounts[0])
  }
  useEffect(() => {
    if (activeAccount && window.ReactNativeWebView) {
      instance
        .acquireTokenSilent(request)
        .then(({accessToken}): void => {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage?.(
              JSON.stringify({accessToken}),
            )
          }
        })
        .catch(e => {
          instance.acquireTokenRedirect(request)
        })
    }
  }, [instance, activeAccount])
  return !!window.ReactNativeWebView
}
