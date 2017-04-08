import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import { centered, fullscreen, rotate } from '~/components/elements/styles'

const Loading = styled.div`
  ${fullscreen()}
  z-index: 1;
  background-color: white;
`

const LoadingLabel = styled.h1`
  ${centered()}
  margin: 0;
`

const Center = styled.div`
  ${centered()}
`

const SpinningIcon = styled(FontIcon)`
  ${rotate('5s')}
`

export default () => (
  <Loading>
    <Center>
      <SpinningIcon
        className="fa fa-refresh"
        style={{ fontSize: '20rem', color: '#eee' }}
      />
    </Center>
    <LoadingLabel>Loading...</LoadingLabel>
  </Loading>
)
