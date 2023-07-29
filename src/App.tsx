import {useState} from 'react'

import Game from "./components/Game";
import Test from "./components/test";


function App() {
    return (<div className={"App"}>
        <Game></Game>
        <video muted className={"heropage_HeroPortrait_22nJ5"}
               poster={"https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/techies.png"}
               autoPlay={true} preload={"auto"} loop={true} playsInline={true}>
            <source type="video/webm"
                    src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/techies.webm"/>
            <img
                src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/techies.png"/>
        </video>
    </div>)
}

export default App
