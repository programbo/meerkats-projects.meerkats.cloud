import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import { red600, red900 } from 'material-ui/styles/colors'
import { media } from '~/components/elements/styles'

export const Content = styled.div`
  padding: 10px;
  ${media.tablet`
    padding: 40px;
  `}
`

export const RedButton = props => {
  const { style, label, ...otherProps } = props
  const buttonStyle = { color: 'white', ...style }
  return (
    <FlatButton
      label={label}
      backgroundColor={red600}
      hoverColor={red900}
      style={buttonStyle}
      {...otherProps}
    />
  )
}
