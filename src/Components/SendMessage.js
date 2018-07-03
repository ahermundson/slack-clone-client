import React from 'react';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
`;

export default ({ channelName }) => (
  <SendMessageWrapper>
    <Input fluid placeholder={`Message # ${channelName}`} />
  </SendMessageWrapper>
);
