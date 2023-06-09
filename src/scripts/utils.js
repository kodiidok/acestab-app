const ERROR_EMAIL = 'youremail@sci.pdn.ac.lk';
const TIME_ZONE = 'Asia/Colombo';
const DATE_FORMAT = 'MM/dd/yyyy HH:mm:ss';
const UUID_FORMAT = 'MMddyyyyHHmmss';

const MAIN_APP_NAME = 'ONLINE APPLICATION';
const SHORTLIST_APP_NAME = 'APPLICATIONS SUMMARY';
const VIEW_APP_NAME = 'VIEW APPLICANT';
const REPORTS_APP_NAME = 'REPORTS';

const APP_DESCRIPTION = 'Academic Establishment. University of Peradeniya.';
const APP_URL =
  'https://script.google.com/a/macros/sci.pdn.ac.lk/s/AKfycbxjstjNmyaEG8MKWfhPvaMGg1Q4ltP4KGxAj8Xvq91w/dev';

// 'https://script.google.com/macros/s/AKfycbx6wYqHr0XQjztRttC0pAdjriaJJIa3M-u6ABVrano/dev'
// https://script.google.com/macros/s/AKfycbyiw-ou4QFI0Ub5VTqs7HGSDM93-aZgdYYRcEocU4mpXNIjH5uQvhcOFPOzQ9cQAAMu/exec
const ALIASMAIL = 'portal@gs.pdn.ac.lk';
const UUID_CODE = 'OA';

const TEST_DBID = '1MTE8MdB-BwDG80wFlNI8zaADsnkG3XJsHxLW79ndXa4';
const DBID = '1R3ZBd0qe-Q9thnFtTXDUzMF18kCLd41IUrQbAX42JQ4';
const DATA_DBID = '1QdubFe5pbNQyevoK_LQS021OPrYxve_aGuD9xGEUI4o';
// const REQ_DBID = '1T5GMDaXjgyF0QMbsznDW9jWpap64VY1hs-FJ8uQEYk8';
const REQ_DBID = '1QdubFe5pbNQyevoK_LQS021OPrYxve_aGuD9xGEUI4o';

const APP_ROLE_SHEET = 'roles';
const VACANCY_APPLICATION_SHEET = 'mainsheet';
const VACANCY_LIST_SHEET = 'vacancy';
const POST_LIST_SHEET = 'post';
const FAC_LIST_SHEET = 'faculty';
const DEPT_LIST_SHEET = 'department';

const BASIC_DEGREE_LIST_SHEET = 'basicDegreeTitles';
const POSTGRAD_DEGREE_LIST_SHEET = 'postgradDegreeTitles';
const SUBJECT_AREA_LIST_SHEET = 'subjectAreas';

const REQUIREMENTS_MAINSHEET = 'mainsheet';
const REQUIREMENTS_LIST_SHEET = 'requirements';

const DBID_FAC_DEPT = '1MTE8MdB-BwDG80wFlNI8zaADsnkG3XJsHxLW79ndXa4';
const SHEET_FAC_DEPT = 'RolesAccount';

const PROCESSING_EMAILS = 'portal@gs.pdn.ac.lk';

const APPS = { MAIN: 'MAIN', SHORTLIST: 'SHORTLIST', VIEW: 'VIEW', REPORTS: 'REPORTS', DASHBOARD: 'DASHBOARD' };

let cKey = null;
let chunks = [];

class Utils {
  static ChunkyCache(cache, chunkSize) {
    return {
      put(key, value, timeout) {
        const json = JSON.stringify(value);
        const cSize = Math.floor(chunkSize / 2);
        let index = 0;
        while (index < json.length) {
          cKey = `${key}_${index}`;
          chunks.push(cKey);
          cache.put(cKey, json.substr(index, cSize), timeout + 5);
          index += cSize;
        }

        const superBlk = {
          chunkSize,
          chunks,
          length: json.length,
        };
        cache.put(key, JSON.stringify(superBlk), timeout);
      },
      get(key) {
        const superBlkCache = cache.get(key);
        if (superBlkCache != null) {
          const superBlk = JSON.parse(superBlkCache);
          chunks = superBlk.chunks.map(function (cKey2) {
            return cache.get(cKey2);
          });
          if (
            chunks.every(function (c) {
              return c != null;
            })
          ) {
            return JSON.parse(chunks.join(''));
          }
        }
        return null;
      },
    };
  }

  static getDateFormat() {
    return DATE_FORMAT;
  }

  static getCurrentDate() {
    const date = Utilities.formatDate(new Date(), TIME_ZONE, DATE_FORMAT);
    return date;
  }

  static getApp() {
    return APPS;
  }

  static generateUUID() {
    const date = Utilities.formatDate(new Date(), TIME_ZONE, UUID_FORMAT);
    return `${UUID_CODE}_${date}`;
  }

  static parseDate(dateValue) {
    const date = Utilities.formatDate(new Date(dateValue), TIME_ZONE, DATE_FORMAT);
    return date;
  }

  static getCurrentUser() {
    return Session.getActiveUser().getEmail();
  }

  static getAppName(retdata) {
    let APP_NAME = '';
    let page = '';
    if (retdata) {
      page = retdata.slice(6, retdata.length).toUpperCase();
    }
    try {
      if (!page) {
        APP_NAME = this.getMainAppName();
      } else if (page === Utils.getApp().SHORTLIST) {
        APP_NAME = this.getShortlistAppName();
      } else if (page === Utils.getApp().REPORTS) {
        APP_NAME = this.getReportsAppName();
      }
      return APP_NAME;
    } catch (error) {
      console.error('Error occurred while getAppName in Resources', error);
      throw new Error(`Error occurred while getAppName`);
    }
  }

  static getMainAppName() {
    return MAIN_APP_NAME;
  }

  static getShortlistAppName() {
    return SHORTLIST_APP_NAME;
  }

  static getViewAppName() {
    return VIEW_APP_NAME;
  }

  static getReportsAppName() {
    return REPORTS_APP_NAME;
  }

  static getAppDescription() {
    return APP_DESCRIPTION;
  }

  static getAppRedirectURL() {
    return APP_URL;
  }

  static getScriptUrl() {
    const url = ScriptApp.getService().getUrl();
    return url;
  }

  static getALIASMAIL() {
    return ALIASMAIL;
  }

  static getMainDBID() {
    return DBID;
  }

  static getTestMainDBID() {
    return TEST_DBID;
  }

  static getReqDBID() {
    return REQ_DBID;
  }

  static getReqMainSheetName() {
    return REQUIREMENTS_MAINSHEET;
  }

  static getReqSheetName() {
    return REQUIREMENTS_LIST_SHEET;
  }

  static getAppRoleSheetName() {
    return APP_ROLE_SHEET;
  }

  static getDataDBID() {
    return DATA_DBID;
  }

  // static getVacanciesDBID() {
  //   return VACANCY_DBID;
  // }

  static getBdTitlesListSheetName() {
    return BASIC_DEGREE_LIST_SHEET;
  }

  static getPgdTitlesListSheetName() {
    return POSTGRAD_DEGREE_LIST_SHEET;
  }

  static getSubjectAreaListSheetName() {
    return SUBJECT_AREA_LIST_SHEET;
  }

  static getApplicationSheetName() {
    return VACANCY_APPLICATION_SHEET;
  }

  static getVacanciesListSheetName() {
    return VACANCY_LIST_SHEET;
  }

  static getPostListSheetName() {
    return POST_LIST_SHEET;
  }

  static getFacListSheetName() {
    return FAC_LIST_SHEET;
  }

  static getDeptListSheetName() {
    return DEPT_LIST_SHEET;
  }

  static getFacultyDepartmentDBID() {
    return DBID_FAC_DEPT;
  }

  static getFacultyDepartmentSheetName() {
    return SHEET_FAC_DEPT;
  }

  static getProcessingEmails() {
    return PROCESSING_EMAILS;
  }

  static sendMail(heading, description, emailAddress, name, email, post, VacancyID, faculty, department) {
    try {
      const htmlOutput = HtmlService.createHtmlOutputFromFile('email_template');
      let message = htmlOutput.getContent();
      message = message.replace('%heading', heading);
      message = message.replace('%description', description);

      message = message.replace('%param1', name);
      message = message.replace('%param2', email);
      message = message.replace('%param3', post);
      message = message.replace('%param4', VacancyID);
      message = message.replace('%param5', `${department} - ${faculty}`);
      message = message.replace('%appURL', APP_URL);

      const subject = 'Online Application -  University of Peradeniya';
      GmailApp.sendEmail(emailAddress, subject, '', {
        from: ALIASMAIL,
        replyTo: ALIASMAIL,
        name: 'University of Peradeniya',
        htmlBody: message,
      });
    } catch (e) {
      console.error('Error ocuured while Send Mail in Utils', e);
      throw new Error(`Error ocuured while Send Mail in Utils`);
    }
  }

  static errHandler(e, strFunc) {
    let message = `${e.message}\n in file: ${e.fileName} on line: ${e.lineNumber}`;
    const subject = `${APP_NAME} ERROR OCCURED | FOS APPS |  ${strFunc}`;
    const errProps = JSON.stringify(this.onError);
    message = `${subject}\n${message}\n onError: ${errProps}`;
    GmailApp.sendEmail(ERROR_EMAIL, subject, message);
  }

  static genApplicationID() {
    const DB = SpreadsheetApp.openById(this.getTestMainDBID());
    const APPLICATION_ID = DB.getSheetByName(this.getApplicationSheetName()).getLastRow();
    return APPLICATION_ID;
  }

  static formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')}/${date.getFullYear()} ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    return formattedDate; // "01/29/2023 1:25:38"
  }
}
export default Utils;
