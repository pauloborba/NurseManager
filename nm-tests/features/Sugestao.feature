Feature: As a Chefe de Divisão
	 I want to receber sugestões de enfermeiros que sejam mais adequados para a alocação que 	  estou tentando fazer
	 So that I possa sempre alocar os enfermeiros mais qualificados e experientes na área

	

Scenario: Checagem da fórmula de ranking
Given O período "Diurno" dentro da janela do departamento de "Cirurgia" foi selecionado
When Seleciono o botão "Como é feito o ranqueamento" nessa página
Then Eu posso ver uma janela com a fórmula de ranqueamento "(#1 + #2)" e logo abaixo uma pequena lista com as variáveis "1. Titulação na área", "2. Especialização na área", com valores associados



Scenario: Checagem de ranking de um enfermeiro cadastrado para determinado setor
Given As valorações da fórmula de ranqueamento estão da forma "Titulação na área" = "2", "Especialização na área" = "2", "Experiência" = "1"
And A enfermeira "Sônia" foi cadastrada com apenas titulação em "Nefrologia", especialização em "Nefrologia" e "7" anos de experiencia
And A enfermeira "Joana" foi cadastrada com apenas titulação em "Enfermagem", especialização em "Enfermagem" e "8" anos de experiencia
And A enfermeira "Sandra" foi cadastrada com apenas titulação em "Nefrologia" e "0" anos de experiencia
And Apenas "Sônia", "Joana" e "Sandra" foram cadastradas no sistema
When Eu seleciono o período "Diurno" dentro da janela do departamento de "Cirurgia"
Then Eu posso ver uma lista dos cadastrados ordenados pelo seu rating de relevância.
And Eu posso ver a enfermeira em primeiro lugar "Sônia" e o seu rating é "11"
And Eu posso ver a enfermeira em segundo lugar "Sônia" e o seu rating é "8"
And Eu posso ver a enfermeira em terceiro lugar "Sônia" e o seu rating é "2"


Scenario: Aviso de enfermeiro pouco qualificado
Given O período "Diurno" dentro da janela do departamento de "Cirurgia" foi selecionado
And O enfermeiro "José" foi cadastrado com apenas titulação em "Cirurgia" e "0" anos de experiencia
And O enfermeiro "João" foi cadastrado com apenas especialização em "Cirurgia" e "1" ano de experiencia
And O enfermeiro "João" mostra o rating de "3" e o enfermeiro "José" mostra o ranking de "2"
When Eu seleciono a coluna "Saiba Mais" na linha do funcionário "João"
And Eu seleciono o botão "Alocar Funcionário" dentro da janela que foi aberta
Then Um janela se abre e pede para confirmar a ação novamente, avisando que existem enfermeiros mais qualificados.


Scenario: Desempate entre dois funcionários de mesmo ranking
Given A enfermeira "Sônia" foi cadastrada com apenas titulação em "Nefrologia", especialização em "Nefrologia" e "5" anos de experiência
And A enfermeira "Adrielly" foi cadastrada com apenas titulação em "Nefrologia" e "7" anos de experiência
And Apenas essas duas funcionárias foram cadastradas
When Eu seleciono o período "Diurno" dentro da janela do departamento de "Cirurgia"
Then Eu posso ver uma lista dos enfermeiros cadastrados ordenados pelo seu rating de relevância.
And Eu posso ver que a enfermeira "Sônia" e a enfermeira "Adrielly" estão disponíveis e o seu rating é "9"
And Eu posso ver que a enfermeira "Sônia" está uma colocação à frente de "Adrielly"

