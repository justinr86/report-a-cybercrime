/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Trans } from '@lingui/macro'
import { Stack, Flex } from '@chakra-ui/core'
import { useStateValue } from '../utils/state'
import { testdata, EditButton } from '../ConfirmationSummary'
import { H2 } from '../components/header'
import { DescriptionListItem } from '../components/DescriptionListItem'
import { Text } from '../components/text'

export const ContactInfoSummary = ({ onSubmit }) => {
  const [data] = useStateValue()
  const contactInfo = {
    ...testdata.formData.contactInfo, //Remove after done testing
    ...data.formData.contactInfo,
  }

  return (
    <React.Fragment>
      {false ? (
        <div>
          {/*: mark the proper ids for lingui */}
          <Trans id="confirmationPage.contactInfo.email" />
        </div>
      ) : null}

      <Stack spacing={4} borderBottom="2px" borderColor="gray.300" pb={4}>
        <Flex align="baseline">
          <H2>
            <Trans id="confirmationPage.contactTitle" />
          </H2>
          <EditButton path="/contactinfo" label="Edit Contact Info" />
        </Flex>
        {contactInfo.email.length > 0 ? (
          <Stack as="dl" spacing={4} shouldWrapChildren>
            <DescriptionListItem
              descriptionTitle="confirmationPage.contactInfo.email"
              description={contactInfo.email}
            />
          </Stack>
        ) : (
          <Text>
            <Trans id="confirmationPage.contactIntro" />
          </Text>
        )}
      </Stack>
    </React.Fragment>
  )
}