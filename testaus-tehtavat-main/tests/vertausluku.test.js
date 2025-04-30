import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "../ehdokasRekisteri.js";

import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

describe("laskeVertausluvut", () => {
  beforeEach(() => {
    const lista = [
      { numero: 101, nimi: "Maija Meikäläinen", aanet: 1 },
      { numero: 102, nimi: "Kalle Korhonen", aanet: 4 },
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 5 },
    ];

    mock.method(ehdokasRekisteri, "haeLista", () => {
      return lista;
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it("listan eniten ääniä saaneen ehdokkaan vertausluku on listan äänten summa", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].vertausluku, 12);
  });
  it("listan toiseksi eniten ääniä saaneen ehdokkaan vertausluku on puolet listan äänien summasta", () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[1].vertausluku, 6);
  });

  describe("saman äänimäärän saaneet ehdokkaat", () => {
    beforeEach(() => {
      const lista = [
        { numero: 101, nimi: "Maija Meikäläinen", aanet: 2 },
        { numero: 102, nimi: "Kalle Korhonen", aanet: 2 },
        { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
        { numero: 104, nimi: "Jukka Jokinen", aanet: 5 },
      ];

      mock.method(ehdokasRekisteri, "haeLista", () => {
        return lista;
      });
    });

    afterEach(() => {
      mock.reset();
    });

    it("saman äänimäärän saaneet ehdokkaat merkitään arvotuiksi", () => {
      const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
      const samatAanet = tulos.filter((ehdokas) => ehdokas.aanet === 2);
      assert.equal(samatAanet.length, 3);
      assert.equal(samatAanet[0].arvottu, false); // Ensimmäinen ei ole arvottu
      assert.equal(samatAanet[1].arvottu, true); // Muut ovat arvottuja
      assert.equal(samatAanet[2].arvottu, true);
    });

    it("saman äänimäärän saaneet ehdokkaat saavat eri vertausluvut", () => {
      const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
      const samatAanet = tulos.filter((ehdokas) => ehdokas.aanet === 2);
      assert.notEqual(samatAanet[0].vertausluku, samatAanet[1].vertausluku);
      assert.notEqual(samatAanet[1].vertausluku, samatAanet[2].vertausluku);
    });
  });
});
