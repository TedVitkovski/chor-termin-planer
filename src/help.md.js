import toggle from './img/toggle.JPG';
import crossedname from './img/crossedname.JPG';
import signout from './img/signout.JPG';
import monthswitcher from './img/monthswitcher.JPG';
export default `
# Hilfe

---

### Kurze Beschreibung

Der Hauptzweck des Terminplaners besteht darin, Termine in einer Kalenderform darzustellen
und die Möglichkeit den Teilnehmern zu geben sich von einer Veranstaltung mit einem Klick
abzumelden!


### Anmeldung

Um sich auf der Seite anzumelden, brauchen Sie lediglich einen Login und Passwort, die Sie zugewiesen
bekommen solltet.

Falls Sie ihren Passwort **vergessen** haben sollten, schreibt bitte eine E-Mail mit Ihrem Benutzernamen an die folgende E-Mail Adresse:
<fvitkovski@mail.de>

  ---
  **Vorsicht:**
  Bei dem Login (Benutzernamen) handelt es sich **nicht** um eine E-Mail Adresse, wie es die Fehlermeldung
  suggerieren könnte!

  ---

### Das Bedienen des Kalenders

Um zwischen Monaten hin und herzuschalten klicken Sie auf die oben platzierten Pfeile.
![](${monthswitcher})

### Das Abmelden von einer Veranstaltung

Um sich von einer Veranstaltung erfolgreich abzumelden brauchen Sie nur auf den
Knopf ![Grüner Knopf](${toggle}) zu klicken und schon sind sie abgemeldet, das erkennen Sie an ihrem Namen, der
in der Tabelle daneben durchgestrichen ![](${crossedname}) erscheint.

### Die Zahlen unter der Tabelle

Diese Zahlen zeigen an, wie viele Teilnehmer zur Veranstaltung angemeldet sind.

### Abmeldung

Um sich von der Seite abzumelden, drücken Sie den sich in der oben rechten befindenden
Knopf ![](${signout}) auf dem das Wort "Abmelden" steht.

`.trim();
