using ProjectManagement.Business.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            try
            {
                ctx.Users.AddObject(user);
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
