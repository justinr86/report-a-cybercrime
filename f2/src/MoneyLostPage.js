import { Route } from 'react-router-dom'
import React from 'react'
import { Trans } from '@lingui/macro'
import { H1 } from './components/header'
import { Layout } from './components/layout'
import { MoneyLostInfoForm } from './forms/MoneyLostInfoForm'
import { TrackPageViews } from './TrackPageViews'
import { getDoneForms } from './utils/queriesAndMutations'
import { BackButton } from './components/backbutton'
import { Stack } from '@chakra-ui/core'

export const MoneyLostPage = () => (
  <Route
    render={({ history }) => (
      <Layout>
        <TrackPageViews />

        <Stack spacing={10} shouldWrapChildren>
          <BackButton route="/">
            <Trans id="moneyLostPage.backButton" />
          </BackButton>
          <Stack spacing={4} role="heading" aria-level="1">
              <H1 as="span">
              <Trans  id="moneyLostPage.title" />
            </H1>
          </Stack>
          <MoneyLostInfoForm
            onSubmit={(client, data) => {
              client.writeData({ data: { moneylost: JSON.stringify(data) } })
              history.push(
                getDoneForms(client) ? '/confirmation' : '/whathappened',
              )
            }}
          />
        </Stack>
      </Layout>
    )}
  />
)
