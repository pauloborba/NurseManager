Feature: As a Chefe de Divisão
         I want to buscar enfermeiros levando em conta disponibilidade e especialização
         So that I possa facilmente encontrar a alocação ideal para vários setores

Scenario: Busca por nome
Given que eu esteja na página de busca
Given que os enfermeiros “João Azevedo”, “Joana Tavares”, “Reinaldo Jorge” e “Tibúrcio Farias” estejam cadastrados
When eu faço a busca procurando por nomes com “Jo”, sem especificar especialização, setor, turno ou vínculo
Then são mostrados os enfermeiros “João Azevedo”, “Joana Tavares” e “Reinaldo Jorge”

Scenario: Busca por especialização
Given que eu esteja na página de busca
Given que o enfermeiro “João Azevedo” tenha especialização em “Obstetrícia”
Given que o enfermeiro “Joana Tavares” tenha especialização em “Cirurgia”
Given que o enfermeiro “Reinaldo Jorge” tenha especialização em “Obstetrícia”
Given que o enfermeiro “Tibúrcio Farias” tenha especialização em “Neonatologia”
When eu faço a busca procurando por especialistas em “Cirurgia”, sem especificar nome, setor, turno ou vínculo
Then é mostrado o enfermeiro “Joana Tavares”

Scenario: Busca por setor e turno
Given que eu esteja na página de busca
Given que o enfermeiro “João Azevedo” esteja alocado em “Obstetrícia” no turno “Turno Manhã”
Given que a enfermeira “Joana Tavares” esteja alocado em “Cirurgia” no turno “Plantão Diurno”
Given que o enfermeiro “Reinaldo Jorge” esteja alocado em “Obstetrícia” no turno “Plantão Noturno”
Given que o enfermeiro “Tibúrcio Farias” esteja alocado em “Neonatologia” no turno “Turno Manhã”
When eu faço a busca procurando pelo setor “Cirurgia” no turno “Plantão Noturno”, sem especificar nome, especialização ou vínculo
Then nenhum enfermeiro é mostrado

Scenario: Busca por vínculo
Given que eu esteja na página de busca
Given que o enfermeiro “João Azevedo” esteja vinculado por “CLT”
Given que a enfermeira “Joana Tavares” esteja vinculado por “CLT”
Given que o enfermeiro “Reinaldo Jorge” esteja vinculado por “RJU”
Given que o enfermeiro “Tibúrcio Farias” esteja vinculado por “RJU”
When eu faço a busca procurando por funcionários vinculados por “CLT”, sem especificar nome, especialização, setor ou turno
Then são mostrados os enfermeiros “João Azevedo” e “Joana Tavares”