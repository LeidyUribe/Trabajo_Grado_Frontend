import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: 300,
      textAlign: "center",
      display: "contents",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function SimpleCard({ title, children, handleClick }) {
  const classes = useStyles()
  return (
    <Card id='card' className={classes.root} data-testid='card' onClick={handleClick}>
      <div className={classes.title}>{title}</div>
      {title && <Divider />}
      <CardContent>{children}</CardContent>
    </Card>
  )
}
