# CyPress for SAPui5
## Description
This is an non-official add-onn for CyPRess which give the capabilities to manage UI5 control easily.

I will put in it as much as functions to help the use of CyPress dealing with SAPui5 world.

Please fill free to participate and contribute to that project.

## Installation

> npm install cypress-sapui5

- Add the following in the *cypress.json* 

```json
    "env" : {
        "ui5" : {
            "auth" : {
                    "user" : "****",
                    "pass" : "****"
            },
            "serviceURL" : "http://localhost:8080/sap/opu/odata/**/**/",
            "flpURL" : "http://localhost:8080/test/flpSandbox.html?sap-language=FR",
            "targetMapping" : "objSem-action",
            "sap_sid" : "S01",
            "sap_client" : "100"
        }
    }
```
Add the import/require in the CypRess *support/index.js* file:

```js
    require('cypress-wait-until')
    require('cypress-sapui5')
```

Be sure that in your *package.json* in *devDependencies* you have:

```json
    ...,
    "cypress-wait-until": "^1.6.1",
    "cypress-sapui5": "^1.0.2"
    ...
```


## Commands
### ui5Login
Enable to visit a launchpad locally or on a remote server and then navigate to the target mapping.

* *Target mapping* : should be set in the env variable (ui5.targetMapping)
* *user* : by default see the env variable (ui5.auth.user), can be overwrite
* *pass* : by default see the env variable (ui5.auth.pass), can be overwrite
* *sUrl* : by default see the env variable (ui5.flpURL), can be overwrite

### ui5BasicAuth
Is used to store the connection cookie which is clear after navigation.

* *user* : by default see the env variable (ui5.auth.user), can be overwrite
* *pass* : by default see the env variable (ui5.auth.pass), can be overwrite
* *serviceURL* : by default see the env variable (ui5.serviceURL), can be overwrite 

The cooky is build like this *SAP_SESSIONID_<SID>_<CLIENT>* the both are stored in the env variable : *ui5.sap_sid* and *ui5.sap_client*.

### ui5WaitBusy
Wait until a UI5 control has its busy state to *true*.

* *sIdControl* : jQuery selector ID which should target an UI5 control. The value should not be escaped. *e.g. to_packages::com.sap.vocabularies.UI.v1.LineItem::PackageTable*

### ui5SelectTableLine
In responsive table, if the mode is *SingleSelect*, then we can select a line containing the *sCompareContent* on the line.

* *sIdControl* : id of a *sap.m.table* where the mode is *SingleSelect*. Not escaped
* *sCompareContent* : a string which should be contained somewhere in the table rows

### ui5SelectComboBoxKey
Select the corresponding *key* of the combobox.

* *sIdControl*: id of the *sap.m.ComboBox*
* *sKey* : key you want to select