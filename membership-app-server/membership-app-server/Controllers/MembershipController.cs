using membership_app_server.BusinessObject;
using membership_app_server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Threading.Tasks;
using System.Globalization;

namespace membership_app_server.Controllers
{
    public class MembershipController : ApiController
    {
        private readonly IMemberService iMemberService;
        public MembershipController(IMemberService memberService)
        {
            iMemberService = memberService;
        }

        [HttpGet]
        [Route("api/GetAllMember")]
        public async Task<IHttpActionResult> GetAllMembers()
        {
            try
            {
                var result = await iMemberService.GetAllMember();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/GetMemberDetailById")]
        public async Task<IHttpActionResult> GetMemberDetailById(int member_id)
        {
            try
            {
                var result = await iMemberService.GetMemberDetailById(member_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("api/AddMember")]
        public async Task<IHttpActionResult> AddMember(BReqMember request)
        {
            try
            {
                var result = await iMemberService.AddMember(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [Route("api/EditMember")]
        public async Task<IHttpActionResult> EditMember(BReqMember request)
        {
            try
            {
                var result = await iMemberService.EditMember(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        [Route("api/DeleteMember")]
        public async Task<IHttpActionResult> DeleteMember(int request)
        {
            try
            {
                var result = await iMemberService.DeleteMember(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}