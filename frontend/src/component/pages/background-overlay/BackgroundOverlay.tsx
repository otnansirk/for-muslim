import { useEffect, useRef } from 'react';
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

    const bgRef = useRef<HTMLDivElement>(null)
    const bg1Ref = useRef<HTMLDivElement>(null)
    const bg2Ref = useRef<HTMLDivElement>(null)
    const bgArtistRef = useRef<HTMLAnchorElement>(null)

    const refreshRef = (url: string) => {
        const image = new Image();
        image.onload = () => {
            const loadBg = bg2Ref.current!.style.opacity === '1'
            bg2Ref.current!.style.opacity = loadBg ? '0' : '1'

            const changeBg = loadBg ? bg1Ref.current : bg2Ref.current;
            changeBg!.style.backgroundImage = `url(${url})`

            bgRef.current!.style.opacity = '1'
        }
        image.src = url;
        image.remove()
    }

    const credit = (name: string, profileUrl: string) => {
        bgArtistRef.current!.textContent = `Photo by ${name}`
        bgArtistRef.current!.href = profileUrl
    }

    useEffect(() => {
        const bgInfo = bg[Math.floor(Math.random() * bg.length)];
        credit(bgInfo.author_name, bgInfo.author_url)
        refreshRef(bgInfo.photos)
    }, [])

    return (
        <div className='background'>
            <div ref={bgRef} className={`background-overlay`}>
                <div ref={bg1Ref} className='overlay' />
                <div ref={bg2Ref} className='overlay otnansirk' />
            </div>
            {
                <div className={`background-info`}>
                    <a ref={bgArtistRef} />&nbsp;
                </div>
            }
        </div >
    )
}

export default BackgroundOverlay