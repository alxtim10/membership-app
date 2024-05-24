using membership_app_server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace membership_app_server.Controllers
{
    public class PronviceCityController : ApiController
    {
        private readonly IProvinceService iProvinceService;
        private readonly ICityService iCityService;
        public PronviceCityController(IProvinceService provinceService, ICityService cityService)
        {
            iProvinceService = provinceService;
            iCityService = cityService;
        }

        [HttpGet]
        [Route("api/GetAllProvince")]
        public async Task<IHttpActionResult> GetAllProvince()
        {
            try
            {
                var result = await iProvinceService.GetAllProvince();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("api/GetAllCity")]
        public async Task<IHttpActionResult> GetAllCity(int province_id)
        {
            try
            {
                var result = await iCityService.GetAllCity(province_id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
    }
}