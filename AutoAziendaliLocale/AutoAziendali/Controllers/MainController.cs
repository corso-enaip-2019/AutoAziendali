using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Net;
using System.Net.Http;

namespace AutoAziendali.Controllers
{
    [RoutePrefix("api")]
    public class MainController : BaseController
    {
        #region Veicolo

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

        #endregion

        #region Province

        [HttpGet]
        [Route("getprovince")]
        public List<Province> GetProvince()
        {
            var p = _context.Province.ToList();
            return p;
        }

        #endregion        [HttpGet]

        #region Utilizzo veicoli

        [Route("getutilizzo")]
        public List<UtilizzoVeicoli> GetUtilizzoveicoli()
        {
            var u = _context.UtilizzoVeicoli.ToList();
            return u;
        }

        #endregion

        #region TipiScadenze

        [HttpGet]
        [Route("getscadenza")]
        public List<Scadenze> GetScadenza()
        {
            return _context.Scadenze.ToList();
        }

        //[HttpPost]
        //[Route("deleteVeicolo")]
        //public async Task<HttpResponseMessage> DeleteAuto([FromBody]int id)
        //{
        //    var currentVeicolo = await _context.Veicoli.FirstOrDefaultAsync(a => a.IdVeicolo == id);
        //    if (currentVeicolo == null)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.BadRequest);
        //    }
        //    _context.Veicoli.Remove(currentVeicolo);
        //    await _context.SaveChangesAsync();
        //    return Request.CreateResponse(HttpStatusCode.OK);
        //}

        //[HttpPost]
        //[Route("editVeicolo")]
        //public async Task<HttpResponseMessage> EditVeicolo([FromBody]Veicoli veicolo)
        //{
        //    var currentVeicolo = await _context.Veicoli.FirstOrDefaultAsync(v => v.IdVeicolo == veicolo.IdVeicolo);
        //    if (currentVeicolo == null)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.NotAcceptable);
        //    }

        //    else
        //    {
        //        _context.Entry(currentVeicolo).CurrentValues.SetValues(veicolo);
        //        //currentAuto.Targa = auto.Targa;
        //        //currentAuto.Marca = auto.Marca;
        //        //currentAuto.Modello = auto.Modello;
        //        //currentAuto.Anno = auto.Anno;
        //        //currentAuto.Cilindrata = auto.Cilindrata;
        //        //currentAuto.Kw = auto.Kw;
        //        //currentAuto.Colore = auto.Colore;

        //        await _context.SaveChangesAsync();

        //        return Request.CreateResponse(HttpStatusCode.OK);
        //    }
        //}

        //[HttpPost]
        //[Route("addVeicolo")]
        //public async Task<HttpResponseMessage> AddVeicolo([FromBody]Veicoli veicolo)
        //{
        //    var currentVeicolo = new Veicoli();
        //    if (veicolo == null)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.NotAcceptable);
        //    }
        //    else
        //    {
        //        currentVeicolo.Targa = veicolo.Targa;
        //        currentVeicolo.Marca = veicolo.Marca;
        //        currentVeicolo.Modello = veicolo.Modello;
        //        currentVeicolo.Versione = veicolo.Versione;
        //        currentVeicolo.Telaio = veicolo.Telaio;
        //        currentVeicolo.Immatricolazione = veicolo.Immatricolazione;
        //        currentVeicolo.Cilindrata = veicolo.Cilindrata;
        //        currentVeicolo.CvVapore = veicolo.CvVapore;
        //        currentVeicolo.Kw = veicolo.Kw;
        //        currentVeicolo.CvFiscali = veicolo.CvFiscali;
        //        currentVeicolo.Colore = veicolo.Colore;
        //        currentVeicolo.Formato = veicolo.Formato;
        //        currentVeicolo.Alimentazione = veicolo.Alimentazione;
        //        currentVeicolo.NormativaEuro = veicolo.NormativaEuro;
        //        currentVeicolo.Provincia = veicolo.Provincia;

        //        _context.Veicoli.Add(currentVeicolo);
        //        await _context.SaveChangesAsync();

        //        return Request.CreateResponse(HttpStatusCode.OK);
        //    }
        //}

        #endregion

        #region ScadenzePerVeicolo

        /* Singole scadenze per singolo veicolo. */
        [HttpGet]
        [Route("getscadenzaveicolo")]
        public List<ScadenzeVeicoli> GetScadenzaVeicolo()
        {
            return _context.ScadenzeVeicoli.ToList();
        }

        // [... il resto del CRUD]
        #endregion

        //#region email
        //
        //}
        //[HttpGet]
        //[Route("getEmail")]
        //public async Task<List<Email>> GetEmail()
        //{
        //    return await _context.Email.ToListAsync();
        //}
        //
        //#endregion
    }
}