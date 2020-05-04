# CyPress for SAPui5
## Description
This is an non-official add-onn for CyPRess which give the capabilities to manage UI5 control easily.

I will put in it as much as functions to help the use of CyPress dealing with SAPui5 world.

Please fill free to participate and contribute to that project.

The full documentation is based on the [Wiki page here](https://github.com/jberthe/cypress-sapui5/wiki).

[![CyPress with Fiori Element application](https://i9.ytimg.com/vi/ddNqmIqvDws/mq3.jpg?sqp=CKjavvUF&rs=AOn4CLDBVG28aWTjnKtjPsKfx1Ux4H5RjQ)](https://www.youtube.com/embed/ddNqmIqvDws?autoplay=1&loop=1&playlist=ddNqmIqvDws)

## Installation

> npm install cypress-sapui5 --dev-install

- Add the following in the *cypress.json* 

```json
{
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

## Release
### Version 1.1.0
* add ui5ForEachItems function
* add Wiki page documentation
* clear the documentation
* add Youtube example
