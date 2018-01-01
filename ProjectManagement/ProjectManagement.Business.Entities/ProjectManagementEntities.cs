using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ProjectManagement.Entities
{
    public partial class ProjectManagementEntities
    {
        public static ProjectManagementEntities Context
        {
            get
            {                
                return new ProjectManagementEntities();
            }
        }
    }
}
