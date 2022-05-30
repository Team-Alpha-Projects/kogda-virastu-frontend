# Когда вырасту

## Обзор
Блог для IT-специалистов с возможностью регистрации и авторизации, написания и публикации статей, возможностью добавления статьям тегов и фильтрации по тегам, возможностью добавлять для постов лайки и т.д.

>Данный проект реализован в рамках обучения на курсе "Веб-разработчик плюс" студентами Яндекс Практикума. Команда Red.Types Lakers.

[Макет в Figma](https://www.figma.com/file/4wPCpzg3Ee8yxsDlq5FVUs/%D0%9A%D0%BE%D0%B3%D0%B4%D0%B0-%D0%B2%D1%8B%D1%80%D0%B0%D1%81%D1%82%D1%83_external_link?node-id=0%3A1).

## Используемые технологии
* ReactJS
* CSS
* TypeScript
* Redux Toolkit
* Styled Components
* Axios
* Format.JS

## Команда Red.Types
* [Станислав Судовский](https://github.com/grecha1337).
* [Георгий Трубачев](https://github.com/George051191).
* [Алексей Вишневский](https://github.com/LexorV).
* [Елена Шарипова](https://github.com/elena-sh-r).
* [Евгений Карпель](https://github.com/kspshnik).
* [Илья Пичугин](https://github.com/IlyaKZN).

## Реализовано
* Развернуты заготовки и настроен коллективный Гитхаб.
* Организована файловая структура.
* Реализован рефакторинг архитектуры (с классов на хуки, с jsx на tsx, с redux на redux-toolkit). Подробнее в ветке [refactored](https://github.com/RedTypes/react-project-kitchen-frontend/tree/refactored).
* Реализован редизайн.

## Бэкэнд
Бэкенд для локального запуска проекта: ссылки на [репозиторий бэкенда на Express](https://github.com/yandex-praktikum/kogda-virastu-backend) и на [Контейнер в Docker](https://github.com/yandex-praktikum/kogda-virastu-backend/blob/main/Dockerfile).

## Развертывание фронтэнда:
* Создайте локальную директорию для проекта
`mkdir dev`
* Перейдите в созданную директорию
`cd dev`
* Клонируйте репозиторий в созданную директорию
`git clone https://github.com/yandex-praktikum/kogda-virastu-frontend.git`
* Откройте проект в любом редакторе кода
* Выполните `npm install && npm start` в терминале, находясь в папке проекта.

## Подходы и архитектурные решения в рамках реализации проекта

### Константы
  Все постоянные величины (адреса и роуты API, константы, значения цветов/шрифтов и т.п.) вынесены в папку `src/constants` и импортируются оттуда по необходимости. Использование "магических значений" в коде **запрещено** вне зависимости от их очевидности.

### Типизация
 Проект реализован на TypeScript. Основные подходы к типизации:
 1. Использование типа `any` **запрещено**.
 2. Типизация поднимается на минимально необходимый уровень абстракции:
 - типы, используемые только  внутри компонента/слоя хранилища, располагаются в самом файле, вся остальная типизация выносится в каталог `src/types`;
 - типизация API вынесена в файл `API.types.ts`;
 - типизация мелких/средних компонент вынесена в файл `widgets.types.ts`;
 - типизация в стилизации и темах находится в файле `styles.types.ts`;
 - общая для API, стилизованного компонента, виджета или не относится не к одной из перечисленных выше категорий типизация вынесена в файл `types.ts`.
3. Типизация пропсов компонент проведена с использованием `type`.
4. Слушатели событий в компонентах типизируются в целом, не через типизацию аргумента, с обязательным указанием как generic-типа того HTML-элемента, на котором произошло событие. Пример:
```const handleCommentSubmit : FormEventHandler<HTMLFormElement> = (evt) => { ... };```

### Стилизация
Стилизация компонентов в проекте осуществляется посредством **CSS-in-JS библиотеки Styled-Components**. Стили размещены в тех же файлах, где расположены компоненты React.

Благодаря Styled-Components стили компонентов определяются, используя синтаксис шаблонных строк ES6, а точнее, теговые шаблоны. После парсинга JS, Styled-Components генерирует уникальные имена классов и внедряет CSS в DOM.

Такой подход позволяет писать стандартный CSS-код, используя преимущества JS.

### Темы интерфейса
  В приложение интегрирована возможность изменения темы интерфейса встроенными средствами библиотеки _styled-components_.  Темы располагаются в каталоге `/src/themes`. В настоящий момент в приложении реализована только светлая тема (в соответствии с дизайн-макетом).

### Интернационализация
  Интернационализация организована с помощью библиотеки ["react-intl”](https://formatjs.io/docs/getting-started/installation/).  Для всех статичных заголовков, подписей к различным блокам и прочих статичных текстовых блоков разрабатываются словари для всех используемых языков, которые находятся в папке `src/vocabularies`. В настоящее время реализованы русский и английский языки.
  Переключение языков не реализовывалось, язык получается из локали браузера, если нужный язык отсутствует в словарях приложения, используется язык по умолчанию - русский.

### Архитектура и подходы к построению компонент

#### Иерархия компонентов

1. **UI элементы**: атомарные переиспользуемые части интерфейса,  основной состав  это кнопки, заголовки, поля ввода, иконки и.т.д. Находятся в каталоге `src/ui-lib`.
2. **Виджеты**: основные элементы и блоки страниц, как крупные части, так и и небольшие их составляющие. Составляются из UI-элементов и других виджетов.  Находятся в каталоге `src/widgets`.
3. **Страницы** Страницы приложения.  Находятся в каталоге `src/pages`.

#### Подходы к построению компонентов

  Код каждого компонента расположен в отдельном файле. В файле компонента прописаны все типы необходимые _только_ для него, все глобальные или разделяемые с другими компонентами/сервисами типы импортируются.

  Так как стилизация в проекте выполнялась с помощью библиотеки styled-components([https://styled-components.com/docs/basics](https://styled-components.com/docs/basics)), добавление стилей происходит не в разных файлах, а в одном месте, в самом файле компонента. Типизация стилизованных компонентов также прописана в основном файле компонента.

   Компонент делится на логику и UI. Сначала создаются `styled<HTMLElement>` "кирпичики", отвечающие за представление (элементов) компонента, и получающие в пропсы _только_ необходимые для отображения данные, или импортируются другие компоненты, использующиеся как элементы разрабатываемого, или эти подходы совмещаются, а потом определяется функциональный компонент, отвечающий за получение данных, реализацию логики, и передачу необходимых пропсов в свои составные части (элементы).

#### Общие подходы к архитектуре

В приложении разделены хранение данных, общение с внешним миром (получение/отправка запросов на сервер) и отображение данных.

Все данные приложения сосредоточены в едином хранилище, реализованном с использованием Redux с помощью библиотеки `redux-toolkit`. Слои хранилища организованы следующим образом:

- `system` содержит системные данные: название приложения, язык, тема, и управляет показом модального окна подтверждения удаления статьи.
- `api` обслуживает операции обращения к серверу и включает в себя семафоры, показывающие процесс и успешность загрузки данных, и сообщения об ошибках, полученные от api.
- `profile` содержит профиль вошедшего в систему пользователя.
- `view` хранит все данные для отображения: массив статей, статью, ленту комментария, текущий комментарий, тэги и выделенные тэги, профиль просматриваемого пользователя и топ.
- `all` включает в себя  списки всех статей, тэгов, языков, тем, все темы и словари.
- `forms` состоит из нескольких подслоёв, каждый из которых обеспечивает одну из используемых в проекте форм.

Непосредственное общение с удалённым сервером изолировано в слое `api`, обособленном в отдельном модуле и экспортирующем асинхронные функции для осуществления запросов, и объект `token` для установки, снятия и проверки `jwt token`. Для осуществления запросов используется библиотека `Axios`, управление запросом происходит через подготовку объекта конфигурации Axios.

Все запросы и обращения к серверу инициируются в компонентах страниц путём отправки `thunk action`. Внутри танка происходит обращение к  серверу, обработка полученных результатов и отправка `actions`, устанавливающих данные в хранилище.

Необходимые для отображения данные получаются из хранилища виджетами, которые используют их для отображения и/или передают в UI элементы из ui-lib в пропсах.

## Backlog

 В развитие приложения мы предлагаем следующие действия:
 - перевести хранилище на использование `createSelector()`, `createAsyncThunk()` и `createEntityAdapter()`;
 - добавить `cursor: pointer` ко всем интерактивным элементам;
реализовать рекомендации WGAG, в частности прописать `aria-*`-атрибуты для повышения **a11y**;
 - реализовать валидацию и санирование ввода пользователя во всех формах;
 - реализовать `ProtectedRoute` с возможностью "обратной" защиты (от попадания _зарегистрированного_ пользователя на определённые роуты на фронтенде);
 - создать попапы информирования об успешном завершении операции и об ошибке (требует соответствующей доработки макета!);
 - адаптировать UI для управления жестами при использовании на мобильных устройствах (требует соответствующей доработки макета!).
