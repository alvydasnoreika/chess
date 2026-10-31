# Ėjimas po ėjimo – šachmatų mokykla

Šachmatų mokymosi web aplikacija lietuvių kalba:

- 150 pamokų 16 skyrių (nuo figūrų ėjimų iki atidarymų, spąstų, kombinacijų ir endšpilio);
- 48 matų užduotys ir 42 taktikos užduotys;
- partija su robotu, kurio stiprumas priklauso nuo tavo Elo reitingo;
- žaidimas dviese prie vieno telefono (lenta ant stalo);
- XP, rangai, dienos tikslas, serijos, apdovanojimai, deimantai ir figūrų rinkiniai.

Tai vienas statinis puslapis: HTML, CSS ir JavaScript, be jokio serverio ir be kompiliavimo.

## Failai

| Failas | Paskirtis |
|---|---|
| `index.html` | Visa programa |
| `vendor/chess.js` | [chess.js](https://github.com/jhlywa/chess.js) 0.10.3 – šachmatų taisyklės (BSD licencija, žr. `vendor/chess.js.LICENSE`) |
| `manifest.webmanifest` | Leidžia įdiegti programą į telefono pradžios ekraną |
| `sw.js` | Service worker – programa veikia ir be interneto |
| `icons/` | Programos ikonos |
| `.nojekyll` | Nurodo GitHub Pages nenaudoti Jekyll |

## Paleidimas GitHub Pages

1. Prisijunk prie [github.com](https://github.com) ir sukurk naują **viešą** repozitoriją, pvz. `sachmatai`.
2. Įkelk failus: repozitorijoje spausk **Add file → Upload files** ir nutempk visus šio aplanko failus bei aplankus (`index.html`, `sw.js`, `manifest.webmanifest`, `README.md`, `.nojekyll`, `vendor/`, `icons/`). Spausk **Commit changes**.
   - Failas `.nojekyll` paslėptas daugelyje sistemų. Jei jo nematai, jis nebūtinas – programa veiks ir be jo.
3. Eik į **Settings → Pages**.
4. Skiltyje **Build and deployment** pasirink **Source: Deploy from a branch**, **Branch: `main`**, aplankas **`/ (root)`**, ir spausk **Save**.
5. Po 1–2 minučių programa bus pasiekiama adresu:
   `https://TAVO-VARTOTOJO-VARDAS.github.io/sachmatai/`

Su Git komandine eilute:

```bash
git init
git add .
git commit -m "Šachmatų mokykla"
git branch -M main
git remote add origin https://github.com/TAVO-VARTOTOJO-VARDAS/sachmatai.git
git push -u origin main
```

## Atnaujinimas

Pakeitęs failus, `sw.js` faile padidink `VERSION` (pvz. `"v1"` → `"v2"`). Taip įdiegtos programos naudotojai gaus naują versiją.

## Paleidimas savo kompiuteryje

Užtenka atidaryti `index.html` naršyklėje. Kad veiktų ir service worker, paleisk paprastą serverį:

```bash
python3 -m http.server 8000
```

ir atidaryk `http://localhost:8000`.

## Pastabos

- Progresas (XP, Elo, deimantai, rinkiniai) saugomas naršyklės `localStorage`, t. y. atskirai kiekviename įrenginyje ir naršyklėje. Išvalius naršyklės duomenis, progresas dingsta.
- Šriftai (Fraunces, Manrope) kraunami iš Google Fonts. Be interneto pirmą kartą naudojami atsarginiai sisteminiai šriftai.
- Telefone atidaryk puslapį ir pasirink **Pridėti prie pradžios ekrano** – programa atsidarys kaip atskira aplikacija.
