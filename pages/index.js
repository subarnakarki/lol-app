import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  inline: {
    display: 'inline-block'
  }
}));

export default function Home() {
  const classes = useStyles();
  const [summonerName, setSummonerName] = useState('');

  const handleChange = (event) => {
    setSummonerName(event.target.value);
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>League App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          League Summoner Search
        </h1>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" variant="outlined" helperText="Enter Summoner Name" value={summonerName} onChange={handleChange}/>
          <div className={classes.root}>
            <Link href="/summoner">
              <Button size="large" variant="contained">Search</Button>
            </Link>
          </div>
        </form>
      </main>

      <footer className={styles.footer}>
          Made by Subarna
      </footer>
    </div>
  )
}
