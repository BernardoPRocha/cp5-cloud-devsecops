# CP05 - Pipeline DevSecOps

Site estático com Dockerfile e três jobs em `.github/workflows/security.yml`.

- **Gitleaks:** detecta segredos nos commits analisados pelo Gitleaks Action. Checkout com histórico completo.
- **Semgrep:** aplica `p/default` e uma regra local que proíbe `eval`; `--error` reprova a execução com achados.
- **Trivy:** após os dois primeiros jobs passarem, constrói a imagem e reprova se houver CVE CRITICAL, inclusive sem correção disponível.

## Executar o site
Abra `site/index.html` no navegador. Para testar o container, com Docker instalado:

```sh
docker build -t cp5-site .
docker run --rm -p 8080:80 cp5-site
```

Abra http://localhost:8080 e use Ctrl+C para parar.

## Evidências
Os testes de sabotagem devem ficar em branches separadas, partindo da main limpa. Não faça merge dessas branches. Os logs das Actions são as evidências reais; este projeto não afirma que os scans já foram executados.

Uma execução vermelha precisa ser causada pelo achado esperado, não por erro de instalação, autenticação ou rede. O Trivy é pulado quando Gitleaks ou Semgrep falha: isso é intencional.

Falhar o workflow não desfaz um push. Para bloquear merge, configure proteção da main exigindo os checks de segurança. Não há deploy configurado neste projeto.

Este exemplo usa uma imagem base e ferramentas atualizáveis; os resultados de CVEs dependem da imagem e da base consultada na execução. Em produção, fixar versões/digests e planejar atualizações.
