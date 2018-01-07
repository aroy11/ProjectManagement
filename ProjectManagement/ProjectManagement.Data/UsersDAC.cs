using ProjectManagement.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace ProjectManagement.Data
{
    public class UsersDAC
    {
        public List<User> Select()
        {
            List<User> resultsList = null;

            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            resultsList = ctx.Users.ToList();

            return resultsList;
        }

        public User SelectUser(int userId)
        {
            User user = null;

            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            user = ctx.Users.FirstOrDefault(x => x.User_ID == userId);

            return user;
        }

        public User Create(User user)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            User editedUser = null;
            try
            {
                if (!ctx.Users.Any(x => x.User_ID == user.User_ID))
                {
                    ctx.Users.AddObject(user);
                }
                else
                {
                    editedUser = ctx.Users.FirstOrDefault(x => x.User_ID == user.User_ID);
                    editedUser.First_Name = user.First_Name;
                    editedUser.Last_Name = user.Last_Name;
                    editedUser.Employee_ID = user.Employee_ID;
                }
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                throw;
            }

            return user;
        }
        public void Delete(int Id)
        {
            ProjectManagementEntities ctx = ProjectManagementEntities.Context;
            User user = ctx.Users.FirstOrDefault(c => c.User_ID == Id);
            ctx.DeleteObject(user);
            ctx.SaveChanges();
        }
    }
}
