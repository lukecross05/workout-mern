import { useState, useEffect } from 'react'


const Home = () => {
    //define a state variable 'workouts' and a function 'setWorkouts' to update it
    const [workouts, setWorkouts] = useState(null)
    //useeffect hook to perform side effects in function components
    useEffect(() => {
        //define an asynchronous function to fetch data
        async function fetchData() {
            //send a GET request to fetch workouts data from the API
            try {
                const response = await fetch('/api/workouts')
                //check if the response is not OK
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const json = await response.json();
                setWorkouts(json);
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData();
    }, []); 
    return(
        <div className="home">
            <h2>Home</h2>
            <div className="workouts">
                {workouts && workouts.map((workout) => (//so this code does is check if the first condition is true, if so fires the arrow fucntion.
                    <p key={workout._id}>{workout.title}</p>
                ))}
            </div>
        </div>

    )

}

export default Home