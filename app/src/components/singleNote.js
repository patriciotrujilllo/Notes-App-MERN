import { useParams } from "react-router-dom"

export const SingleNote = ({notes}) =>{

    const {id} = useParams()
    const note = notes.find(note=>note.id===id)

    if(!note) return null
    return (
        <div>
            <h2>{note.content}</h2>
            <h2>{note.important? 'important':''}</h2>
        </div>
    
    )
}

    