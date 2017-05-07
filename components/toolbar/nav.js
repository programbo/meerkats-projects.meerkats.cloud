import Router from 'next/router'
import { observer } from 'mobx-react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import projects from '~/stores/projects'
import { headingStyle } from '~/components/elements/styles'

@observer
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { path: props.path }
  }

  handleChange = (event, index, path) => {
    this.setState({ path })
    Router.push(path)
  };

  handlePrefetch = path => () => {
    Router.prefetch(path)
  };

  styles = {
    menuStyle: {
      ...headingStyle,
      marginTop: -8,
      fontSize: 24,
    },
    menuItemStyle: {
      ...headingStyle,
    },
  };

  render() {
    return (
      <DropDownMenu
        value={this.state.path}
        onChange={this.handleChange}
        style={this.styles.menuStyle}
      >
        <MenuItem
          value={'/'}
          primaryText="Home"
          style={this.styles.menuItemStyle}
          onMouseEnter={this.handlePrefetch('/')}
        />
        {projects.values.map((project, index) => (
          <MenuItem
            key={index}
            value={project.route}
            primaryText={project.name}
            style={this.styles.menuItemStyle}
            onMouseEnter={this.handlePrefetch('/todo')}
          />
        ))}
      </DropDownMenu>
    )
  }
}
