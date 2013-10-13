var Language = {
  en: {
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
    SEX_0:"Male",
    SEX_1:"Female",
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
    SEX_0:"Männlich",
    SEX_1:"Weiblich",
    FORGOT_PASS:"Passwort vergessen?",
    PASSWORD:"Passwort",
    LOGIN:"Login",
    EMAIL:"Email",
    PENDING:"Wartend",
    ACTIVE:"In Bearbeitung",
    CLOSED:"Geschlossen",
    CLOSED_CALLS:"Abgeschl. Anrufe",
    CALL_DESCRIPTION:"Call Description",
    ATTACHED_PHOTOS:"Attached Photos",
    COMMENTS:"Comments",
    NO_CALL_SELECTED:"No Call Selected",
    VIEW:"Sicht",
    TAKE:"Nehmen",
    CLOSE:"Schliessen",
    OPEN:"Öffnen",
    LEAVE:"Verlassen",
    DESCRIPTION:"_NAME_ hat am _DATE_. Das Opfer ist _AGE_, _SEX_ und wiegt _WEIGHT_kg.",
    NAME:"Name",
    NEW_CALL:"Neuer Anruf",
    PROFILES:"Profile",
    HISTORY:"Historie",
    ABOUT:"Information",
    LOC_SHARE:"Standort austauschen",
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
    SEX_0:"Mâle",
    SEX_1:"Femelle",
    FORGOT_PASS:"Oublié votre mot de passe?",
    PASSWORD:"Mot de passe",
    LOGIN:"Login",
    EMAIL:"Email",
    PENDING:"En Attente",
    ACTIVE:"Actif",
    CLOSED:"Fermé",
    CLOSED_CALLS:"Appels terminés",
    CALL_DESCRIPTION:"Call Description",
    ATTACHED_PHOTOS:"Attached Photos",
    COMMENTS:"Comments",
    NO_CALL_SELECTED:"No Call Selected",
    VIEW:"Vue",
    TAKE:"Prendre",
    CLOSE:"Fermer",
    OPEN:"Ouvrir",
    LEAVE:"Quitter",
    DESCRIPTION:"_NAME_ a appelé le _DATE_. Le sujet est un _SEX_ âgé de _AGE_ ans et pesant _WEIGHT_kg.",
    NAME:"Name",
    NEW_CALL:"Nouvel Appel",
    PROFILES:"Profiles",
    HISTORY:"Historique",
    ABOUT:"A Propos",
    LOC_SHARE:"Partage de position",
    AGE:"Âge",
    WEIGHT:"Poids",
    WHEN:"Quand",
    MOBILE:"Mobile",
    ATTACH_PHOTOS:"Attacher Photos",
    SAVED_PROFILES:"Profiles Sauvegardés",
    NEW_PROFILE:"Nouveau Profile",
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

