using ProjectManagement.Data;
using ProjectManagement.Entities;
using System.Collections.Generic;

namespace ProjectManagement.Business
{
    public class ParentTasksBusiness
    {
        public IEnumerable<ParentTask> GetParentTasks()
        {
            IEnumerable<ParentTask> resultsList = null;

            ParentTasksDAC parentTasksData = new ParentTasksDAC();
            resultsList = parentTasksData.Select();

            return resultsList;
        }

        public ParentTask GetParentTaskByID(int taskID)
        {
            ParentTask task = null;

            ParentTasksDAC parentTasksData = new ParentTasksDAC();
            task = parentTasksData.SelectTask(taskID);

            return task;
        }

        public IEnumerable<ParentTask> GetParentTaskByName(string taskName)
        {
            IEnumerable<ParentTask> parentTasks;
            ParentTasksDAC parentTasksData = new ParentTasksDAC();
            parentTasks = parentTasksData.SelectByName(taskName);

            return parentTasks;
        }

        public ParentTask CreateParentTask(ParentTask task)
        {
            ParentTask parentTask = null;
            ParentTasksDAC parentTasksData = new ParentTasksDAC();
            parentTask = parentTasksData.Create(task);

            return parentTask;
        }

        public void DeleteParentTask(int ID)
        {
            ParentTasksDAC parentTasksData = new ParentTasksDAC();
            parentTasksData.Delete(ID);
        }
    }
}
