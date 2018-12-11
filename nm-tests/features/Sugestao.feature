Feature: As a Chefe de Divisão
	 I want to receber sugestões de enfermeiros que sejam mais adequados para a alocação que 	  estou tentando fazer
	 So that I possa sempre alocar os enfermeiros mais qualificados e experientes na área

	

Scenario: Checagem da fórmula de ranking
Given: O período “Diurno” dentro da janela do departamento de “Cirurgia” foi selecionado
When: Seleciono o botão “Como é feito o ranqueamento” nessa página
Then: Eu posso ver uma janela com a fórmula de ranqueamento “(#1 + #2)” e logo abaixo uma pequena lista com as variáveis “1. Titulação na área”, “2. Especialização na área”, com valores associados



Scenario: Checagem de ranking de um enfermeiro cadastrado para determinado setor
Given: As valorações da fórmula de ranqueamento estão da forma “Titulação na área” = “2”, “Especialização na área” = “2”
And: A enfermeira “Sônia” foi cadastrada com apenas titulação em “Nefrologia”, especialização em “Nefrologia”
And: A enfermeira “Joana” foi cadastrada com apenas titulação em “Enfermagem”, especialização em “Enfermagem”
And: A enfermeira “Sandra” foi cadastrada com apenas titulação em “Nefrologia” 
And: Apenas “Sônia”, “Joana” e “Sandra” foram cadastradas no sistema
When: Eu seleciono o período “Diurno” dentro da janela do departamento de “Cirurgia”
Then: Eu posso ver uma lista dos cadastrados ordenados pelo seu rating de relevância.
And: Eu posso ver a enfermeira em primeiro lugar “Sônia” e o seu rating é “4”
And: Eu posso ver a enfermeira em segundo lugar “Sônia” e o seu rating é “0”
And: Eu posso ver a enfermeira em terceiro lugar “Sônia” e o seu rating é “2”


Scenario: Aviso de enfermeiro pouco qualificado
Given: O período “Diurno” dentro da janela do departamento de “Cirurgia” foi selecionado
And: O enfermeiro “José” mostra o rating de “10”
And: O enfermeiro “João” mostra o rating de “9”
When: Eu seleciono a coluna “Saiba Mais” na linha do funcionário “João”
And: Eu seleciono o botão “Alocar Funcionário” dentro da janela que foi aberta
Then: Um janela se abre e pede para confirmar a ação novamente, avisando que existem enfermeiros mais qualificados.


Scenario: Desempate entre dois funcionários de mesmo ranking
Given: A enfermeira “Sônia” foi cadastrada com apenas titulação em “Nefrologia”, especialização em “Nefrologia”, “5” anos de experiência na área de “Nefrologia” e “10” anos de trabalho no hospital.
And: A enfermeira “Adrielly” foi cadastrada com apenas titulação em “Nefrologia”, especialização em “Nefrologia”, “5” anos de experiência na área de “Nefrologia” e “3” anos de trabalho no hospital.
And: Todos os outros funcionários tem rating abaixo de “Sônia” e “Adrielly”
When: Eu seleciono o período “Diurno” dentro da janela do departamento de “Cirurgia”
Then: Eu posso ver uma lista dos enfermeiros cadastrados ordenados pelo seu rating de relevância.
And: Eu posso ver que a enfermeira “Sônia” e a enfermeira “Adrielly” estão disponíveis e o seu rating é “8,5”
And: Eu posso ver que a enfermeira “Sônia” está uma colocação à frente de “Adrielly”

