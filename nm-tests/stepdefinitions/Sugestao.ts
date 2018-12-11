import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let termMatch = ((elem, name, term) => elem.element(by.name(name)).getText().then(text => text === term));

let setSector = (async (name) => {
    await $(`input[name='setornome']`).sendKeys(<string> name);
    await $("button[name='setorcriar']").click();
})

let setNurse = (async (name, experience, sector,shift,spec, title, liaison) => {
    await $(`input[name='enfnome']`).sendKeys(<string> name);
    await $(`input[name='enfexperiencia']`).sendKeys(<number> experience);
    await $(`select[name='enfsetor']`).sendKeys(<string> sector);
    await $(`select[name='enfturno']`).sendKeys(<string> shift);
    await $(`input[name='enfespecialidade']`).sendKeys(<string> spec);
    await $(`input[name='enftitulacao']`).sendKeys(<string> title);
    await $(`select[name='enfvinculo']`).sendKeys(<string> liaison);
    await $("button[name='enfcriar']").click();
})

defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {

    setDefaultTimeout(10 * 1000);

    Given (/^o setor "([^\"]*)" foi cadastrado"$/, async (setor) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('NurseManager');

        await $("a[name='setores']").click();
  
        await setSector(setor);
       
    })

    Given (/^eu estou na página de cadastro de enfermeiros"$/, async () => {
        await $("a[name='enfermeiros']").click();
    })

    
    When (/^eu cadastro o enfermeiro "([^\"]*)", com apenas titulação em "([^\"]*)", especialização em "([^\"]*)" e "([^\"]*)" anos de experiencia, que está alocado em "([^\"]*)" no turno "([^\"]*)""$/, async (name, title, spec, experience, setor, turn) => {
        await setNurse(name, experience, setor,turn,spec, title, "CLT");
    })

    Then (/^Eu posso ver o enfermeiro "([^\"]*)" e o seu ranking é "([^\"]*)"$/, async (nome, ranking) => {
        var allnurses: ElementArrayFinder = element.all(by.name('enflist'));
        await allnurses;

        var filt1 = allnurses.filter(elem => termMatch(elem, "enfname", nome));
        await filt1;

        var nurse = filt1.filter(elem => termMatch(elem, "enfranking", ranking));
        await nurse;

        await nurse.then(elems => {
            expect(Promise.resolve(elems.length)).to.eventually.equal(1);
        })
    })

   
})