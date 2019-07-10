/* Definisce la singola scandenza per il singolo veicolo. */

/* Script creazione della tabella:

CREATE TABLE [dbo].[ScadenzeVeicoli](
	[IdScadenzeVeicoli] [int] IDENTITY(1,1) NOT NULL,
	[IdVeicolo] [int] NOT NULL,
	[Data] [datetime] NOT NULL,
	[IdScadenza] [int] NOT NULL, --(ID del tipo di scadenza, ID+nome+ggDiPreavviso))
	[Costo] [money] NULL,
	[IdDocumento] [int] NULL, --(i documenti sono ID+foto)
	[Note] [nvarchar](50) NULL,
	[Avviso] [bit] NULL,
	[AvvisoInviato] [bit] NULL,
 CONSTRAINT [PK_ScadenzeVeicoli] PRIMARY KEY CLUSTERED */

import { DatePipe } from '@angular/common';

//const confermaStr:string="Vuoi procedere con l'operazione?";

export class ScadenzaVeicolo {
	/* "Nullabilità" dei vari campi, presa manualmente dallo script di creazione. */
	// IdScadenzeVeicoliIsNullableInDB: boolean = false;
	// IdVeicoloIsNullableInDB: boolean = false;
	// DataIsNullableInDB: boolean = false;
	// IdScadenzaIsNullableInDB: boolean = false;
	// CostoIsNullableInDB: boolean = true;
	// IdDocumentoIsNullableInDB: boolean = true;
	// NoteIsNullableInDB: boolean = true;
	// AvvisoIsNullableInDB: boolean = true;
	// AvvisoInviatoIsNullableInDB: boolean = true;

	constructor(public IdScadenzeVeicoli: number, public IdVeicolo: number, public Data: Date, public IdScadenza: number, public Costo: number, public IdDocumento: number, public Note: string, public Avviso: boolean, public AvvisoInviato: boolean) { }

	public isCostoMaggiore0() { return (this.Costo > 0); }
	public isCosto0() { return (this.Costo == 0); }
	public isCostoUnNaN() { return isNaN(this.Costo); }

	public static operationConfirm(): boolean {
		return window.confirm("Vuoi procedere con l'operazione?");
	}
}