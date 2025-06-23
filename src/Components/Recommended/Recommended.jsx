import React, { use, useEffect,useState } from 'react'
import './Recommended.css'
import { API_KEY, value_converter} from '../../data'    
import { Link } from 'react-router-dom';

const Recommended = ({categoryId}) => {
    const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', // or 'auto' if you want instant scroll
    });
    };

    const  [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const relatedVideo_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=45&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedVideo_url)
            .then(response => response.json())
            .then(data => setApiData(data.items));
    }


    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className='recommended'>
        {apiData.map((item, index) => {
            return (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list"  onClick={scrollToTop}>
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} Views</p>
                    </div>
                </Link>
            )
        }
        )}
        
    </div>
  )
}

export default Recommended