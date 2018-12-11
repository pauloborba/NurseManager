Feature : As a Chefe de Divisão
        I want to receber notificações do sistema
        So that I possa reduzir o erro de alocação e manter o sistema com dados relevantes.


Cenário:  Data de conclusão de Um enfermeiro chegou

GIVEN: A enfermeira “Sônia” foi cadastrada com a data de conclusão do Mestrado em “Neonatologia” na data “12/2018”
AND: a data atual é “01/2019”
AND: nenhum outro enfermeiro tem Titulação com data de conclusão anterior a “01/2019”
WHEN: eu entro no sistema
THEN: eu recebo uma notificação que informa a necessidade de atualizar o cadastro de “Sônia”


Cenário : Data de conclusão de Múltiplos enfermeiros chegou

GIVEN : O enfermeiro “João” foi cadastrada com a data de conclusão do Mestrado em “Neonatologia” na data “12/2018”
AND: O enfermeiro “Carlos” foi cadastrada com a data de conclusão do Mestrado em “Neonatologia” na data “06/2018”
AND: A enfermeira “Sônia” foi cadastrada com a data de conclusão do Mestrado em “Neonatologia” na data “12/2018”
AND: A enfermeira “Marcela” foi cadastrada com a data de conclusão do Mestrado em “Neonatologia” na data “12/2017”
AND: a data atual é “01/2019”
WHEN: eu entro no sistema
THEN: eu recebo uma notificação que informa a necessidade de atualizar múltiplos Enfermeiros


Cenário: Checagem de atualização de cadastros

GIVEN: Os enfermeiros “João”, “Carlos”, “Sônia” e “Marcela” foram atualizados pela última vez na data “20/8/2018”
WHEN: eu entro no sistema
AND: a data atual é “30/11/2018”
THEN: eu recebo uma notificação que informa que múltiplos cadastros podem estar desatualizados


Cenário : Setor com muito pessoal

GIVEN: o Setor de “Cirurgia”, no "Turno Manhã" está cadastrado com um número máximo de enfermeiros de 25
AND: o número atual alocado para “Cirurgia” no "Turno Manhã" é de 25.
WHEN: eu aloco "João" para o setor "Cirurgia" no "Turno Manhã"
THEN: eu recebo uma notificação informando que o setor de “Cirurgia” no "Turno manhã" possui mais enfermeiros que o necessário


Cenário: Recebi uma notificação do sistema de alerta

GIVEN: Eu recebi uma notificação do sistema de alerta
WHEN: Eu seleciono a notificação
THEN : eu sou levado para uma tela contendo o(s) enfermeiro(s) citados na notificação
