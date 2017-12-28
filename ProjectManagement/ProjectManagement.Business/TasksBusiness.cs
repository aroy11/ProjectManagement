using ProjectManagement.Data;
using ProjectManagement.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProjectManagement.Business
{
    public class TasksBusiness
    {
        public IEnumerable<Task> GetTasks()
        {
            IEnumerable<Task> resultsList = null;

            TasksDAC tasksData = new TasksDAC();
            resultsList = tasksData.Select();

            return resultsList;
        }

        public Task GetTaskByID(int taskID)
        {
            Task task = null;

            TasksDAC tasksData = new TasksDAC();
            task = tasksData.SelectTask(taskID);

            return task;
        }

        public IEnumerable<Task> GetTaskByName(string taskName)
        {
            IEnumerable<Task> tasks = null;

            TasksDAC tasksData = new TasksDAC();
            tasks = tasksData.SelectByName(taskName);

            return tasks;
        }

        public Task CreateTask(Task task)
        {
            Task newTask = null;

            TasksDAC tasksData = new TasksDAC();
            newTask = tasksData.Create(task);

            return newTask;
        }

        public void DeleteTask(int ID)
        {
            TasksDAC tasksData = new TasksDAC();
            tasksData.Delete(ID);
        }
    }
}
