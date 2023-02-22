import React, { useEffect, useState } from 'react';
import "./Home.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const apiKey = "9f34c0f2bc93ed0aa757fe2eb58f551a";
const url = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = 'upcoming';
const trending = 'https://api.themoviedb.org/3/trending/all/day';
const popular = 'popular';
const topRated = 'top_rated';

const Card = ({img})=>(
    <img className='card' src={img} alt='cover' />
)

const Row = ({title, arr=[]})=> (
    <div className='row' >

        <h2>{title}</h2>
        <div>
          {
            arr.map((item, index)=>(
              <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
            ))

          }
          

        </div>

    </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [Trending, setTrending] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [Genre, setGenre] = useState([]);

  useEffect(()=>{
    const fetchUpcoming = async()=>{
      const {data: {results} } = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    }
    const fetchTrending = async()=>{
      const {data: {results} } = await axios.get(`${trending}?api_key=${apiKey}`);
      setTrending(results);
    }
    const fetchPopular = async()=>{
      const {data: {results} } = await axios.get(`${url}/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    }
    const fetchTopRated = async()=>{
      const {data: {results} } = await axios.get(`${url}/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    }
    const fetchAllGenres = async()=>{
      const {data: {genres}}  = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    }
    
    fetchUpcoming();
    fetchTrending();
    fetchPopular();
    fetchTopRated();
    fetchAllGenres();



   
  }, []);


  return (
    <section className='home' >
        <div className="banner" style={
          {
            backgroundImage: popularMovies[0]?`url(${`${imgUrl}/${popularMovies[0].poster_path}`})`: "rgb(16,16,16)"

          }
        }>
        {
          popularMovies[0]&&
          <h1>{popularMovies[0].original_title}</h1>
        }
        {
          popularMovies[0]&&
          <p>{popularMovies[0].overview}</p>
        }

        <div>
          <button> <BiPlay/> Play</button>
          <button>My List <AiOutlinePlus/></button>
        </div>
          
        </div>

        <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
        <Row title={"Trending Movies"} arr={Trending}/>
        <Row title={"Popular Movies"} arr={popularMovies}/>
        <Row title={"Top Rated Movies"} arr={topRatedMovies}/>
        

        <div className="genreBox">
          {
            Genre.map((item, index)=>(
              <Link key={index} to={`/genre/${item.id}`}>{item.name}</Link>
            ))
          }
        </div>

    </section>
  )
}

export default Home
