using ProjectManagement.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace ProjectManagement.Data
{
    public class TasksDAC
    {
        public List<Task> Select()
        {
            List<Task> resultsList = null;

            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            resultsList = ctx.Tasks.ToList();

            return resultsList;
        }

        public Task SelectTask(int taskId)
        {
            Task task = null;

            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            task = ctx.Tasks.FirstOrDefault(x => x.Task_ID == taskId);

            return task;
        }

        public IEnumerable<Task> SelectByName(string taskName)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            IEnumerable<Task> tasks = ctx.Tasks.Where(c => string.Equals(c.Task_Name, taskName, StringComparison.OrdinalIgnoreCase));

            return tasks;
        }

        public Task Create(Task task)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            Task editedTask = null;
            try
            {

                if (!ctx.Tasks.Any(x => x.Task_ID == task.Task_ID))
                {
                    ctx.Tasks.AddObject(task);
                }
                else
                {
                    editedTask = ctx.Tasks.FirstOrDefault(x => x.Task_ID == task.Task_ID);
                    editedTask.Project_ID = task.Project_ID;
                    editedTask.Start_Date = task.Start_Date;
                    editedTask.End_Date = task.End_Date;
                    editedTask.Task_Name = task.Task_Name;
                    editedTask.Status = task.Status;
                    editedTask.Priority = task.Priority;
                    editedTask.Parent_ID = task.Parent_ID;
                }
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                throw;
            }

            return task;
        }
        public void Delete(int Id)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            Task task = ctx.Tasks.FirstOrDefault(c => c.Task_ID == Id);
            ctx.DeleteObject(task);
            ctx.SaveChanges();
        }
    }
}
