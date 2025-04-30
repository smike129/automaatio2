/**
 * Laskee D'Hondtin vertausluvut yhdelle listalle
 * @param {Object[]} ehdokkaat - Taulukko ehdokasobjekteja, joissa numero, nimi ja äänimäärä
 * @returns {Object[]} - Sama taulukko, mutta lisättynä vertausluvuilla
 */
function laskeVertausluvut(ehdokkaat) {
  // Järjestetään ehdokkaat äänimäärän mukaan laskevasti
  const jarjestetyt = [...ehdokkaat].sort((a, b) => {
    if (b.aanet === a.aanet) {
      // Jos äänimäärät ovat samat, arvotaan järjestys
      return Math.random() - 0.5;
    }
    return b.aanet - a.aanet;
  });

  // Lisätään arvottu-flagi saman äänimäärän saaneille
  const jarjestetytArvotuilla = jarjestetyt.map((ehdokas, index, array) => {
    const onkoSamatAanet =
      index > 0 && array[index - 1].aanet === ehdokas.aanet;
    return {
      ...ehdokas,
      arvottu: onkoSamatAanet,
    };
  });

  // Laske äänien summa
  const aanetYhteensa = jarjestetytArvotuilla.reduce(
    (summa, ehdokas) => summa + ehdokas.aanet,
    0
  );

  // Lasketaan vertausluvut: äänet / sija listassa
  return jarjestetytArvotuilla.map((ehdokas, index) => ({
    ...ehdokas,
    vertausluku: aanetYhteensa / (index + 1),
  }));
}

export default laskeVertausluvut;
export { laskeVertausluvut };
