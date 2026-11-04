# Barbara Lopes — site acadêmico

Site estático em português e inglês, preparado para GitHub Pages e o domínio `barbara-lopes.com`. Não requer instalação de pacotes, compilação, banco de dados ou credenciais para desenvolvimento local.

## Desenvolvimento

Na pasta `/workspace/barbara-lopes`, execute `python3 -m http.server 8000 --bind 127.0.0.1`.

Edite `index.html` e `assets/style.css`. Ao alterar textos, atualize também o dicionário de tradução em `assets/site.js`. Informações ainda não fornecidas estão explicitamente sinalizadas como pendentes. O idioma pode ser alternado pelo botão EN/PT e é lembrado no navegador.

## Publicação no GitHub Pages

1. Finalize biografia, pesquisas, publicações, ensino, currículo e contato. Confira os dois idiomas e os layouts em celular e computador.
2. Envie os arquivos ao repositório `brvlopes/barbara-lopes` na branch escolhida para publicação.
3. Em Settings → Pages, selecione Deploy from a branch, a branch publicada e a pasta raiz `/`.
4. Configure o domínio personalizado `barbara-lopes.com`. O arquivo `CNAME` já contém esse domínio.
5. No DNS da GoDaddy, confira os registros existentes antes de alterar qualquer um. Preserve registros de e-mail (MX e TXT). Configure os registros A do domínio raiz para os IPs atuais documentados pelo GitHub Pages. Configure `www` como CNAME para `brvlopes.github.io`. Consulte a documentação oficial antes de aplicar: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
6. Aguarde a validação do DNS e a emissão do certificado; habilite Enforce HTTPS quando disponível.
7. Verifique o domínio raiz, `www`, HTTPS, navegação, idiomas e recursos estáticos no site publicado.

O arquivo CNAME por si só não configura DNS ou ativa o GitHub Pages. A publicação e o domínio ainda precisam ser configurados e validados.

## Fontes de conteúdo

Biografia, formação, vínculos docentes e seleção de produção: currículo Lattes fornecido pela titular, atualizado em 19/05/2026 e gerado em 03/11/2026. Nome de exibição, linhas de pesquisa e resumo da experiência docente seguem também as informações confirmadas na conversa. Títulos bibliográficos são mantidos no idioma original nas duas versões. Não foram acrescentados DOI, links de artigos ou dados bibliográficos ausentes no documento. Apresentações são identificadas separadamente das publicações. A seleção não pretende reproduzir o currículo integral. Contato direto confirmado pela titular: br.vlopes@usp.br. Fotografia fornecida pela titular e incluída em assets/barbara-lopes.jpeg, preservando o arquivo original. O enquadramento circular é aplicado apenas por CSS.

## Currículos em PDF

Os botões CV (PDF) e CV (EN) disponibilizam currículos acadêmicos resumidos em português e inglês. Os arquivos são estáticos e não exigem servidor ou compilação na publicação. Para atualizar os PDFs após editar a formação, biografia, ensino ou produção, execute `node scripts/generate-cv.cjs` a partir da raiz do repositório, com Playwright e Chromium instalados. A geração reutiliza os textos e traduções do site. Use `CHROMIUM_PATH` se o executável estiver em outro caminho. Revise os PDFs gerados antes de enviar. Os títulos bibliográficos permanecem no idioma original.

## Imprensa e divulgação

A seção #imprensa reúne os 15 registros de entrevistas/comentários e os 21 textos em jornais/revistas do Lattes fornecido. Grupos distintos preservam registros de títulos semelhantes sem presumir que são o mesmo conteúdo. Títulos têm pontuação e capitalização normalizadas, mantendo o sentido; o título incompleto “Linha Gerais: O” segue a fonte. Datas somente com ano e veículos não informados são preservados como tais. Os links identificados como Registro no Lattes são referências à fonte, não ao conteúdo da entrevista. Substitua-os pelos links diretos e complete os veículos somente após confirmação da titular ou consulta à publicação original.
