import React from 'react';
import Channels from '../Components/Channels';
import Teams from '../Components/Teams';
import Header from '../Components/Header';
import Messages from '../Components/Messages';
import SendMessage from '../Components/SendMessage';
import AppLayout from '../Components/AppLayout';

export default () => (
  <AppLayout>
    <Teams teams={[{ id: 1, letter: 'B' }, { id: 2, letter: 'Q' }]}>
      Teams
    </Teams>
    <Channels
      teamName="Team name"
      username="Username"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
    >
      Channels
    </Channels>
    <Header channelName="general" />
    <Messages>
      <ul className="message-List">
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);
