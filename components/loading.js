import FontIcon from 'material-ui/FontIcon';
import styled from 'styled-components';
import { centered, fullscreen, rotate } from '~/components/elements/styles';

const Loading = styled.div`
  ${fullscreen()}
  z-index: 1;
  background-color: white;
`;

const LoadingLabel = styled.h1`
  ${centered()}
  margin: 0;
`;

const LoadingIcon = styled(FontIcon)`
  ${centered()}
  &>* {
    ${rotate('5s')}
  }
`;

export default () => (
  <Loading>
    <LoadingIcon>
      <FontIcon
        className="fa fa-refresh"
        style={{ fontSize: '20rem', color: '#eee' }}
      />
    </LoadingIcon>
    <LoadingLabel>Loading...</LoadingLabel>
  </Loading>
);
