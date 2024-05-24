using membership_app_server.BusinessObject;
using membership_app_server.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Xml.Linq;

namespace membership_app_server.Services
{
    public class MemberService : IMemberService
    {
        private readonly MembershipContext _db;

        public MemberService(MembershipContext db)
        {
            _db = db;
        }

        public async Task<List<BResMember>> GetAllMember()
        {

            var member = await _db.Members.Select(x => new BResMember
            {
                id = x.id,
                name = x.name,
                place_of_birth = x.place_of_birth,
                date_of_birth = x.date_of_birth.ToString(),
                phone_number = x.phone_number,
                email = x.email,
                address = x.address,
                province = x.province,
                city = x.city,
                gender = x.gender,
                job = x.job,
                status = x.status
            }).AsNoTracking().ToListAsync();

            foreach (var item in member)
            {
                item.date_of_birth = DateTime.Parse(item.date_of_birth).ToString("dd MMMM yyyy");
            }

            return member;
        }

        public async Task<BResMember> GetMemberDetailById(int id)
        {
            var member = await _db.Members.Where(x => x.id == id).Select(x => new BResMember
            {
                id = x.id,
                name = x.name,
                place_of_birth = x.place_of_birth,
                date_of_birth = x.date_of_birth.ToString(),
                phone_number = x.phone_number,
                email = x.email,
                address = x.address,
                province = x.province,
                city = x.city,
                gender = x.gender,
                job = x.job,
                status = x.status
            }).AsNoTracking().FirstOrDefaultAsync();

            member.date_of_birth = DateTime.Parse(member.date_of_birth).ToString("yyyy-MM-dd");


            return member;
        }

        public async Task<string> AddMember(BReqMember newMember)
        {
            Member member = new Member()
            {
                name = newMember.name,
                place_of_birth = newMember.place_of_birth,
                date_of_birth = newMember.date_of_birth,
                phone_number = newMember.phone_number,
                email = newMember.email,
                address = newMember.address,
                province = newMember.province,
                city = newMember.city,
                gender = newMember.gender,
                job = newMember.job,
                status = newMember.status
            };

            _db.Members.Add(member);
            await _db.SaveChangesAsync();

            var result = "Success";

            return result;
        }

        public async Task<string> EditMember(BReqMember requestMember)
        {
            var result = "";
            Member existingMember = await _db.Members.Where(x => x.id == requestMember.id).FirstOrDefaultAsync();

            if(existingMember != null)
            {
                existingMember.name = requestMember.name;
                existingMember.place_of_birth = requestMember.place_of_birth;
                existingMember.date_of_birth = requestMember.date_of_birth;
                existingMember.phone_number = requestMember.phone_number;
                existingMember.email = requestMember.email;
                existingMember.address = requestMember.address;
                existingMember.province = requestMember.province;
                existingMember.city = requestMember.city;
                existingMember.gender = requestMember.gender;
                existingMember.job = requestMember.job;
                existingMember.status = requestMember.status;

                await _db.SaveChangesAsync();
                result = existingMember.id.ToString();
            } else
            {
                throw new InvalidOperationException("Data not found");
            }

            return result;
        }

        public async Task<string> DeleteMember(int request)
        {
            var result = "";
            Member existingMember = await _db.Members.Where(x => x.id == request).FirstOrDefaultAsync();

            if (existingMember != null)
            {
               
                _db.Members.Remove(existingMember);
                await _db.SaveChangesAsync();
                result = existingMember.id.ToString();
            }
            else
            {
                throw new InvalidOperationException("Data not found");
            }

            return result;
        }
    }
}