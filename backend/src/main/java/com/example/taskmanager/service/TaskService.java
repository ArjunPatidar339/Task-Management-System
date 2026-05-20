package com.example.taskmanager.service;

import com.example.taskmanager.dto.TaskDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto, String username);
    TaskDto updateTask(Long id, TaskDto taskDto, String username);
    void deleteTask(Long id, String username);
    TaskDto getTaskById(Long id, String username);
    Page<TaskDto> getAllTasksForUser(String username, String title, Pageable pageable);
    
    // Admin methods
    Page<TaskDto> getAllTasks(String title, Pageable pageable);
    void deleteTaskByAdmin(Long id);
}
