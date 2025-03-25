import { useEffect, useRef, useState } from 'react';
import { BackgroundOverlayType } from '../../../types/bckground-overlay';

import './style.css';


const bg: BackgroundOverlayType[] = [
    {
        "author_name": "Abdulla Dhahri",
        "author_url": "https://unsplash.com/@iiabdulla92",
        "photos": "https://images.unsplash.com/photo-1579003223313-8053dc9d10aa"
    },
    {
        "author_name": "Haidan",
        "author_url": "https://unsplash.com/@hydngallery",
        "photos": "https://images.unsplash.com/photo-1553755088-ef1973c7b4a1"
    },
    {
        "author_name": "Abdullah Arif",
        "author_url": "https://unsplash.com/@abdu3h",
        "photos": "https://images.unsplash.com/photo-1587617425953-9075d28b8c46"
    },
    {
        "author_name": "Richard Horvath",
        "author_url": "https://unsplash.com/@ricvath",
        "photos": "https://images.unsplash.com/photo-1620121684840-edffcfc4b878"
    },
    {
        "author_name": "Richard Horvath",
        "author_url": "https://unsplash.com/@ricvath",
        "photos": "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa"
    },
    {
        "author_name": "Richard Horvath",
        "author_url": "https://unsplash.com/@ricvath",
        "photos": "https://images.unsplash.com/photo-1620121692029-d088224ddc74"
    },
    {
        "author_name": "Richard Horvath",
        "author_url": "https://unsplash.com/@ricvath",
        "photos": "https://images.unsplash.com/photo-1620120966883-d977b57a96ec"
    },
    {
        "author_name": "Ryan Farid",
        "author_url": "https://unsplash.com/@torgusonyan",
        "photos": "https://images.unsplash.com/photo-1590757825699-4844233cd768"
    },
    {
        "author_name": "Yubli Audy Warokka",
        "author_url": "https://unsplash.com/@yubliwarokka",
        "photos": "https://images.unsplash.com/photo-1628962844030-e0db6053a5e1"
    },
    {
        "author_name": "Jody A. Khomaro",
        "author_url": "https://unsplash.com/@jodykhomaro",
        "photos": "https://images.unsplash.com/photo-1631180388083-31d3420a1fdc"
    },
    {
        "author_name": "rahmat taufiq",
        "author_url": "https://unsplash.com/@rahmattaufiq",
        "photos": "https://images.unsplash.com/photo-1584835106735-7fe1b39f24a4"
    }
]

const BackgroundOverlay = () => {

    const refreshRef = useRef(() => { })

    const [currentBG, setCurrentBG] = useState<BackgroundOverlayType>()
    const [nextBG, setNextBG] = useState<BackgroundOverlayType>()
    const [isRender, setIsRender] = useState<boolean>(true)

    refreshRef.current = () => {
        const newBg = bg[Math.floor(Math.random() * bg.length)];
        if (newBg.photos !== currentBG?.photos) {
            setNextBG(newBg);
            setTimeout(() => {
                setCurrentBG(newBg);
                setNextBG(undefined);
            }, 400);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            refreshRef.current();
            setIsRender(false);
        }, 50);

        return () => clearTimeout(timeout);
    }, [])

    return (
        <div className='background'>
            <div className={`background-overlay`}>
                <div className={`overlay ${isRender ? '' : 'fade-in'}`} style={{ backgroundImage: `url(${currentBG?.photos})` }} />
                {
                    nextBG && <div className={`overlay fade-in`} style={{ backgroundImage: `url(${nextBG.photos})` }} />
                }
            </div>
            {
                <div className={`background-info ${currentBG && 'visible'}`}>
                    Photo by <a href={currentBG?.author_url} >{currentBG?.author_name}</a>&nbsp;
                    on <a href="https://unsplash.com" target='__blank'>Unsplash</a>
                </div>
            }
        </div >
    )
}

export default BackgroundOverlay