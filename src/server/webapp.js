import Resources from '../scripts/resources';
import Utils from '../scripts/utils';
import Downloader from '../scripts/downloader';

let tempData = 1;

export const doGet = (e) => {
  let htmlOutput = '';
  const title = 'ONLINE APPLICATION';
  if (!e.parameter.page) {
    // When no specific page requested, return "home page" Ex : ?page=hod
    htmlOutput = HtmlService.createTemplateFromFile('index');
    return htmlOutput
      .evaluate()
      .setTitle(title)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  // else, use page parameter to pick an html file from the script

  htmlOutput = HtmlService.createTemplateFromFile(e.parameter.page);
  return htmlOutput
    .evaluate()
    .setTitle(title)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
};

export const include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

export const getUser = () => {
  return Session.getActiveUser().getEmail();
};

export const initialLoading = (app) => {
  return JSON.stringify(Resources.initialLoading(app));
};

export const saveRequest = (obj) => {
  return JSON.stringify(Resources.saveRequest(obj));
};

export const router = (key) => {
  return Resources.getUrl(key);
};

export const updateApplicationStatus = (obj) => {
  return JSON.stringify(Resources.updateApplicationStatus(obj));
};

export const getScriptUrl = () => {
  return Utils.getScriptUrl();
};

export const download = (req) => {
  return JSON.stringify(Downloader.processRequest(req));
};

export const getTempData = () => {
  tempData = PropertiesService.getScriptProperties().getProperty('tempData');
  return tempData;
};

export const setTempData = (obj) => {
  tempData = JSON.stringify(obj);
  PropertiesService.getScriptProperties().setProperty('tempData', tempData);
};
