import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { UPDATE_PROJECT } from '../mutations/projectMutations'
import { useNavigate } from 'react-router-dom'

const EditProjectForm = ({ project }) => {
  const navigate = useNavigate()
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case 'Not Started':
        return 'new'
      case 'In Progress':
        return 'in-progress'
      case 'Completed':
        return 'completed'
      default:
        throw new Error(`Unknown status; ${project.status}`)
    }
  })

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  })

  const submitHandler = (e) => {
    e.preventDefault()

    if (!name || !description || !status) {
      return alert('Please fill out all fields')
    }
    updateProject(name, description, status)
    navigate('/')
  }
  return (
    <>
      <div className="mt-5">
        <h3>Update Project Details</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="new">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default EditProjectForm
