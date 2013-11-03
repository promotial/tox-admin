var Language = {
  en: {
    NOT_AVAILABLE:"Not Available",
    ENTER_COMMENT:"Enter Comment",
    OLD_PASSWORD:"Old Password",
    NEW_PASSWORD:"New Password",
    CONFIRM_PASSWORD:"Confirm Password",
    TRIAGE_TAGS:"Triage Tags",
    SETTINGS:"Settings",
    LANGUAGE:"Language",
    CHANGE_LANGUAGE:"Change Language",
    EDIT_TAG:"Edit Triage Tags",
    CHANGE_PASSWORD:"Change Password",
    ENGLISH:"English",
    FRENCH:"French",
    GERMAN:"German",
    ADMIN:"Admin",
    ACTION:"Action",
    SEX_0:"male",
    SEX_1:"female",
    FORGOT_PASS:"Forgot your password?",
    PASSWORD:"Password",
    LOGIN:"Login",
    EMAIL:"Email",
    PENDING:"Pending",
    ACTIVE:"Active",
    CLOSED:"Closed",
    CLOSED_CALLS:"Closed Calls",
    CALL_DESCRIPTION:"Call Description",
    ATTACHED_PHOTOS:"Attached Photos",
    COMMENTS:"Comments",
    NO_CALL_SELECTED:"No Call Selected",
    VIEW:"View",
    TAKE:"Take",
    CLOSE:"Close",
    OPEN:"Open",
    LEAVE:"Leave",
    DESCRIPTION:"_NAME_ called at _DATE_. The subject is a _AGE_ year old _SEX_ who weighs _WEIGHT_kg.",
    NAME:"Name",
    NEW_CALL:"New Call",
    PROFILES:"Profiles",
    HISTORY:"History",
    ABOUT:"About",
    LOC_SHARE:"Location Sharing",
    AGE:"Age",
    WEIGHT:"Weight",
    WHEN:"When",
    MOBILE:"Mobile",
    ATTACH_PHOTOS:"Attach Photos",
    SAVED_PROFILES:"Saved Profiles",
    NEW_PROFILE:"New Profile",
    GENDER:"Gender",
    DELETE:"Delete",
    SAVE:"Save",
    INITIATE_CALL:"Initiate Call"
  },
  de: {
    NOT_AVAILABLE:"Nicht Verfügbar",
    ENTER_COMMENT:"Kommentar eingeben",
    OLD_PASSWORD:"Altes Passwort",
    NEW_PASSWORD:"Neues Passwort",
    CONFIRM_PASSWORD:"Passwort bestätigen",
    TRIAGE_TAGS:"Triage Tags",
    SETTINGS:"Einstellungen",
    LANGUAGE:"Sprache",
    CHANGE_LANGUAGE:"Sprache Ändern",
    EDIT_TAG:"Triage Tags bearbeiten",
    CHANGE_PASSWORD:"Passwort ändern",
    ENGLISH:"English",
    FRENCH:"Français",
    GERMAN:"Deutsch",
    ADMIN:"Admin",
    ACTION:"Aktion",
    SEX_0:"männlich",
    SEX_1:"weiblich",
    FORGOT_PASS:"Passwort vergessen?",
    PASSWORD:"Passwort",
    LOGIN:"Login",
    EMAIL:"Email",
    PENDING:"Wartend",
    ACTIVE:"In Bearbeitung",
    CLOSED:"Geschlossen",
    CLOSED_CALLS:"Abgeschl. Anrufe",
    CALL_DESCRIPTION:"Anrufbeschreibung",
    ATTACHED_PHOTOS:"Angehängte Bilder",
    COMMENTS:"Kommentare",
    NO_CALL_SELECTED:"Kein Anruf ausgewählt",
    VIEW:"Ansicht",
    TAKE:"Übernehmen",
    CLOSE:"Schliessen",
    OPEN:"Öffnen",
    LEAVE:"Verlassen",
    DESCRIPTION:"_NAME_ hat am _DATE_. Das Opfer ist _AGE_, _SEX_ und wiegt _WEIGHT_kg.",
    NAME:"Name",
    NEW_CALL:"Neuer Anruf",
    PROFILES:"Profil",
    HISTORY:"Historie",
    ABOUT:"Information",
    LOC_SHARE:"Standortversand",
    AGE:"Alter",
    WEIGHT:"Gewicht",
    WHEN:"Wann",
    MOBILE:"Handy",
    ATTACH_PHOTOS:"Bilder anhängen",
    SAVED_PROFILES:"Gespeicherte Profile",
    NEW_PROFILE:"Neues Profil",
    GENDER:"Geschlecht",
    DELETE:"Löschen",
    SAVE:"Speichern",
    INITIATE_CALL:"Anrufen"
  },
  fr: {
    NOT_AVAILABLE:"Pas Dispo",
    ENTER_COMMENT:"Saisir Commentaire",
    OLD_PASSWORD:"Ancien mot de passe",
    NEW_PASSWORD:"Nouveau mot de passe",
    CONFIRM_PASSWORD:"Confirmer mot de passe",
    TRIAGE_TAGS:"Tags de triage",
    SETTINGS:"Reglages",
    LANGUAGE:"Langues",
    CHANGE_LANGUAGE:"Changer la Langue",
    EDIT_TAG:"Modifier Tags de triage",
    CHANGE_PASSWORD:"Modifier mot de passe",
    ENGLISH:"English",
    FRENCH:"Français",
    GERMAN:"Deutsch",
    ADMIN:"Admin",
    ACTION:"Action",
    SEX_0:"mâle",
    SEX_1:"femelle",
    FORGOT_PASS:"Oublié votre mot de passe?",
    PASSWORD:"Mot de passe",
    LOGIN:"Login",
    EMAIL:"Email",
    PENDING:"En Attente",
    ACTIVE:"Actif",
    CLOSED:"Fermé",
    CLOSED_CALLS:"Appels terminés",
    CALL_DESCRIPTION:"Description d'appel",
    ATTACHED_PHOTOS:"Photos attachées",
    COMMENTS:"Commentaires",
    NO_CALL_SELECTED:"Pas d'appel sélectionné",
    VIEW:"Afficher",
    TAKE:"Prendre",
    CLOSE:"Fermer",
    OPEN:"Ouvrir",
    LEAVE:"Quitter",
    DESCRIPTION:"_NAME_ a appelé le _DATE_. Le sujet est un/une _SEX_ âgé de _AGE_ ans et pesant _WEIGHT_kg.",
    NAME:"Nom",
    NEW_CALL:"Nouvel Appel",
    PROFILES:"Profils",
    HISTORY:"Historique",
    ABOUT:"A Propos",
    LOC_SHARE:"Partage de position",
    AGE:"Âge",
    WEIGHT:"Poids",
    WHEN:"Quand",
    MOBILE:"Mobile",
    ATTACH_PHOTOS:"Attacher Photos",
    SAVED_PROFILES:"Profils Sauvegardés",
    NEW_PROFILE:"Nouveau Profil",
    GENDER:"Sex",
    DELETE:"Supprimer",
    SAVE:"Sauvegarder",
    INITIATE_CALL:"Appeler"
  }
};

multiLang = function(baseString) {
  return Language[Session.get("language")][baseString];
};

Handlebars.registerHelper('multiLang', function(baseString) {
  return multiLang(baseString);
});

