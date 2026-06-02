---
name: review-pr

description: Code review поточних змін по стандартах команди.

  Використовуй для review PR або staged changes.

allowed-tools: Bash, Read, Grep
---

## Code Review

### 1. Збери контекст

- `git diff HEAD~1 --stat` — список файлів

- `git diff HEAD~1` — детальний diff

### 2. Автоматичні перевірки

- `npm run typecheck`

- `npm run lint`

- Вкажи файл і рядок якщо є помилки

### 3. Ручний аналіз по категоріях

- 🔴 **Блокери** — баги, проблеми безпеки, зламаний API

- 🟡 **Покращення** — порушення конвенцій, складна логіка

- 🟢 **Нітпіки** — стиль, неймінг (необов'язково виправляти)

### 4. Підсумок

Формат: `✅ APPROVE` / `🔄 NEEDS CHANGES` / `❌ REJECT`
