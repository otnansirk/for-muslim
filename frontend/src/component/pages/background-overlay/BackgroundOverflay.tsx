import './style.css';

const BackgroundOverlay = () => {

    const bg = "https://images.unsplash.com/photo-1553755088-ef1973c7b4a1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    return (
        <div className="background-overlay">
            <div className='background' style={{ backgroundImage: `url(${bg})` }} >d</div>
        </div>
    )
}

export default BackgroundOverlay