import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let searchNameTerm = ((name,term) => {
    var allterms: ElementArrayFinder = element.all(by.name(name));
    return allterms.then(elems => {
        expect(Promise.resolve(elems[0].getText())).to.eventually.equal(term);
    })
})

let folder = (acc, red) => acc && red;

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^que eu esteja na página de busca$/, async() => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('NurseManager');
        await $("a[name='busca']").click();
    })

    Given(/^que os enfermeiros "([^\"]*)", “([^\"]*)”, “([^\"]*)” e “([^\"]*)” estejam cadastrados$/, async (enfA, enfB, enfC, enfD) => {
        var allnames: ElementArrayFinder = element.all(by.name('enfname'));
        await allnames;

        var examplenames = allnames.filter(elem => 
            elem
            .getText()
            .then(text => {
                return [enfA, enfB, enfC, enfD].some(enf => enf === text);
            })
        )
        await examplenames;

        await examplenames.then(elems => {
            expect(Promise.resolve(elems.length)).to.eventually.equal(4);
        })
    })

    When (/eu faço a busca procurando por nomes com “([^\"]*)”, sem especificar especialização, setor, turno ou vínculo/, async(searchTerm) => {
        var termsOK = Promise.all([
            searchNameTerm('namesearch',searchTerm),
            searchNameTerm('specsearch',""),
            searchNameTerm('sectorsearch',""),
            searchNameTerm('shiftsearch',""),
            searchNameTerm('liaisonsearch',"")
        ]).then(results => {
            return results.reduce(folder);
        })
        await termsOK;

        await termsOK.then(() => {
            expect(Promise.resolve(termsOK)).to.eventually.equal(true);
        })
    })

    Then (/são mostrados os enfermeiros “([^\"]*)”, “([^\"]*)” e “([^\"]*)”/, async (resA, resB, resC) => {
        var allnames: ElementArrayFinder = element.all(by.name('enfname'));
        await allnames;

        var resultnames = allnames.filter(elem => 
            elem
            .getText()
            .then(text => {
                return [resA, resB, resC].some(enf => enf === text);
            })
        )
        await resultnames;

        await resultnames.then(elems => {
            expect(Promise.resolve(elems.length)).to.eventually.equal(3);
        })
    })
})