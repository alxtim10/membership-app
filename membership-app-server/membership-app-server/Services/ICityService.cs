using membership_app_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace membership_app_server.Services
{
    public interface ICityService
    {
        Task<List<City>> GetAllCity(int province_id);
    }
}
