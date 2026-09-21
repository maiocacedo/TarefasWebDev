# Tarefa 07 — Contador com limites e step (React)

Contador React configurável com estética de **display digital neon** sobre fundo de
terminal verde. Feito com Vite + React 19 + TypeScript + Tailwind + shadcn/ui.

Enunciado: 

Exercício: Contador com limites e step
Crie um componente React de contador com controle completo.

Requisitos
Estado inicial: contador começa em 0
Incrementar: soma o valor do step sem passar do máximo
Decrementar: subtrai o step sem ir abaixo do mínimo
Resetar: volta para 0 (ou mínimo, se for maior que 0)
Step: input numérico (> 0)
Limites: inputs de mínimo e máximo (mín ≤ máx)
Validação: ajustar contador automaticamente se sair do intervalo
Por que usar inputs de mínimo e máximo?
Os inputs de mínimo e máximo existem para tornar o contador dinâmico e configurável, permitindo que o próprio usuário defina o intervalo de valores sem precisar alterar o código.

## Como rodar

```bash
npm install
npm run dev
```
Abra o endereço que o Vite imprimir (por padrão `http://localhost:5173`).

