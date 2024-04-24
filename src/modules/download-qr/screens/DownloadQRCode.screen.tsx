import {FormProvider, useForm} from 'react-hook-form'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import QRCodeWithDownload from 'modules/download-qr/components/QRCodeWithDownload'

type DownloadQRCodeForm = {
  source: string
  campaign: string
}

const DownloadQRCodeScreen = () => {
  const form = useForm<DownloadQRCodeForm>()
  const {watch} = form
  const source = encodeURIComponent(watch('source'))
  const campaign = encodeURIComponent(watch('campaign'))
  const url = `https://app.amsterdam.nl/download?utm_source=${source}&utm_campaign=${campaign}`
  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Amsterdam App"
          title="Download link QR code maker"
        />
        <FormProvider {...form}>
          <Column gutter="lg">
            <TextField
              label="Bron (bijvoorbeeld bewonersbrief, linkedin, amsterdam.nl, etc.)"
              name="source"
              type="text"
              maxLength={30}
            />
            <TextField
              label="Campagne (bijvoorbeeld 'brief26maart')"
              name="campaign"
              type="text"
              maxLength={30}
            />
            {source && campaign ? (
              <>
                <Column gutter="sm">
                  <Phrase color="muted">URL:</Phrase>
                  <Phrase color="default">{url}</Phrase>
                </Column>
                <Column gutter="sm">
                  <Phrase color="muted">QR code:</Phrase>
                  <QRCodeWithDownload
                    value={url}
                    fileName={`qr-code-${source}-${campaign}`}
                  />
                </Column>
              </>
            ) : (
              <Phrase color="error">
                Vul eerst een bron en een campagne in
              </Phrase>
            )}
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default DownloadQRCodeScreen
