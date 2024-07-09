interface Item {
  title: string;
  description: string;
}

type TreeTypeId = 'LINDE' | 'AHORN' | 'EICHE' | 'KASTANIE' | 'PLATANE';
export interface TreeType extends Item {
  id: TreeTypeId;
}

type IconType = 'info' | 'zoom' | 'water' | 'subscribe';
export interface CollaborationItem extends Item {
  icon: IconType;
}
interface FAQ extends Item {
  qa: Array<{ question: string; answer: string }>;
}
interface Content {
  faq: FAQ;
  imprintAndPrivacy: Item;
  intro: {
    title: string;
    subline: string;
    disclaimer: string;
    description: string[];
  };
  //pls do not delete the following eventNote section to facilitate process of enabling/disabling future news & notes
  //if event announcemnt is needed just de-comment this section and fill in the announcement text below
  eventNote?: {
    title: string;
  };
  whatsNew?: {
    title: string;
    description: string[];
  };
  loading: {
    snippets: string[];
  };
  sidebar: {
    about: Item[];
    waterNeeds: Item[];
    treetypes: TreeType[];
  };
  collaborate: {
    title: string;
    tiles: CollaborationItem[];
  };
}

const content: Content = {
  faq: {
    title: 'Fragen & Antworten',
    description:
      '<a target="blank" href="https://stiftung-ecken-wecken.de/projekte/leipzig-giesst/fragen-antworten-giessen">Hier</a> findest Du viele Tipps und Infos zum Gießen, zu Bäumen und zum Kontakt mit Anderen, die ebenfalls gießen.',
    qa: [
    ],
  },
  imprintAndPrivacy: {
    title: 'Impressum und Datenschutz',
    description:
      '<a target="blank" href="https://stiftung-ecken-wecken.de/kontakt-impressum/impressum-anschrift">Impressum</a> und <a target="blank" href="https://stiftung-ecken-wecken.de/kontakt-impressum/datenschutz">Datenschutz</a>',
  },
  intro: {
    title: '',
    subline:
      'Die Leipziger Straßen- und Parkbäume leiden unter Trockenheit <br class="large" /> und Du kannst ihnen helfen!',
    disclaimer:
      'Hinweis: Das Laden von etwa 50.000 gießbedürftigen Bäumen ist ressourcenintensiv und funktioniert aktuell nicht auf allen Mobilgeräten einwandfrei. Wir empfehlen die Nutzung via Desktop/Notebook-Computer',
    description: [
      'Auf dieser Plattform kannst Du Dich über Bäume in Deiner Nachbarschaft und ihren Wasserbedarf informieren. Du kannst für einzelne Bäume eine Gießpatenschaft übernehmen und/oder auch dokumentieren, wieviel erfrischende Kaltgetränke Du ihnen gegeben hast.',
      'Informiere Dich <a target="blank" href="https://stiftung-ecken-wecken.de/projekte/leipzig-giesst/fragen-antworten-giessen">hier</a> über das richtige Gießen von Bäumen. Wenn Du die Gieß-App von LEIPZIG GIESST regelmäßig nutzen möchtest, solltest Du ein Konto erstellen. Die Karte kannst Du aber auch ohne Konto erkunden.'
    ],
  },
  //pls do not delete the following eventNote section to facilitate process of enabling/disabling future news & notes
  // eventNote: {
  //   title:
  //     '<b>Gieß den Kiez LIVE: </b><br>Der Sommer neigt sich dem Ende zu und wir werden analog! Melde Dich jetzt für unser <a target="blank" href="https://www.citylab-berlin.org/events/freiwilligentage/">Mitmach-Event</a> am 11. September an und besuche uns im CityLAB Berlin.',
  // },
  whatsNew: {
    title: 'Was ist neu?',
    description: [
      `Auf geht's in die neue Gieß-Saison! Wir haben wieder einige Funktionen verbessert und neue Funktionen hinzugefügt. Die wichtigsten Verbesserungen im Überblick:<br />
      <div style="padding-top:0.5rem;padding-bottom:0.5rem; display:flex">
        <div>
          <img style="width:25px; margin-right: 5px;" alt="Watering Icon" src="/images/icon-water.svg"/><b>Gießeinträge korrigieren</b><br>
          Gießeinträge lassen sich nun nachträglich bearbeiten und kann so Wassermenge als auch das Datum korrigieren. Bei der Angabe der Wassermenge ist man dann auch nicht mehr 
          an die festen Werten beim ersten Eintragen gebunden. Und ein Zurückdatierung der Gießung ist somit auch möglich, wenn man vergessen hatte, sie am gleichen Tag einzutragen. <a href="https://user-images.githubusercontent.com/994131/162630507-381b5f77-b87a-42c8-968d-571afbe99d45.mp4" target='_blank'
          rel='noopener noreferrer'>Hier</a> gibt es kleine Demo.
        </div>
      </div>`,
      `<div style="padding-top:0.5rem;padding-bottom:0.5rem; display:flex">
        <div>
          <img style="width:25px; margin-right: 5px;" alt="Watering Icon" src="/images/icon-water.svg"/>
          <b>Gießeinträge löschen</b><br>
          Hat man seine Gießung am falschen Baum eingetragen, lässt sich diese nun löschen, wie folgende <a href="https://user-images.githubusercontent.com/994131/162630522-b3e9e84f-e7fe-4477-9398-86d84a4cdacc.mp4" target='_blank'
          rel='noopener noreferrer'>Demo</a> zeigt.</div></div>
          <div>
          <img style="width:20px; margin-right: 5px;" alt="Info Icon" src="/images/Information_icon_1(png).png"/>
          <b>Weiterführende Informationen zu den Bäumen</b><br>
          Auf der Detail-Seite eines Baum sind nun, sofern vorhanden, die passenden Wikipedia-Artikel zu Baumart und -gattung verlinkt. Für ausgewählte Gattung sind zudem die Baumsteckbriefe vom BUND Leipzig referenziert.</div>
    </div>
    <br />
    Aktuelle Informationen findest Du auch auf <a href="https://www.facebook.com/leipziggiesst" target='_blank' rel='noopener noreferrer'>Facebook</a>, <a href="https://www.instagram.com/leipziggiesst/" target='_blank' rel='noopener noreferrer'>Instagram</a> und unserer <a href="https://www.leipziggiesst.de/" target='_blank' rel='noopener noreferrer'>Homepage</a>.`,
    ],
  },
  loading: {
    snippets: [
      'Wir laden gerade etwa 50.000 gießbedürftige Bäume aus dem Leipziger Straßen- und Parkbaumbestand.',
      'Wenn du diese Seite über das Mobilfunknetz aufrufst, kann es etwas dauern.',
      'Sammle Informationen aller Bäume aus Leizpzigs Straßenbaumkataster.',
      'Schon gewusst? Ein junger Stadtbaum benötigt etwa 70 Liter Wasser in der Woche.',
    ],
  },
  sidebar: {
    about: [
      {
        title: 'Über das Projekt',
        description:
          'Die Folgen des Klimawandels, insbesondere die trockenen und heißen Sommer, belasten das Leipziger Ökosystem. Unsere Stadtbäume vertrocknen und tragen langfristige Schäden davon: In den letzten Jahren mussten immer mehr Bäume gefällt werden und ihre Lebensdauer sinkt. Inzwischen wird die Bevölkerung regelmäßig zur Unterstützung aufgerufen, allerdings weitgehend unkoordiniert. Dies möchten wir ändern und mit diesem Projekt eine koordinierte Bürger*innenbeteiligung bei der Bewässerung städtischen Grüns ermöglichen.',
      },
      {
        title: 'Über uns',
        description:
          `LEIPZIG GIESST ist ein gemeinsames Projekt von <a target="blank" href="https://codefor.de/leipzig/">OKLab Leipzig</a>, <a target="blank" href="https://www.leipzig.de/buergerservice-und-verwaltung/aemter-und-behoerdengaenge/behoerden-und-dienstleistungen/dienststelle/amt-fuer-stadtgruen-und-gewaesser-67/">Stadt Leipzig</a>, <a target="blank" href="https://stiftung-ecken-wecken.de/">Stiftung "Ecken wecken"</a>, <a target="blank" href="https://wir-im-quartier.net">Wir im Quartier</a> und <a target="blank" href="https://www.bund-leipzig.de">BUND Leipzig</a>. 
Das Projekt wird unterstützt durch das <a target="blank" href="https://www.citylab-berlin.org/">CityLAB Berlin</a> - ein Projekt der Technologiestiftung Berlin - deren App <a target="blank" href="https://www.giessdenkiez.de">Gieß den Kiez</a> die Basis für die Leipziger App von LEIPZIG GIESST bildet.`,
      },
      {
        title: 'Datenquellen',
        description:
          'Die Karte zeigt die gießbedürftigen Leipziger Straßen- und Parkbäume, die jünger als 25 Jahre sind. Zusätzlich wird abgebildet, wie viel Niederschlag in den letzten 30 Tagen bei jedem Baum gefallen ist und ob diese in dieser Zeit bereits gegossen wurden.',
      },
    ],
    waterNeeds: [
      {
        title: 'Niedriger Wasserbedarf',
        description:
          'Bäume höheren Alters (>40 Jahre) haben in der Regel gelernt, sich über das Grundwasser selbst zu versorgen. Auch Jungbäume unter 3 Jahren haben einen niedrigen Wasserbedarf, da diese im Normalfall durch das Amt für Stadtgrün und Gewässer versorgt werden.',
      },
      {
        title: 'Mittlerer Wasserbedarf',
        description:
          'Mittelalte Bäume zwischen 15 und 40 Jahren werden in der Regel nicht mehr durch das Amt für Stadtgrün und Gewässer bewässert und haben schon ein gewisses Durchhaltevermögen. Aber auch für sie sind die Hitzesommer ungewohnt und sie freuen sich über jeden Eimer. ',
      },
      {
        title: 'Hoher Wasserbedarf',
        description:
          'Jungbäume zwischen 4 und 15 Jahren werden nur situationsbedingt durch das Amt für Stadtgrün und Gewässer bewässert und sie sind noch keine „Selbstversorger“. Sie freuen sich über viel Wasser, ca. 80 - 100 Liter pro Woche.',
      },
    ],
    treetypes: [
    ],
  },
  collaborate: {
    title: '<b>Wie kann ich mitmachen?</b>',
    tiles: [
      {
        icon: 'water',
        title: 'Bäume bewässern',
        description:
          'Informiere Dich auf unserer Plattform, ob Bäume in deiner Nähe Wasser benötigen. Wenn ja, schnapp Dir eine Gießkanne, einen Eimer oder einen Schlauch und leg los. Danach trägst Du die Bewässerung hier ein. Auf unserer <a target="_blank" href="https://stiftung-ecken-wecken.de/content/wasserquellen-transport">Webseite</a> findest Du Infos zu Wasserquellen und zum Wassertransport.',
      },
      {
        icon: 'subscribe',
        title: 'Gießpatenschaft für Bäume übernehmen',
        description:
          'Wenn Du regelmäßig die gleichen Bäume gießen willst, kannst Du Dich als Gießpate / Gießpatin für sie eintragen und so anzeigen, dass für sie gesorgt ist. So findet eine Koordinierung in der Nachbarschaft statt.',
      },
      {
        icon: 'zoom',
        title: 'Den Baumbestand erkunden',
        description:
          'Unsere Karte ermöglicht es, mehr über einzelne Bäume und auch den gesamten Baumbestand zu erfahren. Nutze die Filter- und Suchfunktion, um mehr über die Bäume Leipzigs zu lernen. Auf unserer <a target="_blank" href="https://stiftung-ecken-wecken.de/content/fragen-antworten">Webseite</a> findest weitere Infos dazu.',
      },
      {
        icon: 'info',
        title: 'Mit anderen austauschen',
        description:
          'Wir werden Dich mit unserem Newsletter, der an die E-Mail-Adresse Deines Benutzerkontos hier gesendet wird, über aktuelle Entwicklungen und Aktionen auf dem Laufenden halten.',
      },
      {
        icon: 'info',
        title: 'Noch mehr Mitmachen',
        description:
          'Du kannst aber auch im Projektteam mitarbeiten, Wasserspender werden, Andere fürs Gießen begeistern, Links zu LEIPZIG GIESST viel teilen oder in der Presse über LEIPZIG GIESST berichten. Auf unserer <a target="_blank" href="https://stiftung-ecken-wecken.de/content/mitgie%C3%9Fen-mitmachen">Webseite</a> findest weitere Infos dazu. Und natürlich freuen wir uns immer über Posts/Likes bei <a href="https://www.instagram.com/leipziggiesst" target="_blank">instagram</a> oder <a href="https://www.facebook.com/leipziggiesst" target="_blank">facebook</a>.',
      },
    ],
  },
};

export default content;
