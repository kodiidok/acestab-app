import {
  doGet,
  include,
  getUser,
  initialLoading,
  saveRequest,
  getTempData,
  setTempData,
  router,
  download,
  updateApplicationStatus,
  getScriptUrl,
} from './server/webapp';
import { makeHttpGetRequest } from './server/http';

global.doGet = doGet;
global.include = include;
global.makeHttpGetRequest = makeHttpGetRequest;
global.getUser = getUser;
global.initialLoading = initialLoading;
global.saveRequest = saveRequest;
global.getTempData = getTempData;
global.setTempData = setTempData;
global.router = router;
global.download = download;
global.updateApplicationStatus = updateApplicationStatus;
global.getScriptUrl = getScriptUrl;
