using ProjectManagement.Business.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManagement.Data
{
    public class ParentTasksDAC
    {
        public List<ParentTask> Select()
        {
            List<ParentTask> resultsList = null;

            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            resultsList = ctx.ParentTasks.ToList();

            return resultsList;
        }

        public ParentTask SelectTask(int taskId)
        {
            ParentTask task = null;

            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            task = ctx.ParentTasks.FirstOrDefault(x => x.Parent_ID == taskId);

            return task;
        }

        public IEnumerable<ParentTask> SelectByName(string taskName)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            IEnumerable<ParentTask> tasks = ctx.ParentTasks.Where(c => string.Equals(c.Parent_Task, taskName, StringComparison.OrdinalIgnoreCase));

            return tasks;
        }

        public ParentTask Create(ParentTask task)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;

            try
            {
                ctx.ParentTasks.AddObject(task);
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
            ParentTask task = ctx.ParentTasks.FirstOrDefault(c => c.Parent_ID == Id);
            ctx.DeleteObject(task);
            ctx.SaveChanges();
        }
    }
}
