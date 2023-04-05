import React, { useState } from 'react';

let SCREENS =[
    {
        id: 1,
        time: "10.00am",
        seats: [1, 1, 0, 1 , 1 ,1 ,0 ,0 ,1 ,1 ,0 ,1],
    },
    {
        id: 2,
        time: "2:00pm",
        seats: [1 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
    },
    {
        id: 3,
        time: "6:00pm",
        seats: [1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1]
    },
];

const MOVIES = [
    {
        id: 1,
        title: "VARISU",
        image: "https://e1.pxfuel.com/desktop-wallpaper/141/297/desktop-wallpaper-third-poster-of-vijay-s-varisu-out-varisu-thumbnail.jpg",
    },
    {
        id: 2,
        title: "THUNIVU",
        image: "https://w0.peakpx.com/wallpaper/518/827/HD-wallpaper-thunivu-varisu-thunivu-thala-thala-thalapathy-ajith-kumar-thumbnail.jpg",
    },
    {
        id: 3,
        title: "PATHUTHALA",
        image: "https://pbs.twimg.com/media/FlSG5KpacAAfnRA?format=jpg&name=small",
    },
];

export default function MovieBooking(){
    const[selectedMovie, setSelectedMovie] = useState(null);
    const[selectedScreen, setSelectedScreen] = useState(null);
    const[selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatSelect=(index, screen)=>{
        if(screen?.id !== selectedScreen?.id){
            setSelectedSeats([index]);
            setSelectedScreen(screen)
            return
        }
        setSelectedScreen(screen)
        if(selectedSeats.includes(index)){
            setSelectedSeats(selectedSeats.filter((i)=>i !== index));
            if(selectedSeats.filter((i)=> i !== index).length <1){
                setSelectedScreen(null)
            }
        }
        else{
            setSelectedSeats((seats)=>[...seats, index])
        }
    }
    const handleBooking=()=>{
        alert(`seats ${selectedSeats.map((index)=> index+1).join(", ")} booked for ${selectedScreen.movie.title}  at ${selectedScreen.time}`)
        SCREENS= SCREENS.map(screen=>{
            if(screen.id === selectedScreen?.id){
                let seats = screen.seats;
                selectedSeats.map((seat)=>(seats[seat]=0))
                return {
                    ...screen, seats
                }
            }
            return screen
        })
        setSelectedMovie(null)
        setSelectedScreen(null)
        setSelectedScreen([])
    }
    return(
        <div>
           <h1 id='main'>MOVIE TICKET BOOKING</h1>
           <h2><b>Choose your Movie</b></h2>
           <div className='movie-selection'>
            {MOVIES.map((movie)=>(
                <div className='movie' key={movie.id} onClick={()=> setSelectedMovie(movie)}>
                    <img className='movie-poster' src={movie.image} alt ={movie.title} />
                    <div className='movie-title'>{movie.title}</div>
                </div>
            ))}
           </div>
           {
            selectedMovie && (
                <>
                <h2 id='main'>CHOOSE YOUR SCREEN</h2>
                <div className='screen-selection'>
                    {
                        SCREENS.map((screen) => {
                            return (
                                <div key={screen.id} className={`screen ${
                                screen?.id === selectedScreen?.id ? "selected" : ""
                            } 
                                ${screen.seats.includes(1) ? "available" : ""} `}>
                                    <div className='screen-number'>Screen {screen.id}</div>
                                    <div className='screen.time'>{screen.time}</div>
                                    <div className='movie.title'>{selectedMovie.title}</div>
                                    <div className='screen-seats'>
                                        {
                                            screen.seats.map((seat, index)=>{
                                                return(
                                                    <div key={index} 
                                                    className={`seat ${seat ? "available" : "unavailable"}
                                                    ${
                                                    selectedSeats.includes(index) && selectedScreen?.id === screen.id ?
                                                    "selected" : ""}
                                                    ${selectedSeats.includes(index) ? "booked" : ""}
                                                    `}
                                                    onClick={()=>{
                                                        if(seat){
                                                            handleSeatSelect(index, {
                                                                ...screen,
                                                                movie: selectedMovie
                                                            })
                                                        }
                                                    }}>
                                                        <div className='seat-number'>{index + 1}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                </div>
                                </div>
                            );
                        })}
                </div>
                </>
            )}
            <div className='booking-summary'>
                <div className='selected-screen'>
                    {
                        selectedScreen && (
                            <div> 
                                <h3>SELECTED SCREEN: {selectedScreen.id}</h3>
                                <p>Time: {selectedScreen.time}</p>
                                <p>Movie: {selectedScreen.movie.title}</p>
                            </div>
                        )
                    }
            </div>
            <div className='selected-seat'>
                {
                    selectedScreen && selectedSeats?.length>0 && (
                        <div>
                            <h4>SELECTED SEATS: <>{selectedSeats.map(index=> index+1).join(", ")}</></h4>
                            <h4>NUMBER OF SEATS: {selectedSeats?.length}</h4>
                        </div>

                    )
                }

            </div>
        </div>
        <button className='payment-button' onClick={handleBooking} disabled={!selectedScreen || selectedSeats?.length ===0}>
           BOOK NOW
        </button>
        </div>
    );
}
