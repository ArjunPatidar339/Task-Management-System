import React, { useState, useEffect } from 'react';
import taskService from '../services/task.service';
import { toast } from 'react-toastify';

const TaskForm = ({ task, onClose, onSaved }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (task) {
        await taskService.updateTask(task.id, title, description, status);
        toast.success('Task updated');
      } else {
        await taskService.createTask(title, description, status);
        toast.success('Task created');
      }
      onSaved();
    } catch (error) {
      toast.error('Failed to save task');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input 
          type="text" 
          className="form-control" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div className="mb-3">
        <label>Description</label>
        <textarea 
          className="form-control" 
          rows="3"
          value={description} 
          onChange={e => setDescription(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label>Status</label>
        <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <div>
        <button type="submit" className="btn btn-success me-2" disabled={loading}>Save</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
