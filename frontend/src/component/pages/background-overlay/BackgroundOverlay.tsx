import './style.css';

const BackgroundOverlay = () => {

    const bg = "/assets/images/bg.avif"
    return (
        <div className='background'>
            <div className="background-overlay">
                <div className='overlay' style={{ backgroundImage: `url(${bg})` }} />
            </div>
            <div className='background-info'>
                <a href=''>Photo by kris - unspalce</a>
            </div>
        </div>
    )
}

export default BackgroundOverlay