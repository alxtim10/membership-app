using membership_app_server.BusinessObject;
using membership_app_server.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace membership_app_server.Services
{
    public class CityService : ICityService
    {
        private readonly MembershipContext _db;

        public CityService(MembershipContext db)
        {
            _db = db;
        }

        public async Task<List<City>> GetAllCity(int province_id)
        {
            var cities = await _db.Cities.Where(x => x.province_id == province_id).AsNoTracking().ToListAsync();

            return cities;
        }
    }
}