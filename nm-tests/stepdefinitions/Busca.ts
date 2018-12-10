import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let searchNameTerm = (async(name,term) => {
    await $(`input[name='${name}']`).sendKeys(<string> term);
})

let folder = (acc, red) => acc && red;

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^que eu esteja na página de busca$/, async() => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('NurseManager');

        await $("a[name='setores']").click();

        await $(`input[name='setornome']`).sendKeys("Obstetrícia");
        await $("button[name='setorcriar']").click();

        await $(`input[name='setornome']`).sendKeys("Cirurgia");
        await $("button[name='setorcriar']").click();
        
        await $(`input[name='setornome']`).sendKeys("Neonatologia");
        await $("button[name='setorcriar']").click();

        await $("a[name='enfermeiros']").click();

        await $(`input[name='enfnome']`).sendKeys("João Azevedo");
        await $(`select[name='enfsetor']`).sendKeys("Obstetrícia");
        await $(`select[name='enfturno']`).sendKeys("Turno Manhã");
        await $(`input[name='enfespecialidade']`).sendKeys("Obstetrícia");
        await $(`select[name='enfvinculo']`).sendKeys("CLT");
        await $("button[name='enfcriar']").click();

        await $(`input[name='enfnome']`).sendKeys("Joana Tavares");
        await $(`select[name='enfsetor']`).sendKeys("Cirurgia");
        await $(`select[name='enfturno']`).sendKeys("Plantão Diurno");
        await $(`input[name='enfespecialidade']`).sendKeys("Cirurgia");
        await $(`select[name='enfvinculo']`).sendKeys("CLT");
        await $("button[name='enfcriar']").click();

        await $(`input[name='enfnome']`).sendKeys("Reinaldo Jorge");
        await $(`select[name='enfsetor']`).sendKeys("Obstetrícia");
        await $(`select[name='enfturno']`).sendKeys("Plantão Noturno");
        await $(`input[name='enfespecialidade']`).sendKeys("Obstetrícia");
        await $(`select[name='enfvinculo']`).sendKeys("RJU");
        await $("button[name='enfcriar']").click();

        await $(`input[name='enfnome']`).sendKeys("Tibúrcio Farias");
        await $(`select[name='enfsetor']`).sendKeys("Neonatologia");
        await $(`select[name='enfturno']`).sendKeys("Turno Manhã");
        await $(`input[name='enfespecialidade']`).sendKeys("Neonatologia");
        await $(`select[name='enfvinculo']`).sendKeys("RJU");
        await $("button[name='enfcriar']").click();

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
        searchNameTerm('namesearch',searchTerm),
        searchNameTerm('specsearch',""),
        searchNameTerm('sectorsearch',""),
        searchNameTerm('shiftsearch',""),
        searchNameTerm('liaisonsearch',"")
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