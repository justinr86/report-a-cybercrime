import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { PageNotFound } from './PageNotFound'
import { LandingPage } from './LandingPage'
import { ThankYouPage } from './ThankYouPage'
import { WhatHappenedPage } from './WhatHappenedPage'
import { ContactInfoPage } from './ContactInfoPage'
import { SuspectCluesPage } from './SuspectCluesPage'
import { HowDidItStartPage } from './HowDidItStartPage'
import { ConfirmationPage } from './ConfirmationPage'
import { MoneyLostPage } from './MoneyLostPage'
import { BusinessPage } from './BusinessPage'
import { InformationPage } from './InformationPage'
import { LocationPage } from './LocationPage'
import { DevicesPage } from './DevicesPage'
import { EvidencePage } from './EvidencePage'
import { PrivacyConsentPage } from './PrivacyConsentPage'
import { PrivacyStatementPage } from './PrivacyStatementPage'
import { WhatWasAffectedPage } from './WhatWasAffected'
import { FinalFeedbackPage } from './FinalFeedbackPage'
import { FinalFeedbackThanksPage } from './FinalFeedbackThanksPage'
import { StartPage } from './StartPage'
import { ConfirmCancelPage } from './ConfirmCancelPage'
import { CancelPage } from './CancelPage'
import { TermsAndConditions } from './TermsAndConditions'
import { AnonymousPage } from './AnonymousPage'
import { LocationAnonymousPage } from './LocationAnonymousPage'
/*Consider removing after c19 pandemic*/
import { Covid19Page } from './Covid19Page'
import { RedirectRoute } from './components/route'

export const Home = () => (
  <Router>
    <Switch>
      <Route exact path="/covid-19">
        <Covid19Page />
      </Route>

      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/startPage">
        <StartPage />
      </Route>
      <Route path="/privacyconsent">
        <PrivacyConsentPage />
      </Route>
      <Route path="/privacystatement">
        <PrivacyStatementPage />
      </Route>
      <Route path="/termsandconditions">
        <TermsAndConditions />
      </Route>
      <Route path="/howdiditstart">
        <HowDidItStartPage />
      </Route>
      <Route path="/whatwasaffected">
        <WhatWasAffectedPage />
      </Route>
      <Route path="/moneylost">
        <MoneyLostPage />
      </Route>
      <Route path="/information">
        <InformationPage />
      </Route>
      <Route path="/devices">
        <DevicesPage />
      </Route>
      <Route path="/business">
        <BusinessPage />
      </Route>
      <Route path="/whathappened">
        <WhatHappenedPage />
      </Route>
      <RedirectRoute path="/suspectclues">
        <SuspectCluesPage />
      </RedirectRoute>
      <Route path="/evidence">
        <EvidencePage />
      </Route>
      <Route path="/location">
        <LocationPage />
      </Route>
      <Route path="/anonymous">
        <AnonymousPage />
      </Route>
      <Route path="/contactinfo">
        <ContactInfoPage />
      </Route>
      <Route path="/confirmation">
        <ConfirmationPage />
      </Route>
      <Route exact path="/thankYouPage">
        <ThankYouPage />
      </Route>
      <Route exact path="/confirmCancel">
        <ConfirmCancelPage />
      </Route>
      <Route exact path="/cancelled">
        <CancelPage />
      </Route>
      <Route path="/finalFeedback">
        <FinalFeedbackPage />
      </Route>
      <Route path="/finalFeedbackThanks">
        <FinalFeedbackThanksPage />
      </Route>
      <Route path="/locationAnonymous">
        <LocationAnonymousPage />
      </Route>

      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  </Router>
)
