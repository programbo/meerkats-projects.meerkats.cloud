import Router from 'next/router'
import { observer } from 'mobx-react'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import ProjectAdd from 'material-ui/svg-icons/action/note-add'
import styled from 'styled-components'

import projects from '~/stores/projects'
import { media } from '~/components/elements/styles'

const img = 'http://placehold.it/600x700'

const styles = {
  card: {
    width: '30%',
    marginBottom: 30,
    cursor: 'pointer',
  },
  cardTitle: {
    paddingTop: 0,
  },
  cardButton: {
    position: 'absolute',
    top: -5,
    right: 5,
  },
}

const handleCreate = () => {
  projects.showProjectDialog = true
}

const handleEdit = ({ target }) => {
  console.log('edit')
  const project = projects.values.find(({ uid }) => uid === target.id)
  projects.editing = project
  projects.showProjectDialog = true
}

const createClickHandler = path => () => {
  if (!projects.showProjectDialog) {
    Router.push(path)
  }
}

const createPrefetchHandler = path => () => {
  Router.prefetch(path)
}

export const CardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

export const Filler = styled.div`
  width: 100%;
  height: 1px;
  ${media.tablet`
    width: 46%;
  `}
  ${media.desktop`
    width: 30%;
  `}
`

const ResponsiveCard = styled(Card)`
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
  ${media.tablet`
    width: 46%;
    margin-bottom: 30px;
  `}
  ${media.desktop`
    width: 30%;
    margin-bottom: 30px;
  `}
`

export const NewProjectCard = () => (
  <ResponsiveCard onTouchTap={handleCreate}>
    <CardMedia
      overlay={
        <CardTitle
          title="New project"
          subtitle="Link a new project"
          style={styles.cardTitle}
        >
          <IconButton tooltip="Add a project" style={styles.cardButton}>
            <ProjectAdd color="white" />
          </IconButton>
        </CardTitle>
      }
    >
      <img src={img} alt="New project" />
    </CardMedia>
  </ResponsiveCard>
)

export const ProjectCard = observer(({
  project: { name, route, description, thumbnail, uid },
}) => (
  <ResponsiveCard
    onTouchTap={createClickHandler(route)}
    onMouseEnter={createPrefetchHandler(route)}
  >
    <CardMedia
      overlay={
        <CardTitle title={name} subtitle={description} style={styles.cardTitle}>
          <IconButton tooltip="Edit this project" style={styles.cardButton}>
            <FontIcon
              color="white"
              className="fa fa-pencil"
              onTouchTap={handleEdit}
              id={uid}
            />
          </IconButton>
        </CardTitle>
      }
    >
      <img src={thumbnail || img} alt={name} />
    </CardMedia>
  </ResponsiveCard>
))
