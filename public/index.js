// Foi uma pessima ideia fazer isso com vue
const { createApp } = Vue;
createApp({
  data() {
    return {
      novaPlaca: '',
      infoCarros: []
    };
  },
  methods: {
    async carregarCarros() {
      const response = await fetch('/api/carros-atuais');
      const carrosEntrou = await response.json();
      const infoCarro = []
      for (const carroEntrou of carrosEntrou) {
        const responsePlaca = await fetch(`/api/placa-do-carro?id=${encodeURIComponent(carroEntrou.carro_funcionario_id)}`);
        const placa = await responsePlaca.json();
        const responseFuncionario = await fetch(`/api/funcionario-por-id?id=${encodeURIComponent(placa.funcionario_id)}`)
        const funcionario = await responseFuncionario.json();
        const responseCarro = await fetch(`/api/carro-por-id?id=${encodeURIComponent(placa.carro_id)}`)
        const carro = await responseCarro.json();
        infoCarro.push({
          'funcionario': funcionario['nome'],
          'tipo': carro['tipo'],
          'marca': carro['marca'],
          'modelo': carro['modelo'],
          'placa': placa['placa'],
          'entrou': carroEntrou['entrou']
        });
      }
      this.infoCarros = infoCarro;
    },
    async registrarEntrada() {
      try {
        const response = await fetch('/api/registrar-entrada', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ placa: this.novaPlaca })
        });

        if (!response.ok) {
          throw new Error('Erro ao registrar entrada');
        }

        await this.carregarCarros();
        this.novaPlaca = '';
      } catch (error) {
        console.error(error);
      }
    },
    formatarData(data) {
      return new Date(data).toLocaleString('pt-BR');
    }
  },
  mounted() {
    this.carregarCarros();
  }
}).mount('#app');