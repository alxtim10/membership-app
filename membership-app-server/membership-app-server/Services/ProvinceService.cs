using membership_app_server.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace membership_app_server.Services
{
    public class ProvinceService : IProvinceService
    {
        private readonly MembershipContext _db;

        public ProvinceService(MembershipContext db)
        {
            _db = db;
        }
        public async Task<List<Province>> GetAllProvince()
        {
            var provinces = await _db.Provinces.AsNoTracking().ToListAsync();

            return provinces;

        }
    }
}