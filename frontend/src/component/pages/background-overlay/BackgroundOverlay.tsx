import './style.css';

const BackgroundOverlay = () => {

    const bg = "https://images.unsplash.com/photo-1713302752681-0b14c1034707?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    return (
        <div className='background'>
            <div className="background-overlay">
                <div className='overlay' style={{ backgroundImage: `url(${bg})` }} />
            </div>
            <div className='background-info'>
                Photo by <a href="https://unsplash.com/@abdu3h?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" >Abdullah Arif</a>&nbsp;
                on <a href="https://unsplash.com/photos/blue-book-beside-brown-wooden-stick-Dxi6KbpvUgA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target='__blank'>Unsplash</a>
            </div>
        </div>
    )
}

export default BackgroundOverlay