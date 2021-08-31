# Übersicht

Dieses Repository enthält den Code für das Backend der 
Web-Simplex-Anwendung. Das Backend stellt mehrere Endpunkte zum
Abfragen, Erstellen, Bearbeiten und Löschen von Aufgaben bereit.

# Voraussetzungen

Beim Backend handelt es sich um ein JavaScript-Projekt das vom
Node.js-Interpreter ausgeführt wird. Für das Management von
Projektinformationen und Abhängigkeiten wird Node's npm-Paketmanager
eingesetzt.

Weiterhin wird die Datenbank PostgreSQL verwendet, welche je nach
Betriebssystem nach der Installation eventuell manuell als Dienst 
gestartet werden muss.

Das Backend wurde erfolgreich mit folgenden Versionen getestet:

|||
|---|---|
| Node.js | 14.17.0 |
| npm | 7.20.5 |
| PostgreSQL | 13.3 |

# Ausführen

Um dieses Projekt zu nutzen muss es zunächst von GitHub geklont werden:

```bash
~$ git clone https://github.com/TatjanaMerkel/web-simplex-express.git
```

Anschließend müssen die npm-Paket-Abhängigkeiten in den
`node-modules`-Ordner hineininstalliert werden:

```bash
~/web-simplex-express$ npm install
```

Anschließend kann das Backend mit folgendem Befehl gestartet werden:

```bash
~/web-simplex-express$ npm start
```

Das Backend nutzt folgende Parameter um eine Verbindung zur Datenbank
herzustellen. Wird eine Umgebungsvariable nicht gesetzt so greifen
die Standardwerte.

|Variable|Standardwert|
|---|---|
| DB_USER | 'postgres' |
| DB_HOST | 'localhost' |
| DB_NAME | 'web_simplex_db' |
| DB_PW | 'web_simplex_db' |
| DB_PORT | 5432 |
