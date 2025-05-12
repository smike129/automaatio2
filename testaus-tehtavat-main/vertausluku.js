/**
 * Laskee D'Hondtin vertausluvut yhdelle listalle
 * @param {Object[]} ehdokkaat - Taulukko ehdokasobjekteja, joissa numero, nimi ja äänimäärä
 * @returns {Object[]} - Sama taulukko, mutta lisättynä vertausluvuilla
 */

function laskeVertausluvut(ehdokkaat) {
  const jarjestetyt = [...ehdokkaat].sort((a, b) => {
    if (b.aanet === a.aanet) {
      return Math.random() - 0.5;
    }
    return b.aanet - a.aanet;
  });

  const jarjestetytArvotuilla = jarjestetyt.map((ehdokas, index, array) => {
    const onkoSamatAanet =
      index > 0 && array[index - 1].aanet === ehdokas.aanet;
    return {
      ...ehdokas,
      arvottu: onkoSamatAanet,
    };
  });

  const aanetYhteensa = jarjestetytArvotuilla.reduce(
    (summa, ehdokas) => summa + ehdokas.aanet,
    0
  );

  return jarjestetytArvotuilla
    .map((ehdokas, index) => ({
      ...ehdokas,
      vertausluku: aanetYhteensa / (index + 1),
    }))
    .sort((a, b) => {
      if (a.arvottu && b.arvottu) {
        return a.vertausluku - b.vertausluku;
      }
      return 0;
    });
}

export default laskeVertausluvut;
export { laskeVertausluvut };
