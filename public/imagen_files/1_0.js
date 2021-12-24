(function () {
    'use strict';

    var EXP_SUFFIX = '_exp';
    function setStorageItem(key, val, expires, type) {
      type = type || 'localStorage';

      try {
        var storage = window[type];

        if (expires !== undefined) {
          var expStr = new Date(Date.now() + expires * 60 * 1000).toUTCString();
          storage.setItem(key + EXP_SUFFIX, expStr);
        }

        storage.setItem(key, val);
      } catch (e) {
        console.debug(e);
        return false;
      }

      return true;
    }
    function removeStorageItem(key, type) {
      type = type || 'localStorage';

      try {
        var storage = window[type];
        storage.removeItem(key + EXP_SUFFIX);
        storage.removeItem(key);
        return true;
      } catch (e) {
        console.debug(e);
        return false;
      }
    }
    function getStorageItem(key, type) {
      type = type || 'localStorage';
      var val = null;

      try {
        var storage = window[type];
        var expVal = storage.getItem(key + EXP_SUFFIX);

        if (!expVal) {
          val = storage.getItem(key);
        } else {
          var expDate = new Date(expVal);
          var isValid = expDate.getTime() - Date.now() > 0;

          if (isValid) {
            val = storage.getItem(key);
          } else {
            removeStorageItem(key);
          }
        }
      } catch (e) {
        console.debug(e);
      }

      return val;
    }

    var minutesPerDay = 24 * 60;

    function setValueNoCookie(key, value, ageInDays) {
      setStorageItem(key, value, ageInDays * minutesPerDay, 'localStorage');
      setStorageItem(key, value, ageInDays * minutesPerDay, 'sessionStorage');
    }
    function getValueNoCookie(key, mode) {
      var localStorage = getStorageItem(key, 'localStorage') || '';
      var sessionStorage = getStorageItem(key, 'sessionStorage') || '';

      var getBestValueNoCookie = function getBestValueNoCookie() {
        if (isValidValue(localStorage)) {
          return localStorage;
        }

        if (isValidValue(sessionStorage)) {
          return sessionStorage;
        }

        return '';
      };

      if (mode === 'all') {
        return {
          localStorage: localStorage,
          sessionStorage: sessionStorage
        };
      }

      return getBestValueNoCookie();
    }

    var isValidValue = function isValidValue(val) {
      return val !== 'undefined' && val !== undefined && val !== null && val !== '';
    };

    var fireConsentCallbackUrl = function fireConsentCallbackUrl(consentString, integration, trace) {
      var callbackUrl = integration.parameters.consentCallback;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = "".concat(callbackUrl, "&dtmc_cmpcapture=").concat(trace, "&gdpr_consent=").concat(consentString, "&gdpr=1");
      document.head.appendChild(script);
    };

    function validTCF(value) {
      if (value && value.length >= 30 && value.charAt(0) === 'C') {
        return true;
      }

      return false;
    }

    var getTcData = function getTcData(win, pushTrace) {
      var tcData;

      if (win.dtm_config && win.dtm_config.dtmc_tcf_string) {
        if (validTCF(win.dtm_config.dtmc_tcf_string)) {
          pushTrace('clientProvided');
          tcData = win.dtm_config.dtmc_tcf_string;
        }

        delete win.dtm_config.dtmc_tcf_string;
      }

      if (!tcData) {
        tcData = getValueNoCookie('dtm_tcdata', 'best');

        if (tcData) {
          pushTrace('localStorage');
        }
      }

      return tcData;
    };

    var setTcData = function setTcData(dtmTcData) {
      return setValueNoCookie('dtm_tcdata', dtmTcData, 390);
    };

    var findTcString = function findTcString(win, integration) {
      try {
        var traceString = 'consentDisco';
        var _urlAlreadyFired = false;

        var pushTrace = function pushTrace(traceInfo) {
          traceString += '_' + traceInfo;
        };

        var getTrace = function getTrace() {
          return traceString;
        };

        var isTcfApiAvailable = function isTcfApiAvailable() {
          return win.__tcfapi && typeof win.__tcfapi === 'function';
        };

        var cmpTimeout;
        var tcfTimeout;

        if (!integration || !integration.parameters) {
          cmpTimeout = 7000;
          tcfTimeout = 0;
        } else {
          cmpTimeout = integration.parameters.cmpCallbackMs || 7000;
          tcfTimeout = integration.parameters.awaitTcfApiMs || 0;
        }

        var tc = getTcData(win, pushTrace);

        if (tc && !_urlAlreadyFired) {
          _urlAlreadyFired = true;
          fireConsentCallbackUrl(tc, integration, getTrace());
        }

        var processTcfApi = function processTcfApi() {
          if (isTcfApiAvailable()) {
            setTimeout(function () {
              if (!_urlAlreadyFired) {
                pushTrace('apiTimeout');
                _urlAlreadyFired = true;
                fireConsentCallbackUrl('', integration, getTrace());
              }
            }, cmpTimeout);

            var tcfCallback = function tcfCallback(tcData, tcSuccess) {
              if (tcData) {
                pushTrace('*' + tcData.eventStatus);
              } else {
                pushTrace('*');
              }

              if (tcSuccess) {
                if (tcData.tcString) {
                  if (tcData.eventStatus === "tcloaded" || tcData.eventStatus === "useractioncomplete") {
                    tc = tcData.tcString;

                    if (!_urlAlreadyFired) {
                      _urlAlreadyFired = true;
                      fireConsentCallbackUrl(tc, integration, getTrace());
                    }

                    setTcData(tc);
                  }
                } else {
                  if (!tcData.gdprApplies) {
                    tc = '';
                    pushTrace('notApply');

                    if (!_urlAlreadyFired) {
                      _urlAlreadyFired = true;
                      fireConsentCallbackUrl(tc, integration, getTrace());
                    }
                  }
                }
              } else {
                tc = '';
                pushTrace('noSuccess');

                if (!_urlAlreadyFired) {
                  _urlAlreadyFired = true;
                  fireConsentCallbackUrl(tc, integration, getTrace());
                }
              }
            };

            __tcfapi('addEventListener', 2, tcfCallback);
          } else {
            pushTrace('apiMissing');
            tc = '';

            if (!_urlAlreadyFired) {
              _urlAlreadyFired = true;
              fireConsentCallbackUrl(tc, integration, getTrace());
            }
          }
        };

        var awaitTcfApi = function awaitTcfApi() {
          if (isTcfApiAvailable() || tcfTimeout == 0) {
            processTcfApi();
          } else {
            var apiTimer = 0;
            var tcfInterval = setInterval(function () {
              if (apiTimer >= tcfTimeout || isTcfApiAvailable()) {
                pushTrace('!' + apiTimer + '!');
                processTcfApi();
                clearInterval(tcfInterval);
              } else {
                apiTimer += 200;
              }
            }, 200);
          }
        };

        awaitTcfApi();
      } catch (e) {
        if (!urlAlreadyFired) {
          urlAlreadyFired = true;
          fireConsentCallbackUrl('', integration, 'errorOccurred');
        }
      }
    };

    function discoverConsent(win, integration) {
      findTcString(win, integration);
    }

    var integration = JSON.parse('{"eventType":"consent-disco","env":null,"parameters":{"cmpCallbackMs":"7000","awaitTcfApiMs":"0","consentCallback":"https://kavehome.com/displayadv/profile/visit/consent/js?dtm_cid=81696&dtm_fid=101&dtm_country_code=ES&dtm_cid_original=81696&dtm_promo_id=1&dtm_cmagic=0aa83e&cachebuster=1600409722&dtm_form_uid=478106313494444044"},"mappings":null,"persistence":null,"fieldMasks":null,"plugins":null}');
    discoverConsent(window, integration);

}());
