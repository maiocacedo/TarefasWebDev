# Tarefa 07 — Contador com limites e step (React)

Contador React configurável com estética de **display digital neon** sobre fundo de
terminal verde. Feito com Vite + React 19 + TypeScript + Tailwind + shadcn/ui.

## Requisitos atendidos

- Estado inicial em **0**.
- **Incrementar / decrementar** pelo `step`, respeitando o máximo e o mínimo.
- **Resetar** para 0 (ou para o mínimo, quando este é maior que 0).
- `step` numérico **> 0**, com auto-correção quando inválido (volta ao último válido).
- Limites de **mínimo** e **máximo** configuráveis (mín ≤ máx, com troca automática
  quando invertidos).
- Contador **re-encaixado** no intervalo sempre que os limites mudam.
- Suporte a **valores decimais** (sem lixo de ponto flutuante, ex.: `0.1 + 0.2`).

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite imprimir (por padrão `http://localhost:5173`).

Outros scripts: `npm run build` (typecheck + build de produção), `npm run lint`
(oxlint).

## Arquitetura

A regra de negócio fica isolada em funções puras; os componentes só cuidam de estado
e apresentação.

- `src/lib/contador.ts` — funções puras: `clamp`, `clean` (anti-drift),
  `formatarValor`, `sanitizarStep`, `ordenarLimites`, `calcularReset`.
- `src/hooks/usePulse.ts` — hook de feedback visual das auto-correções.
- `src/components/Contador.tsx` — dono do estado (`useState`) e orquestração.
- `src/components/ContadorDisplay.tsx` — o número neon + o intervalo atual.
- `src/components/ContadorControles.tsx` — botões `+` / `−` / reset.
- `src/components/ContadorConfig.tsx` — inputs de passo, mínimo e máximo (commit no
  blur/Enter, com buffer local para não brigar com a digitação).

## Decisões de comportamento

- **Auto-correção no commit** (blur/Enter), não a cada tecla: step ≤ 0/vazio volta ao
  último válido; mín > máx troca os dois; o contador é re-encaixado nos limites.
- Ao rejeitar/corrigir um campo, ele recebe um **pulse** breve na borda — a correção
  não passa despercebida.

## Heurísticas de Nielsen

- **Visibilidade do estado:** valor e intervalo `mín .. máx` sempre à vista; `+`/`−`
  desabilitam ao atingir um limite.
- **Prevenção de erros:** auto-correção de entradas inválidas + botões desabilitados
  nos limites, impedindo estados impossíveis.
- **Controle e liberdade:** reset sempre disponível; intervalo definido pelo usuário.
- **Flexibilidade e eficiência:** `Enter` confirma a configuração; step configurável.
- **Reconhecer, diagnosticar e recuperar de erros:** o *pulse* torna visível o que o
  sistema ajustou.
- **Estético e minimalista:** só o essencial, com o número como protagonista.
