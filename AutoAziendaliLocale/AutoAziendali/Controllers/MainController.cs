using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
using System.Net.Http;
using System.Net;

namespace AutoAziendali.Controllers
{
    [RoutePrefix("api")]
    public class MainController : BaseController
    {
        [HttpGet]
        [Route("getveicolo")]
        public List<Veicoli> GetVeicolo()
        {
            var l = _context
                .Veicoli
                .Include(v => v.Province)
                .ToList();
            return l;
        }

        [HttpPost]
        [Route("deleteVeicolo")]
        public async Task<HttpResponseMessage> DeleteAuto([FromBody]int id)
        {
            var currentVeicolo = await _context.Veicoli.FirstOrDefaultAsync(a => a.IdVeicolo == id);
            if (currentVeicolo == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            _context.Veicoli.Remove(currentVeicolo);
            await _context.SaveChangesAsync();
            return Request.CreateResponse(HttpStatusCode.OK);
        }


        [HttpPost]
        [Route("editVeicolo")]
        public async Task<HttpResponseMessage> EditVeicolo([FromBody]Veicoli veicolo)
        {
            var currentVeicolo = await _context.Veicoli.FirstOrDefaultAsync(v => v.IdVeicolo == veicolo.IdVeicolo);
            if (currentVeicolo == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }

            else
            {
                _context.Entry(currentVeicolo).CurrentValues.SetValues(veicolo);
                //currentAuto.Targa = auto.Targa;
                //currentAuto.Marca = auto.Marca;
                //currentAuto.Modello = auto.Modello;
                //currentAuto.Anno = auto.Anno;
                //currentAuto.Cilindrata = auto.Cilindrata;
                //currentAuto.Kw = auto.Kw;
                //currentAuto.Colore = auto.Colore;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }




        [HttpPost]
        [Route("addVeicolo")]
        public async Task<HttpResponseMessage> AddVeicolo([FromBody]Veicoli veicolo)
        {
            var currentVeicolo = new Veicoli();
            if (veicolo == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }
            else
            {
                currentVeicolo.Targa = veicolo.Targa;
                currentVeicolo.Marca = veicolo.Marca;
                currentVeicolo.Modello = veicolo.Modello;
                currentVeicolo.Versione = veicolo.Versione;
                currentVeicolo.Telaio = veicolo.Telaio;
                currentVeicolo.Immatricolazione = veicolo.Immatricolazione;
                currentVeicolo.Cilindrata = veicolo.Cilindrata;
                currentVeicolo.CvVapore = veicolo.CvVapore;
                currentVeicolo.Kw = veicolo.Kw;
                currentVeicolo.CvFiscali = veicolo.CvFiscali;
                currentVeicolo.Colore = veicolo.Colore;
                currentVeicolo.Formato = veicolo.Formato;
                currentVeicolo.Alimentazione = veicolo.Alimentazione;
                currentVeicolo.NormativaEuro = veicolo.NormativaEuro;
                currentVeicolo.Provincia = veicolo.Provincia;

                _context.Veicoli.Add(currentVeicolo);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK);

            }
        }


        [HttpGet]
        [Route("getutilizzo")]
        public List<UtilizzoVeicoli> GetUtilizzoveicoli()
        {
            var l = _context.UtilizzoVeicoli.ToList();
            return l;
        }
        //}
        //[HttpGet]
        //[Route("getEmail")]
        //public async Task<List<Email>> GetEmail()
        //{
        //    return await _context.Email.ToListAsync();
        //}
    }
}

    