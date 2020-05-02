"use strict"

const escapeSelector = (sSelector) => {
    return sSelector.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\\\$&")
};

Cypress.Commands.add("ui5Login", (sUrl, user, pass) => {

    //Lance le launchpad
    if (!sUrl) {
        sUrl = Cypress.env('ui5').flpURL
    }
    cy.visit(sUrl)

    //Charge l'application
    cy.get('a[href*="#' + Cypress.env('ui5').targetMapping + '"]', { timeout: 30000 })

        .then(function ($a) {
            // extract the fully qualified href property
            const href = $a.prop('href')

            // and now visit the href directly
            cy.visit(href).then(() => {
                if (!user) {
                    user = Cypress.env("ui5").auth.user
                }
                if (!pass) {
                    pass = Cypress.env("ui5").auth.pass
                }
                cy.ui5BasicAuth(user, pass)
            })

        })


})

Cypress.Commands.add("ui5BasicAuth", (user, pass, serviceURL) => {
    cy.request({
        url: Cypress.env("ui5").serviceURL,
        auth: {
            user: user,
            pass: pass
        }
    }).then((response) => {
        expect(response.status).to.be.equal(200)
        Cypress.Cookies.preserveOnce('SAP_SESSIONID_' + Cypress.env("ui5").sap_sid + '_' + Cypress.env("ui5").sap_client)
    })


})

/**
 * Wait until the UI5 control has Busy equal to true
 */
Cypress.Commands.add("ui5WaitBusy", (sIdControl) => {
    cy.ui5Get(sIdControl).then((oUI5Control) => {
        cy.waitUntil(() => oUI5Control.getBusy() === false)
    })
})

/**
 * Retreve an UI5 Control
 */
Cypress.Commands.add("ui5Get", (sIdControl) => {
    cy.get(escapeSelector(sIdControl), { timeout: 10000 }).then(
        (oDOMControl) => {
            return new Cypress.Promise((resolve, reject) => {
                var oUI5Control = oDOMControl.control()[0]
                resolve(oUI5Control)
            })
        })
})

/**
 * Will look for the table as UI5 Control, the select the rigth ligne for action.
 * The table should contain a radio button
 */
Cypress.Commands.add("ui5SelectTableLine", (sIdControl, sCompareContent) => {
    cy.ui5Get(sIdControl).then((oUI5Control) => {

        var tItems = oUI5Control.getAggregation("items");
        var idxFound = -1;

        tItems.forEach((item, idx) => {
            // Take the innerHTML from all line content and get the index.
            if (item.getDomRef().innerText.indexOf(sCompareContent) >= 0) {
                let idItem = item.getId();
                cy.get(".sapMRbB").each((tRadio) => {
                    if (tRadio[0].children[0].id.indexOf(idItem) >= 0) {
                        cy.wrap(tRadio).click({ force: true });
                    }
                })
                return;
            }
        })
    })
})

Cypress.Commands.add("ui5SelectComboBoxKey", (sIdControl, sKey) => {
    cy.ui5Get(sIdControl).then((oUI5Control) => {
        oUI5Control.setSelectedKey(sKey)
    })
})

Cypress.Commands.add("ui5SelectInList", (sIdControl, sCompareContent) => {
    cy.ui5Get(sIdControl).then((oUI5Control) => {
        var tItems = oUI5Control.getAggregation("items");

        tItems.forEach((item, idx) => {
            // Take the innerHTML from all line content and get the index.
            if (item.getDomRef().innerText && item.getDomRef().innerText.indexOf(sCompareContent) >= 0) {
                cy.get('#' + item.getDomRef().id).click({ force: true });
            }
        });
    }
    )
})
