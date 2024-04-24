import { useEffect, useState } from 'react'
import WorkoutDetails from '../Components/workoutsDetails';
import WorkoutForm from '../Components/workoutForm';

const Home = () => {
    //define a state variable 'workouts' and a function 'setWorkouts' to update it
    const [workouts, setWorkouts] = useState(null)
    //useeffect hook to perform side effects in function components
    useEffect(() => {
        //define an asynchronous function to fetch data
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:4000/api/workouts');
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Invalid response format: Expected JSON');
                }
                const json = await response.json();
                setWorkouts(json);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []); 
    return(
        <div className="home">
            <h2>Home</h2>
            <div className="workouts">
                {workouts && workouts.map((workout) => (//so this code does is check if the first condition is true, if so fires the arrow fucntion.
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm/>
        </div>

    )

}

export default Home