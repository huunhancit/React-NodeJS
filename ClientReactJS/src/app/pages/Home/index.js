import React from 'react'
import { Header } from 'components'
import styles from './styles'
import { User, Chat } from 'app/pages'
import { Route, Switch } from 'react-router-dom'


class Home extends React.Component {
  state = {
    userSelected: 0
  }
  users = [
    'Nhan Dinh',
    'Truong Le',
    'Bang Hoang'
  ]

  sendMessage = (msg) => {
    console.log(msg)
  }


  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid" style={styles.container}>
          <Switch>
            <Route exact path="/app/chat" component={Chat} />
            <Route exact path="/app/user" component={User} />
          </Switch>
        </div>
      </div >
    )
  }

}

export default Home