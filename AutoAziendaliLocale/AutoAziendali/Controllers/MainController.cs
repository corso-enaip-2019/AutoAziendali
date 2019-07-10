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
        #region Veicoli

        [HttpGet]
        [Route("getveicoli")]
        public List<Veicoli> GetVeicoli()
        {
            var l = _context
                .Veicoli
                .Include(v => v.Province)
                .ToList();
            return l;
        }
        [HttpPost]
        [Route("deleteveicolo")]
        public async Task<HttpResponseMessage> DeleteVeicolo([FromBody]int id)
        {
            var currentUtilizzo = await _context.Veicoli.FirstOrDefaultAsync(a => a.IdVeicolo == id);
            if (currentUtilizzo == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            _context.Veicoli.Remove(currentUtilizzo);
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

        #region Anagrafiche
        [HttpGet]
        [Route("getanagrafiche")]
        public List<Anagrafica> GetAnagrafiche()
        {
            var a = _context.Anagrafica.ToList();
            return a;
        }
        #endregion

        #region Utilizzo veicoli

        [Route("getutilizzi")]
        public List<UtilizzoVeicoli> GetUtilizziVeicoli()
        {
            var u = _context.UtilizzoVeicoli.ToList();
            return u;
        }

        [HttpPost]
        [Route("deleteUtilizzo")]
        public async Task<HttpResponseMessage> DeleteUtilizzo([FromBody]int id)
        {
            var currentUtilizzo = await _context.UtilizzoVeicoli.FirstOrDefaultAsync(a => a.IdUtilizzoVeicoli == id);
            if (currentUtilizzo == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            _context.UtilizzoVeicoli.Remove(currentUtilizzo);
            await _context.SaveChangesAsync();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("editUtilizzo")]
        public async Task<HttpResponseMessage> EditUtilizzo([FromBody]UtilizzoVeicoli utilizzo)
        {
            var currentUtilizzo = await _context.UtilizzoVeicoli.FirstOrDefaultAsync(v => v.IdUtilizzoVeicoli == utilizzo.IdUtilizzoVeicoli);
            if (currentUtilizzo == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }

            else
            {
                _context.Entry(currentUtilizzo).CurrentValues.SetValues(utilizzo);
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
        [Route("addUtilizzo")]
        public async Task<HttpResponseMessage> AddUtilizzo([FromBody]UtilizzoVeicoli utilizzo)
        {
            var currentUtilizzo = new UtilizzoVeicoli();
            if (utilizzo == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }
            else
            {
                currentUtilizzo.IdVeicolo = utilizzo.IdVeicolo;
                currentUtilizzo.DataInizio = utilizzo.DataInizio;
                currentUtilizzo.DataFine = utilizzo.DataFine;
                currentUtilizzo.KmInizio = utilizzo.KmInizio;
                currentUtilizzo.KmFine = utilizzo.KmFine;
                currentUtilizzo.Destinazione = utilizzo.Destinazione;
                currentUtilizzo.CostoCarburante = utilizzo.CostoCarburante;
                currentUtilizzo.CostoPedaggio = utilizzo.CostoPedaggio;
                currentUtilizzo.IdAnagrafica = utilizzo.IdAnagrafica;
                currentUtilizzo.IdCommessa = utilizzo.IdCommessa;

                _context.UtilizzoVeicoli.Add(currentUtilizzo);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }


        #endregion

        #region TipiScadenze

        [HttpGet]
        [Route("getscadenze")]
        public List<Scadenze> GetScadenze()
        {
            return _context.Scadenze.ToList();
        }

        [HttpPost]
        [Route("deletescadenza")]
        public async Task<HttpResponseMessage> DeleteScadenza([FromBody]int id)
        {
            var currentScadenza = await _context.Scadenze.FirstOrDefaultAsync(s => s.IdScadenza == id);
            if (currentScadenza == null)
            {
                /* Non è stata trovata una scadenza con quell'id. */
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            _context.Scadenze.Remove(currentScadenza);
            await _context.SaveChangesAsync();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("editscadenza")]
        public async Task<HttpResponseMessage> EditScadenza([FromBody]Scadenze scadenza)
        {
            var currentScadenza = await _context.Scadenze.FirstOrDefaultAsync(s => s.IdScadenza == scadenza.IdScadenza);
            if (currentScadenza == null)
            {
                /* Non è stata trovata una scadenza con quell'id. */
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }

            else
            {
                _context.Entry(currentScadenza).CurrentValues.SetValues(scadenza);
                //currentScadenza.Scadenza = scadenza.Scadenza;
                //currentScadenza.GiorniPreavviso = scadenza.GiorniPreavviso;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }

        [HttpPost]
        [Route("addscadenza")]
        public async Task<HttpResponseMessage> AddScadenza([FromBody]Scadenze scadenza)
        {
            var currentScadenza = new Scadenze();
            if (scadenza == null)
            {
                /* Scadenza arrivata dal browser è null. */
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }
            else
            {
                _context.Entry(currentScadenza).CurrentValues.SetValues(scadenza);
                //currentScadenza.Scadenza = scadenza.Scadenza;
                //currentScadenza.GiorniPreavviso = scadenza.GiorniPreavviso;

                _context.Scadenze.Add(currentScadenza);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }

        #endregion

        #region ScadenzePerVeicolo
        /* Singole scadenze per singolo veicolo. */

        [HttpGet]
        [Route("getscadenzeveicoli")]
        public List<ScadenzeVeicoli> GetScadenzeVeicoli()
        {
            return _context.ScadenzeVeicoli.ToList();
        }

        [HttpPost]
        [Route("deletescadenzaveicolo")]
        public async Task<HttpResponseMessage> DeleteScadenzaVeicolo([FromBody]int id)
        {
            var currentScadenzaVeicolo = await _context.ScadenzeVeicoli.FirstOrDefaultAsync(sv => sv.IdScadenzeVeicoli == id);
            if (currentScadenzaVeicolo == null)
            {
                /* Non è stata trovata una scadenzaVeicolo con quell'id. */
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            _context.ScadenzeVeicoli.Remove(currentScadenzaVeicolo);
            await _context.SaveChangesAsync();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("editscadenzaveicolo")]
        public async Task<HttpResponseMessage> EditScadenzaVeicolo([FromBody]ScadenzeVeicoli scadVeicolo)
        {
            var currentScadenzaVeicolo = await _context.ScadenzeVeicoli.FirstOrDefaultAsync(sv => sv.IdScadenza == scadVeicolo.IdScadenza);
            if (currentScadenzaVeicolo == null)
            {
                /* Non è stata trovata una scadenzaVeicolo con quell'id. */
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }
            else
            {
                _context.Entry(currentScadenzaVeicolo).CurrentValues.SetValues(scadVeicolo);
                currentScadenzaVeicolo.IdScadenzeVeicoli = scadVeicolo.IdScadenzeVeicoli;
                currentScadenzaVeicolo.IdVeicolo = scadVeicolo.IdVeicolo;
                currentScadenzaVeicolo.Data = scadVeicolo.Data;
                currentScadenzaVeicolo.IdScadenza = scadVeicolo.IdScadenza;
                currentScadenzaVeicolo.Costo = scadVeicolo.Costo;
                currentScadenzaVeicolo.IdDocumento = scadVeicolo.IdDocumento;
                currentScadenzaVeicolo.Note = scadVeicolo.Note;
                currentScadenzaVeicolo.Avviso = scadVeicolo.Avviso;
                currentScadenzaVeicolo.AvvisoInviato = scadVeicolo.AvvisoInviato;

                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }

        [HttpPost]
        [Route("addscadenzaveicolo")]
        public async Task<HttpResponseMessage> AddScadenzaVeicolo([FromBody]Scadenze scadVeicolo)
        {
            var currentScadenzaVeicolo = new ScadenzeVeicoli();
            if (currentScadenzaVeicolo == null)
            {
                /* La scadenza arrivata dal browser è null. */
                return Request.CreateResponse(HttpStatusCode.NotAcceptable);
            }
            else
            {
                _context.Entry(currentScadenzaVeicolo).CurrentValues.SetValues(scadVeicolo);
                //currentScadenzaVeicolo.Scadenza = scadVeicolo.Scadenza;
                //currentScadenzaVeicolo.GiorniPreavviso = scadVeicolo.GiorniPreavviso;

                _context.ScadenzeVeicoli.Add(currentScadenzaVeicolo);
                await _context.SaveChangesAsync();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }
        #endregion

        #region Commesse

        [HttpGet]
        [Route("getcommesse")]
        public async Task<List<CommesseVecchia>> GetCommesse()
        {
            return await _context.CommesseVecchia.ToListAsync();
        }

        #endregion
        
        #region Documenti

        [HttpGet]
        [Route("getdocumenti")]
        public async Task<List<Documenti>> GetDocumenti()
        {
            return await _context.Documenti.ToListAsync();
        }

        #endregion

        #region StatoVeicoli

        [HttpGet]
        [Route("getstatoveicoli")]
        public List<StatoVeicoli> GetStatoVeicoli()
        {
            var s = _context.StatoVeicoli.ToList();
            return s;
        }

        #endregion

        #region Stato

        [HttpGet]
        [Route("getstati")]
        public List<Stati> GetStati()
        {
            var s = _context.Stati.ToList();
            return s;
        }

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