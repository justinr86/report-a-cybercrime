/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Route } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import { H1 } from './components/header'
import { Lead } from './components/paragraph'
import { AnonymousInfoForm } from './forms/AnonymousInfoForm'
import { Layout } from './components/layout'
import { BackButton } from './components/backbutton'
import { Stack } from '@chakra-ui/core'
import { useStateValue } from './utils/state'
import { Page } from './components/Page'

export const AnonymousPage = () => {
  const [, dispatch] = useStateValue()

  return (
    <Route
      render={({ history }) => (
        <Page>
          <Layout columns={{ base: 4 / 4, md: 6 / 8, lg: 7 / 12 }}>
            <Stack spacing={10} shouldWrapChildren>
              <BackButton />
              <H1>
                <Trans id="anonymousPage.title" />
              </H1>
              <Lead>
                <Trans id="anonymousPage.intro" />
              </Lead>

              <AnonymousInfoForm
                onSubmit={(data) => {
                  dispatch({
                    type: 'saveFormData',
                    data: { anonymous: data },
                  })
                  history.push('/howdiditstart')
                }}
              />
            </Stack>
          </Layout>
        </Page>
      )}
    />
  )
}
