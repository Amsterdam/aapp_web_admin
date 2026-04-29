import {useAccount, useMsal} from '@azure/msal-react'
import {useEffect} from 'react'
import {loginRequest} from '@/authentication/authConfig'

declare const window: Window &
  typeof globalThis & {
    ReactNativeWebView?: {postMessage: (data: unknown) => void}
  }

export const usePassTokenToNativeApp = () => {
  const {accounts, instance} = useMsal()
  const account = useAccount(accounts[0] || {})

  useEffect(() => {
    if (account && window.ReactNativeWebView) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account,
        })
        .then(({accessToken}): void => {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage?.(
              JSON.stringify({accessToken}),
            )
          }
        })
        .catch(_e => {
          instance.acquireTokenRedirect({...loginRequest, account})
        })
    }
  }, [account, instance])

  return !!window.ReactNativeWebView
}
