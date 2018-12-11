import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let termMatch = ((elem, name, term) => elem.element(by.name(name)).getText().then(text => text === term));

let setSearch = (async (name,spec,sector,shift,liaison) => {
    await $(`input[name='namesearch']`).sendKeys(<string> name);
    await $(`select[name='specsearch']`).sendKeys(<string> spec);
    await $(`select[name='sectorsearch']`).sendKeys(<string> sector);
    await $(`select[name='shiftsearch']`).sendKeys(<string> shift);
    await $(`select[name='liaisonsearch']`).sendKeys(<string> liaison);
})

let setSector = (async (name) => {
    await $(`input[name='setornome']`).sendKeys(<string> name);
    await $("button[name='setorcriar']").click();
})

let setNurse = (async (name,sector,shift,spec,liaison) => {
    await $(`input[name='enfnome']`).sendKeys(<string> name);
    await $(`select[name='enfsetor']`).sendKeys(<string> sector);
    await $(`select[name='enfturno']`).sendKeys(<string> shift);
    await $(`input[name='enfespecialidade']`).sendKeys(<string> spec);
    await $(`select[name='enfvinculo']`).sendKeys(<string> liaison);
    await $("button[name='enfcriar']").click();
})

defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {

    setDefaultTimeout(10 * 1000);

    Given(/^que eu esteja na página de busca$/, async() => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('NurseManager');

        await $("a[name='setores']").click();
        await setSector("Obstetrícia");
        await setSector("Cirurgia");
        await setSector("Neonatologia");

        await $("a[name='enfermeiros']").click();
        await setNurse("João Azevedo","Obstetrícia","Turno Manhã","Obstetrícia","CLT");
        await setNurse("Joana Tavares","Cirurgia","Plantão Diurno","Cirurgia","CLT");
        await setNurse("Reinaldo Jorge","Obstetrícia","Plantão Noturno","Obstetrícia","RJU");
        await setNurse("Tibúrcio Farias","Neonatologia","Turno Manhã","Neonatologia","RJU");

        await $("a[name='busca']").click();
    })

    Given(/^que os enfermeiros “([^\"]*)”, “([^\"]*)”, “([^\"]*)” e “([^\"]*)” estejam cadastrados$/, async (enfA, enfB, enfC, enfD) => {
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

    When (/^eu faço a busca procurando por nomes com “([^\"]*)”, sem especificar especialização, setor, turno ou vínculo$/, async(searchTerm) => {
        setSearch(searchTerm,"","","","");
    })

    Then (/^são mostrados os enfermeiros “([^\"]*)”, “([^\"]*)” e “([^\"]*)”$/, async (resA, resB, resC) => {
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

    Given (/^que o enfermeiro “([^\"]*)” tenha especialização em “([^\"]*)”$/, async (name, spec) => {
        var allnurses: ElementArrayFinder = element.all(by.name('enflist'));
        await allnurses;

        var nurse = allnurses.filter(elem => {
            return Promise.all([
                termMatch(elem, "enfname", name),
                termMatch(elem, "enfspecs", spec)
            ]).then(matches => {
                return matches[0] && matches[1];
            })
        })
        await nurse;

        await nurse.then(elems => {
            expect(Promise.resolve(elems.length)).to.eventually.equal(1);
        })
    })

    When (/^eu faço a busca procurando por especialistas em “([^\"]*)”, sem especificar nome, setor, turno ou vínculo$/, async (searchTerm) => {
        setSearch("",searchTerm,"","","");
    })

    Then (/^é mostrado o enfermeiro “([^\"]*)”$/, async (enfres) => {
        var allnames: ElementArrayFinder = element.all(by.name('enfname'));
        await allnames;

        var resultnames = allnames.filter(elem => 
            elem
            .getText()
            .then(text => text === enfres)
        )
        await resultnames;

        await resultnames.then(elems => {
            expect(Promise.resolve(elems.length)).to.eventually.equal(1);
        })
    })
})