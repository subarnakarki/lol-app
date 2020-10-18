import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { withRouter } from 'next/router'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    profileIcon: {
      height: '128px',
      height: '128px'
    }
  },
  profileIcon: {
    height: '128px',
    height: '128px'
  }
}));

const Summoner = (props) => {
  const classes = useStyles()
  // console.log('PROPS ARE', props)
  return (
    <div className={styles.container}>
      <Head>
        <title>League App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{ props.name }</h1>
        <h2>Level: {props.summonerLevel}</h2>
        <img className={classes.profileIcon} src={`http://ddragon.leagueoflegends.com/cdn/10.21.1/img/profileicon/${props.profileIconId}.png`}></img>
      </main>

      <footer className={styles.footer}>
          Made by Subarna
      </footer>
    </div>
  )
}

export default Summoner;

Summoner.getInitialProps = async ({query}) => {
  const summonerV4 = await axios.get(`http://localhost:3000/api/summonerV4`, {
    params: {
      name: query.name
    }
  });
  const summoner = summonerV4.data
  return {...summoner, };
}