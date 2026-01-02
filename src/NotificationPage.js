import React from 'react';
import SiteWrapper from './SiteWrapper.react';
import SendNotificationButton from './SendNotificationButton';
import { Page } from 'tabler-react';

function NotificationPage() {
  return (
    <SiteWrapper>
      <Page.Content title="Notifications">
        <SendNotificationButton />
      </Page.Content>
    </SiteWrapper>
  );
}

export default NotificationPage;
