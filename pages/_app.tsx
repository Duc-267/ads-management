import { ChakraProvider, useToast } from '@chakra-ui/react'
import { Provider } from 'mobx-react'
import type { AppProps } from 'next/app'
import '@fontsource/poppins'
import AutoLogout from 'components/AutoLogout'
import { useStores } from 'hooks/useStores'
import { getTheme } from 'theme'
import { rootStore } from '../stores'

const AUTO_LOGOUT_TIME = 8 * 60 * 1000

export const theme = getTheme()
const App = ({ Component, pageProps }: AppProps) => {
  const { authStore } = useStores()

  const toast = useToast()

  const onLogout = () => {
    if (authStore.accessToken) {
      authStore.logout()
      toast({
        status: 'warning',
        description: 'You have been logged out due to inactivity',
        position: 'top'
      })
    }
  }

  return (
    <Provider {...rootStore}>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: {
            position: 'top',
            duration: 3000,
            isClosable: true,
            variant: 'subtle'
          }
        }}
      >
        <AutoLogout onLogout={onLogout} milliseconds={AUTO_LOGOUT_TIME}>
          <Component {...pageProps} />
        </AutoLogout>
      </ChakraProvider>
    </Provider>
  )
}

export default App
