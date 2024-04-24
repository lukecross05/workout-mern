import { useState } from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')

    const handleSubmit= async (e) => {
        e.preventDefault()

        const workout = {title, reps, load}

        const response = await fetch('http://localhost:4000/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setReps('')
            setLoad('')
            setError(null)
            console.log('new workout added')
        }
    }

    return(
       <form className="create" onSubmit={handleSubmit}>
        <h3>Create new workout</h3>
        <label>Excersize title</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <label>Load (KG) :</label>
        <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
        />

        <label>Reps :</label>
        <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
        />

        <button> Submit </button>
        {error && <div className="error">{error}</div>}
       </form>
    )
}

export default WorkoutForm