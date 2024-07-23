document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const outorgante = {
        nome: form.nome_outorgante.value,
        nacionalidade: form.nacionalidade_outorgante.value,
        estadoCivil: form.estado_civil_outorgante.value,
        profissao: form.profissao_outorgante.value,
        cpf: form.cpf_outorgante.value,
        rg: form.rg_outorgante.value,
        orgao: form.orgao_outorgante.value,
        endereco: form.endereco_outorgante.value,
        bairro: form.bairro_outorgante.value,
        municipio: form.municipio_outorgante.value,
        estado: form.estado_outorgante.value,
        cep: form.cep_outorgante.value,
        telefone: form.telefone_outorgante.value
    };
    
    const outorgado = {
        nome: form.nome_outorgado.value,
        nacionalidade: form.nacionalidade_outorgado.value,
        estadoCivil: form.estado_civil_outorgado.value,
        profissao: form.profissao_outorgado.value,
        cpf: form.cpf_outorgado.value,
        rg: form.rg_outorgado.value,
        orgao: form.orgao_outorgado.value,
        endereco: form.endereco_outorgado.value,
        bairro: form.bairro_outorgado.value,
        municipio: form.municipio_outorgado.value,
        estado: form.estado_outorgado.value,
        cep: form.cep_outorgado.value,
        telefone: form.telefone_outorgado.value
    };

    const poderes = form.poderes.value;
    const data = form.data.value;
    const local = form.local.value;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(12);

    const lineHeight = 6;
    const margin = 20;
    const maxLineWidth = 170; // Ajusta a largura máxima das linhas
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = margin;

    // Função para centralizar texto
    function centerText(text, y) {
        const textWidth = doc.getTextWidth(text);
        const x = (pageWidth - textWidth) / 2;
        doc.text(text, x, y);
    }

    // Função para desenhar linha
    function drawLine(y) {
        doc.line(margin, y, pageWidth - margin, y);
    }

    // Adicionar título
    doc.setFontSize(16);
    centerText("Procuração - Pessoa Física", y);
    y += lineHeight * 2;

    doc.setFontSize(12);

    const lines = [
        `Outorgante: ${outorgante.nome}, ${outorgante.nacionalidade}, ${outorgante.estadoCivil}, ${outorgante.profissao}, portador(a) do CPF nº ${outorgante.cpf}, RG nº ${outorgante.rg}, expedido pelo ${outorgante.orgao}, residente e domiciliado(a) a ${outorgante.endereco}, bairro ${outorgante.bairro}, município ${outorgante.municipio}, Estado ${outorgante.estado}, CEP ${outorgante.cep}, telefone ${outorgante.telefone}, pelo presente instrumento nomeia e constitui como seu (sua) bastante Procurador(a) (Outorgado)`,
        `${outorgado.nome}, ${outorgado.nacionalidade}, ${outorgado.estadoCivil}, ${outorgado.profissao}, portador(a) do CPF nº ${outorgado.cpf}, RG nº ${outorgado.rg}, expedido pelo ${outorgado.orgao}, residente e domiciliado(a) a ${outorgado.endereco}, bairro ${outorgado.bairro}, município ${outorgado.municipio}, Estado ${outorgado.estado}, CEP ${outorgado.cep}, telefone ${outorgado.telefone},`,
        `com poderes para representar o outorgante perante a Receita Federal do Brasil, para requerer/solicitar ${poderes}, responsabilizando-se por todos os atos praticados no cumprimento deste instrumento, cessando os efeitos deste a partir de ${data}.`,
        `${local}, ${new Date(data).getDate()} de ${new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(data))} de ${new Date(data).getFullYear()}.`,
    ];

    lines.forEach(line => {
        const splitText = doc.splitTextToSize(line, maxLineWidth);
        splitText.forEach(text => {
            centerText(text, y);
            y += lineHeight;
        });
        y += lineHeight;
    });

    // Adicionar linha para assinatura
    y += lineHeight * 2; // Espaço antes da linha
    drawLine(y);
    y += lineHeight; // Espaço abaixo da linha
    centerText("(Assinatura do Outorgante)", y);

    doc.save('procuracao_pessoa_fisica.pdf');
});
