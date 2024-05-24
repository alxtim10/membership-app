using membership_app_server.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace membership_app_server.Services
{
    public interface IMemberService
    {
        Task<List<BResMember>> GetAllMember();
        Task<string> AddMember(BReqMember newMember);
        Task<string> EditMember(BReqMember requestMember);
        Task<string> DeleteMember(int request);
        Task<BResMember> GetMemberDetailById(int id);
    }
}
