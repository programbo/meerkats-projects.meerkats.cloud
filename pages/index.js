import { Component } from 'react'
import { observer } from 'mobx-react'
import ProjectDialog from '~/components/projects/dialog'

import App, { getDefaultProps } from '~/components/app'
import {
  CardWrapper,
  NewProjectCard,
  ProjectCard,
  Filler
} from '~/components/projects/cards'
import projects from '~/stores/projects'

@observer class Home extends Component {
  static async getInitialProps(props) {
    const defaultProps = await getDefaultProps(props)
    if (props.req) {
      projects.projects = await this.getProjects(props.req.firebase)
    }
    return { ...defaultProps, projects: projects.projects }
  }

  static async getProjects(firebase) {
    const projectsSnapshot = await firebase
      .database()
      .ref('projects')
      .once('value')
    return projectsSnapshot.val()
  }

  componentWillMount() {
    projects.projects = this.props.projects
  }

  render() {
    return (
      <App title="Home" {...this.props}>
        <CardWrapper>
          <NewProjectCard />
          {projects.values.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
          <Filler />
          <Filler />
          <Filler />
        </CardWrapper>
        <ProjectDialog />
      </App>
    )
  }
}

export default Home
