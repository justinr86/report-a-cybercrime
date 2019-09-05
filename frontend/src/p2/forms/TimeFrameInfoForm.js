/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import { ApolloConsumer } from 'react-apollo'
import { Trans } from '@lingui/macro'
import { Form, Field } from 'react-final-form'
import { Text } from '../../components/text'
import { ButtonsContainer } from '../../components/buttons-container'
import { TextArea } from '../../components/text-area'
import { finalFormAdapter } from '../../utils/finalFormAdapter'
import { getTimeFrame } from '../../utils/queriesAndMutations'

const TextAreaAdapter = finalFormAdapter(TextArea)

class TimeFrameInfoFormWrapped extends Component {
  localOnSubmit = (client, data) => {
    const { onSubmit } = this.props
    onSubmit(client, data)
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Form
            initialValues={getTimeFrame(client)}
            onSubmit={data => this.localOnSubmit(this.props.client, data)}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="startDate">
                  <Text marginTop={[5, null, 6]}>
                    <Trans>
                      <strong>Approximate start</strong>
                    </Trans>
                  </Text>
                  <Text fontSize={(1, null, 2)}>
                    <Trans>MM/DD/YYYY</Trans>
                  </Text>
                </label>
                <div>
                  <Field
                    name="startDate"
                    id="startDate"
                    component={TextAreaAdapter}
                    height="25px"
                    width="300px"
                  />
                </div>

                <label htmlFor="endDate">
                  <Text marginTop={[5, null, 6]}>
                    <Trans>
                      <strong>Approximate end</strong>
                    </Trans>
                  </Text>
                  <Text fontSize={(1, null, 2)}>
                    <Trans>MM/DD/YYYY</Trans>
                  </Text>
                </label>
                <div>
                  <Field
                    name="endDate"
                    id="endDate"
                    component={TextAreaAdapter}
                    height="25px"
                    width="300px"
                  />
                </div>
                <ButtonsContainer
                  cancel={true}
                  buttonLink={false}
                  nextPage="What happened"
                />
              </form>
            )}
          />
        )}
      </ApolloConsumer>
    )
  }
}

TimeFrameInfoFormWrapped.propTypes = {
  client: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export const TimeFrameInfoForm = props => (
  <ApolloConsumer>
    {client => <TimeFrameInfoFormWrapped client={client} {...props} />}
  </ApolloConsumer>
)
