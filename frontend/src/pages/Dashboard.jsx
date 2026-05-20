import React, { useState, useEffect } from 'react';
import taskService from '../services/task.service';
import { toast } from 'react-toastify';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getAllTasks(0, 100, search);
      setTasks(response.data.content || []);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        toast.success('Task deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'PENDING': return <span className="badge bg-warning text-dark">Pending</span>;
      case 'IN_PROGRESS': return <span className="badge bg-primary">In Progress</span>;
      case 'COMPLETED': return <span className="badge bg-success">Completed</span>;
      default: return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div className="row mt-4">
      <div className="col-12 d-flex justify-content-between align-items-center mb-4">
        <h2>My Tasks</h2>
        <button className="btn btn-primary" onClick={() => { setEditingTask(null); setShowForm(true); }}>
          + Create Task
        </button>
      </div>

      <div className="col-md-4 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="col-12 mb-4">
          <div className="card p-3 border-primary">
            <TaskForm 
              task={editingTask} 
              onClose={() => setShowForm(false)} 
              onSaved={() => { setShowForm(false); fetchTasks(); }} 
            />
          </div>
        </div>
      )}

      <div className="col-12">
        <div className="card">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{getStatusBadge(task.status)}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => { setEditingTask(task); setShowForm(true); }}
                      >Edit</button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(task.id)}
                      >Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No tasks found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
