# Bitrix24: план → задачи в проекте

**Сначала** черновик в **`plans/*.md`** (удобно читать), шаблон — `plans/example.plan.md`. **После согласования** — перенос в **`plans/*.yaml`** (шаблон `plans/example.plan.yaml`) и синхронизация с Bitrix. Смена проекта: только **`Bitrix24_Project_id`** в `.env`; вебхук один. Подробнее — `.cursor/rules/bitrix24-workflow.mdc`.

## `.env`

| Переменная | Описание |
|------------|----------|
| `Webhook_URL` | URL вебхука со слэшем в конце |
| `Bitrix24_Project_id` | ID группы / проекта / Scrum в Bitrix |
| `Bitrix24_responsible_id` | Опционально: ID ответственного по умолчанию |

`.env` не коммитить. Шаблон — `.env.example`.

## Команды

Один раз после клонирования:

```bash
npm install
```

Проверка плана без создания задач в Bitrix:

```bash
npm run sync -- plans/example.plan.yaml --dry-run
```

Создание эпиков и задач в Bitrix (после проверки плана):

```bash
npm run sync -- plans/example.plan.yaml
```

Своё ТЗ — копируйте `example.plan.md` / `example.plan.yaml` в новые файлы и подставьте имя в командах `sync`.

Поле **`epic_mode`**: `scrum` (эпики API) или `parent_tasks` (родитель + подзадачи), если Scrum/API эпика недоступен.

Подробности для агента: `.cursor/rules/`.

Репозиторий: [neetrino/Bitrix24-Task](https://github.com/neetrino/Bitrix24-Task).
