using ProjectManagement.Data;
using ProjectManagement.Entities;
using System.Collections.Generic;

namespace ProjectManagement.Business
{
    public class UsersBusiness
    {
        public IEnumerable<User> GetProjects()
        {
            IEnumerable<User> resultsList = null;

            UsersDAC usersData = new UsersDAC();
            resultsList = usersData.Select();

            return resultsList;
        }

        public User GetUserById(int userID)
        {
            User user = null;
            UsersDAC usersData = new UsersDAC();
            user = usersData.SelectUser(userID);

            return user;
        }

        public User CreateUser(User user)
        {
            User newUser = null;

            UsersDAC usersData = new UsersDAC();
            newUser = usersData.Create(user);

            return newUser;
        }

        public void DeleteUser(int Id)
        {
            UsersDAC usersData = new UsersDAC();
            usersData.Delete(Id);
        }
    }
}
