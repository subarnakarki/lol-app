import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {data} from '../champion.json';

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: 'center',
  },
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
  },
  champIcon: {
    height: '100px',
    display: 'block',
    'margin-left': 'auto',
    'margin-right': 'auto'
  },
  inline: {
    display: 'inline-block',
    padding: '30px'
  }
}));
const getChampion = (key) => {
  for (let champ in data) {
    const champData = data[champ];
    if(champData.key == key) {
      return data[champ]
    }
  }
}
const version = '12.8.1';
const Summoner = (props) => {
  console.log(props)
  const classes = useStyles()
  const topChampions = {
    one: props.mastery[0].championId,
    two: props.mastery[1].championId,
    three: props.mastery[2].championId
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
        <h1 className={styles.title}>{ props.name }</h1>
        <h2>Level: {props.summonerLevel}</h2>
        <img className={classes.profileIcon} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${props.profileIconId}.png`}></img>
        <div>
          <div className={classes.inline}>
            <img className={classes.champIcon} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampion(topChampions.one).id}.png`}></img>
            {/* <img className={classes.champIcon} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampion(topChampions.one)}.png`}></img> */}
            <h3 className={classes.text}>{getChampion(topChampions.one).name}</h3>
            <p className={classes.text}>Mastery Points: {props.mastery[0].championPointsSinceLastLevel} </p>
          </div>
          <div className={classes.inline}>
            <img className={classes.champIcon} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampion(topChampions.two).id}.png`}></img>
            {/* <img className={classes.champIcon} src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${getChampion(topChampions.two)}_1.jpg`}></img> */}
            <h3 className={classes.text}>{getChampion(topChampions.two).name}</h3>
            <p className={classes.text}>Mastery Points: {props.mastery[1].championPointsSinceLastLevel} </p>
          </div>
          <div className={classes.inline}>
            <img className={classes.champIcon} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampion(topChampions.three).id}.png`}></img>
            {/* <img className={classes.champIcon} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampion(topChampions.three)}.png`}></img> */}
            <h3 className={classes.text}>{getChampion(topChampions.three).name}</h3>
            <p className={classes.text}>Mastery Points: {props.mastery[2].championPointsSinceLastLevel} </p>
          </div>
        </div>
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
  
  const masteryV4 = await axios.get(`http://localhost:3000/api/masteryV4`, {
    params: {
      id: summoner.id
    }
  });
  const mastery = masteryV4.data;
  return {...summoner, mastery};
}