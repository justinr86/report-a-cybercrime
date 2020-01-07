/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import { Trans } from '@lingui/macro'
import { Form, Field } from 'react-final-form'
import { NextAndCancelButtons } from '../components/next-and-cancel-buttons'
import { P } from '../components/paragraph'
import { TextInput } from '../components/TextInput'
import { Stack, FormControl, VisuallyHidden } from '@chakra-ui/core'
import { FormHelperText } from '../components/FormHelperText'
import { useStateValue } from '../utils/state'
import { FormLabel } from '../components/FormLabel'

export const ContactInfoForm = ({ onSubmit }) => {
  const [data] = useStateValue()
  const contactInfo = {
    email: '',
    ...data.formData.contactInfo,
  }

  return (
    <Form
      initialValues={contactInfo}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <Stack as="form" onSubmit={handleSubmit} shouldWrapChildren spacing={6}>
          <Field name="email">
            {props => (
              <FormControl>
                <FormLabel htmlFor="email">
                  <Trans id="contactinfoPage.emailAddress" />{' '}
                  <span style={{ fontWeight: 'normal' }}>
                    <Trans id="label.optional" />
                  </span>
                </FormLabel>
                <FormHelperText>
                  <Trans id="contactinfoPage.emailAddressHelperText">
                    <VisuallyHidden as="span" />
                  </Trans>
                </FormHelperText>
                <TextInput
                  id="email"
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              </FormControl>
            )}
          </Field>
          <P>
            <Trans id="contactinfoPage.rcmpFollowup" />
          </P>

          <P>
            <Trans id="contactinfoPage.nextInfo" />
          </P>
          <NextAndCancelButtons>
            <Trans id="contactinfoPage.nextButton" />
          </NextAndCancelButtons>
        </Stack>
      )}
    />
  )
}

ContactInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
