import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import App from 'App'
import {Environment, environment} from 'utils/environment'
import './index.css'

if (environment !== Environment.local) {
  Sentry.init({
    dsn: 'https://eaf4640f1d234fb28801572d453b72bb@o1315195.ingest.sentry.io/4504169232990208',
    tracesSampleRate: 0,
    environment,
  })
}

const element = document.getElementById('root')

if (element) {
  const root = ReactDOM.createRoot(element)
  root.render(<App />)
}
