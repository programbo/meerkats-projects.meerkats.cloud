import { Component } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import slugify from 'slugify'

import { RedButton } from '~/components/elements'
import { media } from '~/components/elements/styles'
import projects from '~/stores/projects'

const ProjectDefinition = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  ${media.tablet`
    flex-direction: row;
  `}
`
const ProjectMetadata = styled.div`
  width: 100%;
  ${media.tablet`
    width: 48%;
  `}
`

const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 0;
  margin-top: 1em;
  padding-top: 100%;
  background-color: #eee;
`

const ResponsiveDialog = styled(Dialog)`
  &>div:first-child>div:first-child {
    width: 90% !important;
    ${media.desktop`
      width: 600px !important;
    `}
  }
`

@observer class ProjectDialog extends Component {
  state = { project: {} };
  styles = {
    deleteButton: {
      float: 'left',
    },
  };

  componentWillMount() {
    this.disposeReaction = reaction(
      () => projects.showProjectDialog,
      () => {
        projects.editing = projects.showProjectDialog
          ? projects.editing || {}
          : {}
        this.setState({ project: projects.editing })
      }
    )
  }

  componentWillUnmount() {
    this.disposeReaction()
  }

  handleClose = () => {
    projects.showProjectDialog = false
  };

  handleEdit = ({ target: { name, value } }) => {
    const project = { ...this.state.project }
    project[name] = name === 'route' ? this.generateRoute(value) : value
    project.valid = this.validateProject(project)
    this.setState({ project })
  };

  generateRoute = projectName => `/${slugify(projectName || '').toLowerCase()}`;

  validateProject = project => {
    return (
      project &&
      project.name &&
      project.description &&
      project.route &&
      project.route.length > 1
    )
  };

  handleSave = () => {
    const project = { ...this.state.project }
    if (this.validateProject(project)) {
      project.route = project.route || this.generateRoute(project.name)
      if (this.state.project.uid) {
        projects.set(this.state.project.uid, this.state.project)
      }
      else {
        projects.add(project)
      }
      projects.showProjectDialog = false
    }
  };

  handleDelete = () => {
    projects.remove(this.state.project.uid)
    projects.showProjectDialog = false
  };

  validateRequiredField = (fieldName, message) =>
    (this.state.project && this.state.project[fieldName] === ''
      ? message
      : false);

  actionButtons = () => {
    let buttons = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSave}
        disabled={!this.validateProject(this.state.project)}
      />,
    ]
    if (this.state.project && this.state.project.uid) {
      buttons = [
        <RedButton
          label="Delete"
          style={this.styles.deleteButton}
          onTouchTap={this.handleDelete}
        />,
        ...buttons,
      ]
    }
    return buttons
  };

  render() {
    return (
      <ResponsiveDialog
        title="Link a new project"
        actions={this.actionButtons()}
        modal={false}
        open={projects.showProjectDialog}
        onRequestClose={this.handleClose}
        autoScrollBodyContent
      >
        <ProjectDefinition>
          <ProjectMetadata>
            <TextField
              id="name"
              name="name"
              hintText="My New Project"
              floatingLabelText="Project name *"
              value={this.state.project.name}
              fullWidth
              onChange={this.handleEdit}
              onKeyUp={this.handleEdit}
              required
              errorText={this.validateRequiredField(
                'name',
                'This field is required'
              )}
            />
            <TextField
              id="route"
              name="route"
              hintText="/something"
              floatingLabelText="Page route *"
              value={
                this.state.project.route ||
                  (this.state.project.name &&
                    this.generateRoute(this.state.project.name))
              }
              fullWidth
              onChange={this.handleEdit}
              onKeyUp={this.handleEdit}
              required
              errorText={this.validateRequiredField(
                'route',
                'This field is required'
              )}
            />
            <TextField
              id="description"
              name="description"
              hintText="Something about this project"
              floatingLabelText="Brief description *"
              value={this.state.project.description}
              fullWidth
              onChange={this.handleEdit}
              onKeyUp={this.handleEdit}
              required
              errorText={this.validateRequiredField(
                'description',
                'This field is required'
              )}
            />
          </ProjectMetadata>
          <ProjectMetadata>
            <ThumbnailPlaceholder />
          </ProjectMetadata>
        </ProjectDefinition>
      </ResponsiveDialog>
    )
  }
}

export default ProjectDialog
