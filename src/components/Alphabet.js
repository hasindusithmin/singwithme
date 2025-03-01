import { useEffect, useState } from "react";
import alphabet from "../alphabet.json"
import songsbysingers from "../songsbysingers.json"
import songs from "../songs.json"

let i = 0;
export default function Alphabet({setSinger}) {
    const [showSingerList,setShowSingerList] = useState(true)
    const [songsObj,setSongObj] = useState(false);
    const [path,setPath] = useState(false)
    const alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    const render = (i)=>{
        const inner = document.getElementById('singers')
        if (inner != null) document.getElementById('singers').innerHTML = ''
        const singers =  alphabet[alpha[i]];
        const ul = document.createElement('ul');
        ul.className = 'w3-ul w3-margin-bottom w3-hoverable w3-monospace w3-card-4 w3-round-xlarge'
        singers.forEach(singer => {
            const li = document.createElement('li');
            const id = Object.values(singer)
            li.id = id
            li.innerText = Object.keys(singer)
            li.onclick = (e)=>{
                setSinger(e.target.innerText)
                const songs = songsbysingers[id[0]]
                sessionStorage.setItem('songs',JSON.stringify(songs))
                setShowSingerList(false)
                setSongObj(songs)
            }
            ul.appendChild(li)
        })
        document.getElementById('singers').appendChild(ul)
    }
    useEffect(()=>{render(0)},[])
    
    const minus = ()=>{
        i = i !== 0 ? i -1 : 25
        sessionStorage.setItem('i',i)
        render(i);
    }
    const plus = ()=>{
        i = i !== 25 ? i +1 : 0
        sessionStorage.setItem('i',i)
        render(i);
    }

    const showPrev = ()=>{
        setSinger(null)
        setSongObj(false)
        setShowSingerList(true)
        setTimeout(()=>{
            const str_i = sessionStorage.getItem('i')
            render(parseInt(str_i))
        },500)
    }

    const showLyrics = e => {
        const song = songs[e.target.innerHTML]
        setSongObj(false)
        setPath(song)
    }

    const goToHome = ()=>{
        setSinger(null)
        window.location.reload()
    }

    const shSongs = ()=>{
        const songs = JSON.parse(sessionStorage.getItem('songs'))
        setPath(false)
        setSongObj(songs)
    }

    return (
        <>
            {
                showSingerList 
                &&
                <div className="w3-container w3-content">
                    <div className="w3-center">
                        <button className="w3-bar-item w3-button w3-green" onClick={goToHome}>« Home »</button>
                    </div>
                    <div className="w3-bar">
                        <button className="w3-bar-item w3-button w3-left w3-light-grey" onClick={minus}>« Prev</button>
                        <button className="w3-bar-item w3-button w3-right w3-light-grey" onClick={plus}>Next »</button>
                    </div>
                    <br/>
                    <div className="w3-center w3-white" id="singers"></div>
                </div>
            }
            {  
                songsObj
                &&
                <div className="w3-container">
                    <div className="w3-bar">
                        <button className="w3-bar-item w3-button w3-left w3-light-grey" onClick={showPrev} >« Singers</button>
                    </div>
                    <br/>
                    <ul className="w3-ul w3-margin-bottom w3-hoverable w3-monospace w3-center w3-card-4 w3-round-xlarge">
                        {Object.entries(songsObj).map(arr => <li onClick={showLyrics} key={arr[1]}>{arr[0]}</li>)}
                    </ul>
                </div>
            }
            {
                path
                &&
                <div className="w3-container">
                    <div className="w3-bar">
                        <button className="w3-bar-item w3-button w3-left w3-light-grey" onClick={shSongs}>« Songs</button>
                    </div>
                    <div className="w3-center w3-section">
                        <img  src={`https://asoptbhxcojoswrahsdk.supabase.co/storage/v1/object/public/lyrics/${path}`} alt="lyrics" className="w3-image"/>
                    </div>
                </div>
            }
        </>
    )
}