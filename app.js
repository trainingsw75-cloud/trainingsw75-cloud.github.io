// ПОДПИСКА
function handleSubscribe(e){
    e.preventDefault();
    var email=document.getElementById('emailInput').value;
    if(!email.includes('@')){alert('Введите корректный e-mail');return}
    var subscribers=JSON.parse(localStorage.getItem('subscribers')||'[]');
    if(subscribers.includes(email)){alert('Вы уже подписаны!');return}
    subscribers.push(email);
    localStorage.setItem('subscribers',JSON.stringify(subscribers));
    document.getElementById('emailInput').value='';
    alert('Подписка оформлена! Первые инструкции придут на '+email)
}

// ЧАТ-БОТ
function toggleChat(){
    var widget=document.getElementById('chat-widget');
    var button=document.getElementById('chat-button');
    if(widget.style.display==='none'||widget.style.display===''){
        widget.style.display='block';
        button.style.display='none'
    }else{
        widget.style.display='none';
        button.style.display='block'
    }
}

function addMessage(text,isBot){
    var messages=document.getElementById('chat-messages');
    var div=document.createElement('div');
    if(isBot){
        div.style.cssText='background:white;padding:12px;border-radius:12px;margin-bottom:10px;font-size:0.9em;box-shadow:0 1px 3px rgba(0,0,0,0.1)'
    }else{
        div.style.cssText='background:#e3f2fd;padding:12px;border-radius:12px;margin-bottom:10px;font-size:0.9em;margin-left:20px'
    }
    div.innerHTML='<strong style="color:'+(isBot?'#1a5f9e':'#e8913a')+';">'+(isBot?'Бот':'Вы')+':</strong><br>'+text;
    messages.appendChild(div);
    messages.scrollTop=messages.scrollHeight
}

function quickAsk(topic){
    document.getElementById('chat-input').value=topic;
    sendMessage()
}

function sendMessage(){
    var input=document.getElementById('chat-input');
    var msg=input.value.trim();
    if(!msg)return;
    addMessage(msg,false);
    input.value='';
    setTimeout(function(){
        var lower=msg.toLowerCase();
        var reply='Извините, я пока учусь. Посмотрите разделы сайта или подпишитесь на обновления.';
        
        if(lower.indexOf('отпуск')!==-1||lower.indexOf('отпускные')!==-1||lower.indexOf('зарплат')!==-1){
            reply='💰 <a href="finance-calc.html" style="color:#1a5f9e">Откройте калькулятор</a><br><br>Формула: средний дневной заработок × количество дней + северная надбавка - НДФЛ 13%.<br><br>Для моряков обычно 60 дней отпуска.'
        }else if(lower.indexOf('цзн')!==-1||lower.indexOf('центр занятости')!==-1||lower.indexOf('безработ')!==-1){
            reply='📋 Документы для ЦЗН:<br>• Паспорт<br>• Трудовая книжка/СТД-Р<br>• Справка о среднем заработке<br>• СНИЛС, ИНН<br><br>Встают на учёт в первый день отпуска. Пособие через 10 дней.'
        }else if(lower.indexOf('грант')!==-1||lower.indexOf('соцконтракт')!==-1||lower.indexOf('350')!==-1||lower.indexOf('бизнес')!==-1){
            reply='🎯 Социальный контракт — до 350 000 ₽<br><br>Условия:<br>• Статус безработного<br>• Бизнес-план<br>• Доход ниже прожиточного минимума<br><br>Подаётся в соцзащиту по месту жительства.'
        }else if(lower.indexOf('налог')!==-1||lower.indexOf('ндфл')!==-1||lower.indexOf('декларац')!==-1||lower.indexOf('фнс')!==-1){
            reply='📊 Налоги для моряков:<br>• 3-НДФЛ: до 30 апреля следующего года<br>• Проверить задолженность: nalog.gov.ru<br>• Вычеты: имущественный, социальный<br><br>Работодатель обычно платит НДФЛ сам.'
        }else if(lower.indexOf('тест')!==-1||lower.indexOf('экзамен')!==-1||lower.indexOf('проверка')!==-1){
            reply='🎓 <a href="exam-test.html" style="color:#1a5f9e">Пройдите тест</a><br><br>5 вопросов о цифровой грамотности. Проверьте, готовы ли вы к отпуску!'
        }else if(lower.indexOf('привет')!==-1||lower.indexOf('здравств')!==-1){
            reply='⚓ Привет, моряк! Я помогу с документами в отпуске. Спрашивайте про отпускные, ЦЗН, гранты, налоги — или пройдите тест!'
        }else if(lower.indexOf('психолог')!==-1||lower.indexOf('стресс')!==-1||lower.indexOf('тревога')!==-1){
            reply='🧠 <a href="#ai-psychologist" style="color:#1a5f9e">AI Психолог</a> готов помочь!<br><br>Выберите ситуацию: стресс в рейсе, разлука с семьёй, адаптация, финансы, страх будущего.<br><br>Или звоните бесплатно: 8-800-2000-122'
        }else if(lower.indexOf('ai')!==-1||lower.indexOf('генератор')!==-1||lower.indexOf('пост')!==-1){
            reply='🤖 <a href="#ai-generator" style="color:#1a5f9e">AI Генератор</a> создаёт контент через YandexGPT, Kandinsky, GigaChat.<br><br>Выберите сервис, тему, формат — и получите готовый пост!'
        }
        
        addMessage(reply,true)
    },500)
}

// AI ГЕНЕРАТОР
function generateAIContent(){
    var service=document.getElementById('aiService').value;
    var topic=document.getElementById('aiTopic').value||'Как оформить документы моряку';
    var format=document.getElementById('aiFormat').value;
    var tone=document.getElementById('aiTone').value;
    var result='';
    
    if(service==='kandinsky'){
        result='🎨 Kandinsky\n\nКартинка будет сгенерирована в Kandinsky (fusionbrain.ai)\n\nПромпт для генерации картинки:\n"Морская тема: '+topic+'. Стиль: инфографика, яркие цвета, понятные иконки, текст читаемый."\n\n🔗 Откройте: https://fusionbrain.ai\nВставьте промпт, выберите стиль "Инфографика" или "Реализм", нажмите "Создать".\n\n💡 Совет: Сгенерированную картинку можно использовать как обложку для поста ВК.'
    }else if(service==='yandex'){
        var content='';
        if(format==='post'){
            content='🔥 '+topic+'\n\nКратко и по делу:\n\n✅ Главное, что нужно знать\n✅ 3 шага к результату\n✅ Полезный лайфхак\n\nЧитайте подробнее на нашем сайте!'
        }else if(format==='article'){
            content='📖 '+topic+': полное руководство\n\nВведение:\nПроблема, с которой сталкиваются многие моряки...\n\nРаздел 1: Подготовка\n• Документ 1\n• Документ 2\n• Сроки\n\nРаздел 2: Процесс\n• Шаг 1\n• Шаг 2\n• Шаг 3\n\nРаздел 3: Итог\nЧто получите в результате\n\nЗаключение:\nНе откладывайте! Начните сегодня.'
        }else if(format==='instruction'){
            content='📋 Инструкция: '+topic+'\n\nШаг 1: Подготовка документов\n[список]\n\nШаг 2: Подача заявления\n[где и как]\n\nШаг 3: Ожидание результата\n[сроки]\n\nШаг 4: Получение\n[что делать дальше]\n\n❗ Важно: проверьте актуальность на официальных сайтах!'
        }else if(format==='script'){
            content='🎬 Сценарий видео: '+topic+'\n\n[0:00-0:30] Приветствие + проблема\n"Здравствуйте, моряки! Сегодня разберём..."\n\n[0:30-2:00] Основная часть\n• Пункт 1\n• Пункт 2\n• Пункт 3\n\n[2:00-2:30] Лайфхак\n"А вот что мало кто знает..."\n\n[2:30-3:00] Призыв к действию\n"Подписывайтесь, ставьте лайк, задавайте вопросы!"'
        }
        
        if(tone==='simple'){content=content.replace(/📖/g,'📋').replace(/анализ/g,'простой')}
        else if(tone==='professional'){content='📊 Профессиональный обзор\n\n'+content}
        else if(tone==='friendly'){content='👋 Друзья, привет!\n\n'+content}
        else if(tone==='strict'){content='⚠️ ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ\n\n'+content}
        
        result='✨ YandexGPT\n\nСгенерировано с помощью YandexGPT (yandex.ru/gpt)\n\n'+content+'\n\n---\n💡 Доработайте вручную или вставьте в YandexGPT для улучшения.\n🔗 yandex.ru/gpt'
    }else if(service==='gigachat'){
        var content='';
        if(format==='post'){
            content='📌 '+topic+'\n\nАнализ ситуации:\nНа основании опыта 200 000+ моряков в РФ...\n\nКлючевые факторы:\n1. Фактор А — влияет на сроки\n2. Фактор Б — влияет на сумму\n3. Фактор В — влияет на результат\n\nРекомендации:\n• Действие 1 (срочно)\n• Действие 2 (важно)\n• Действие 3 (планово)\n\nИсточники: официальные сайты госорганов.'
        }else if(format==='article'){
            content='📚 Глубокий анализ: '+topic+'\n\n1. Правовая база\nУпомянуть законы, приказы, постановления\n\n2. Статистика\nЦифры, тренды, изменения за последние годы\n\n3. Практические кейсы\nРеальные истории моряков (анонимно)\n\n4. Экспертное мнение\nЧто говорят юристы, бухгалтеры, кадровики\n\n5. Прогноз\nЧто изменится в ближайшее время\n\nВыводы и рекомендации.'
        }else if(format==='instruction'){
            content='📑 Детальная инструкция: '+topic+'\n\nПодготовительный этап:\n□ Пункт 1\n□ Пункт 2\n□ Пункт 3\n\nОсновной этап:\n1. Действие...\n   • Поддействие 1\n   • Поддействие 2\n2. Действие...\n3. Действие...\n\nЗавершающий этап:\n□ Проверка\n□ Подтверждение\n□ Сохранение документов\n\nЧастые ошибки:\n❌ Ошибка 1 — как избежать\n❌ Ошибка 2 — как избежать\n❌ Ошибка 3 — как избежать'
        }else if(format==='script'){
            content='🎥 Профессиональный сценарий: '+topic+'\n\nКАДР 1 (0:00-0:15)\nВИД: Заставка с логотипом\nЗВУК: Фоновая музыка\nТЕКСТ: "Морской помощник представляет..."\n\nКАДР 2 (0:15-0:45)\nВИД: Спикер в кадре / скриншоты\nЗВУК: Голос за кадром\nТЕКСТ: Введение в тему\n\nКАДР 3-5 (0:45-3:00)\nВИД: Инфографика, демонстрация\nЗВУК: Объяснение с примерами\nТЕКСТ: Основной контент\n\nКАДР 6 (3:00-3:30)\nВИД: Призыв к действию\nЗВУК: Энергично\nТЕКСТ: "Подписывайтесь, комментируйте!"\n\nКАДР 7 (3:30-3:45)\nВИД: Контакты, ссылки\nЗВУК: Музыка затихает\nТЕКСТ: Сайт, соцсети, e-mail'
        }
        
        if(tone==='simple'){content=content.replace(/📚|📑/g,'📋')}
        else if(tone==='professional'){content='📊 Профессиональный обзор\n\n'+content}
        else if(tone==='friendly'){content='👋 Друзья, привет!\n\n'+content}
        else if(tone==='strict'){content='⚠️ ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ\n\n'+content}
        
        result='✨ GigaChat\n\nСгенерировано с помощью GigaChat (developers.sber.ru/gigachat)\n\n'+content+'\n\n---\n💡 Доработайте вручную или вставьте в GigaChat для улучшения.\n🔗 developers.sber.ru/gigachat'
    }
    
    document.getElementById('aiOutput').textContent=result;
    document.getElementById('aiResult').classList.add('show')
}

function copyAIResult(){
    var text=document.getElementById('aiOutput');
    var range=document.createRange();
    range.selectNode(text);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert('Контент скопирован!')
}

function postAIToVK(){
    var text=document.getElementById('aiOutput').textContent;
    document.getElementById('vkMessage').value=text;
    document.getElementById('vk').scrollIntoView({behavior:'smooth'});
    alert('Текст перенесён в форму автопостинга ВК. Заполните токен и ID группы.')
}

// AI ПСИХОЛОГ
function setPsychTopic(topic){
    var titles={stress:'😰 Стресс в рейсе',family:'💔 Разлука с семьёй',adaptation:'🔄 Адаптация после рейса',money:'💰 Финансовый стресс',future:'🌫️ Страх будущего',custom:'✏️ Ваша ситуация'};
    if(titles[topic]){
        document.getElementById('psychInput').value='['+titles[topic]+']\n\nОпишите свою ситуацию подробнее, если нужно...'
    }
}

function getPsychSupport(){
    var input=document.getElementById('psychInput').value;
    var topic='custom';
    var lower=input.toLowerCase();
    if(lower.indexOf('стресс')!==-1||lower.indexOf('тревога')!==-1||lower.indexOf('бессонница')!==-1)topic='stress';
    else if(lower.indexOf('жена')!==-1||lower.indexOf('семья')!==-1||lower.indexOf('дети')!==-1||lower.indexOf('разлука')!==-1)topic='family';
    else if(lower.indexOf('адаптация')!==-1||lower.indexOf('вернулся')!==-1||lower.indexOf('домой')!==-1)topic='adaptation';
    else if(lower.indexOf('деньги')!==-1||lower.indexOf('долг')!==-1||lower.indexOf('кредит')!==-1||lower.indexOf('зарплата')!==-1)topic='money';
    else if(lower.indexOf('будущее')!==-1||lower.indexOf('страх')!==-1||lower.indexOf('пенсия')!==-1||lower.indexOf('безработ')!==-1)topic='future';
    
    var responses={
        stress:{
            title:'😰 Стресс в рейсе',
            text:'Понимаем, в рейсе тяжело. Вот что помогает:\n\n1. 🌬️ Дыхательная техника\n   Вдох 4 сек → задержка 4 сек → выдох 6 сек. Повторите 5 раз.\n\n2. 📝 Дневник эмоций\n   Записывайте мысли в телефоне. Это разгружает голову.\n\n3. 🎧 Аудиокниги/подкасты\n   Отвлекают от тревожных мыслей.\n\n4. 💪 Физическая активность\n   Даже зарядка в каюте помогает снять напряжение.\n\n5. 🤝 Поговорите с коллегой\n   Иногда просто выговориться — уже помощь.\n\nПомните: стресс — это нормальная реакция. Не бойтесь просить поддержки.'
        },
        family:{
            title:'💔 Разлука с семьёй',
            text:'Разлука — испытание для отношений. Вот стратегии:\n\n1. 📞 Регулярные звонки\n   Договоритесь о времени. Даже 10 минут в день важны.\n\n2. 💌 Сюрпризы из рейса\n   Отправьте открытку, фото, видео. Покажите, что думаете о них.\n\n3. 🗣️ Обсудите ожидания\n   Поговорите перед рейсом: как часто звонить, что обсуждать.\n\n4. 🤗 Вернувшись домой:\n   • Не критикуйте сразу — всё изменилось\n   • Слушайте, что произошло за время разлуки\n   • Планируйте время вместе заранее\n\n5. 👨‍👩‍👧 Вовлекайте детей\n   Рассказывайте про работу, показывайте фото корабля.\n\nЕсли конфликты накапливаются — обратитесь к семейному психологу. Это нормально.'
        },
        adaptation:{
            title:'🔄 Адаптация после рейса',
            text:'Возвращение дома — тоже стресс. Вот как справиться:\n\n1. ⏳ Дайте себе время\n   Не планируйте важных дел первые 3-5 дней.\n\n2. 🔄 Медленный переход\n   Режим сна, еда, активность — меняйте постепенно.\n\n3. 🗓️ Совместное планирование\n   Обсудите с семьёй планы на отпуск. Будьте готовы к компромиссам.\n\n4. 🧘 Личное пространство\n   Нужно время для себя — это нормально, не обида.\n\n5. 📋 Не всё сразу\n   Документы, дела, встречи — распределите по неделям.\n\nЧастая ошибка: пытаться "наверстать" всё за первую неделю. Не надо.'
        },
        money:{
            title:'💰 Финансовый стресс',
            text:'Деньги — главный стрессор. Давайте разберёмся:\n\n1. 📊 Счёт доходов и расходов\n   Запишите ВСЕ траты за месяц. Удивитесь, куда уходит.\n\n2. 🎯 Приоритеты\n   Обязательные: жильё, еда, лечение\n   Отложить: развлечения, импульсные покупки\n\n3. 💰 План "Финансовая подушка"\n   Цель: 3-6 месяцев расходов на сбережениях\n   Начните с 10% от каждой зарплаты\n\n4. 📈 Дополнительный доход\n   • Курсы, консультации (ваш опыт ценен!)\n   • Сезонная работа в отпуск\n   • Удалённая работа через интернет\n\n5. 🆘 Если долги:\n   • Не берите новые кредиты для погашения старых\n   • Обратитесь в банк за реструктуризацией\n   • Бесплатная юридическая помощь: 8-800-2000-122\n\nПомните: финансовые проблемы решаемы. Главное — начать действовать.'
        },
        future:{
            title:'🌫️ Страх будущего',
            text:'Неопределённость пугает. Вот как справиться:\n\n1. 🎯 Конкретика вместо тумана\n   "Я останусь без работы" → "Я найду 3 варианта работы за месяц"\n\n2. 📋 План Б\n   Что если...? Запишите ответы. План снижает тревогу.\n\n3. 🎓 Обучение\n   Новые навыки = уверенность. Бесплатные курсы в ЦЗН.\n\n4. 🤝 Сеть контактов\n   Связи помогают найти работу. Поддерживайте знакомства.\n\n5. 🏥 Здоровье\n   Профосмотры, страховка, здоровый образ жизни — инвестиция в будущее.\n\nВажно: будущее не приходит само. Но шаги к нему можно делать сегодня.'
        },
        custom:{
            title:'✏️ Ваша ситуация',
            text:'Спасибо, что поделились. Вот универсальные шаги:\n\n1. 🗣️ Выговоритесь\n   Расскажите другу, напишите в дневник, обратитесь к психологу.\n\n2. 🔍 Разберите проблему\n   Что конкретно беспокоит? Когда началось? Что пробовали?\n\n3. 🎯 Один шаг\n   Не надо всё решать сразу. Выберите ОДНО действие на сегодня.\n\n4. 🤝 Поддержка\n   Вы не одни. Многие моряки проходят через это.\n\n5. 📞 Профессиональная помощь\n   Если тяжело справиться самому — это нормально обратиться за помощью.\n\nТелефон доверия: 8-800-2000-122 (круглосуточно, бесплатно, анонимно)'
        }
    };
    
    var response=responses[topic];
    var output='<h4 style="color:#e91e63;margin-bottom:15px">'+response.title+'</h4>';
    output+='<div style="white-space:pre-wrap">'+response.text+'</div>';
    
    if(input&&!input.includes('Опишите свою ситуацию')){
        output+='<div style="margin-top:20px;padding:15px;background:#fce4ec;border-radius:10px"><strong>Ваш запрос:</strong><br>'+input.substring(0,200)+(input.length>200?'...':'')+'</div>'
    }
    
    document.getElementById('psychOutput').innerHTML=output;
    document.getElementById('psychResult').classList.add('show');
    document.getElementById('psychResult').scrollIntoView({behavior:'smooth'})
}

// ГЕНЕРАТОР ПОСТОВ ВК
var postTemplates={
    czn:{
        title:'💼 Как встать на учёт в Центре занятости',
        body:'Моряки, внимание! В отпуске не забудьте оформить пособие по безработице.\n\n📋 Что нужно:\n• Паспорт\n• Трудовая книжка/СТД-Р\n• Справка о среднем заработке\n• СНИЛС и ИНН\n\n⏰ Сроки:\nВстаём на учёт в первый день отпуска. Пособие назначают через 10 дней.\n\n💰 Размер:\nОт 1 500 до 12 000 ₽ в месяц (зависит от региона и стажа).',
        tags:'#моряк #центрзанятости #пособие #безработица #документы #елабуга'
    },
    grant:{
        title:'🎯 Социальный контракт: 350 000 ₽ на бизнес',
        body:'Мечтаете открыть своё дело? Государство даст до 350 000 ₽!\n\n✅ Условия:\n• Статус безработного\n• Бизнес-план\n• Доход ниже прожиточного минимума\n\n📍 Куда подавать:\nУправление социальной защиты по месту жительства\n\n⏳ Срок рассмотрения:\nДо 30 дней\n\nИдея для моряка: образовательный сайт, консультации, курсы цифровой грамотности.',
        tags:'#грант #соцконтракт #бизнес #моряк #предпринимательство #елабуга #татарстан'
    },
    tax:{
        title:'⚠️ Налоги: что должен знать каждый моряк',
        body:'До 30 апреля — срок подачи декларации 3-НДФЛ!\n\n📝 Кто должен подать:\n• Имеете дополнительный доход\n• Продали имущество\n• Получили наследство\n• Хотите вернуть вычет\n\n💻 Как подать:\nЧерез личный кабинет ФНС или Госуслуги\n\n❌ Штраф за просрочку:\n5% от суммы налога за каждый месяц',
        tags:'#налоги #ндфл #декларация #фнс #моряк #штраф #документы'
    },
    docs:{
        title:'📄 Справки в МФЦ: чек-лист для моряка',
        body:'Собираете документы для пособий? Вот полный список справок из МФЦ:\n\n✅ Справка о составе семьи\n✅ Справка о доходах\n✅ Выписка из ЕГРН\n✅ Заверенные копии документов\n\n💡 Совет:\nЗапишитесь через Госуслуги заранее — очереди в МФЦ большие!\n\n⏰ Время оформления:\nОт 3 до 10 рабочих дней',
        tags:'#мфц #справки #документы #моряк #госуслуги #очередь #елабуга'
    },
    vacation:{
        title:'💰 Сколько вы получите в отпуск?',
        body:'Рассчитайте отпускные за 2 минуты!\n\n📊 Формула:\nСредний дневной заработок × количество дней + северная надбавка - НДФЛ 13%\n\n🧮 Пример:\nЗарплата 80 000 ₽, 60 дней отпуска, надбавка 50%\n= 80 000 / 29.3 × 60 + 50% - 13%\n= ~90 000 ₽ чистыми\n\n🔗 Калькулятор на нашем сайте!',
        tags:'#отпускные #калькулятор #моряк #зарплата #север #надбавка #деньги'
    }
};

function generatePost(){
    var topic=document.getElementById('postTopic').value;
    var customTitle=document.getElementById('postCustomTitle').value;
    var facts=document.getElementById('postFacts').value;
    var tone=document.getElementById('postTone').value;
    var template=postTemplates[topic]||postTemplates.czn;
    var title=customTitle||template.title;
    var body=template.body;
    
    if(facts){
        body+='\n\n📌 Важно:\n'+facts.split(',').map(function(f){return '• '+f.trim()}).join('\n')
    }
    
    var cta={
        info:'\n\nℹ️ Подробнее на нашем сайте: trainingsw75-cloud.github.io',
        warning:'\n\n⚠️ Не откладывайте! Проверьте документы сейчас.',
        motivation:'\n\n💪 Вы справитесь! Мы поможем с любыми документами.',
        question:'\n\n❓ Есть вопросы? Задавайте в комментариях или в чате на сайте!'
    };
    
    body+=cta[tone]||cta.info;
    body+='\n\n'+template.tags;
    
    document.getElementById('postText').value=title+'\n\n'+body;
    document.getElementById('postResult').classList.add('show')
}

function copyPost(){
    var text=document.getElementById('postText');
    text.select();
    document.execCommand('copy');
    alert('Пост скопирован! Вставьте в ВКонтакте.')
}

// АВТОПОСТИНГ ВК
function postToVK(){
    var token=document.getElementById('vkToken').value.trim();
    var groupId=document.getElementById('vkGroupId').value.trim();
    var message=document.getElementById('vkMessage').value.trim();
    var resultDiv=document.getElementById('vkResult');
    var statusP=document.getElementById('vkStatus');
    
    if(!token||!groupId||!message){
        alert('Заполните все поля: токен, ID группы и текст поста');
        return
    }
    
    resultDiv.style.display='block';
    statusP.innerHTML='⏳ Отправка поста...';
    
    var apiUrl='https://api.vk.com/method/wall.post';
    var params='owner_id=-'+groupId+'&message='+encodeURIComponent(message)+'&access_token='+token+'&v=5.131';
    
    var script=document.createElement('script');
    var callbackName='vkCallback_'+Date.now();
    
    window[callbackName]=function(response){
        if(response.error){
            statusP.innerHTML='❌ Ошибка: '+response.error.error_msg+'<br><br>💡 Проверьте токен и права доступа (нужен scope: wall)'
        }else{
            statusP.innerHTML='✅ Пост опубликован!<br>ID поста: '+response.response.post_id+'<br><br><a href="https://vk.com/wall-'+groupId+'_'+response.response.post_id+'" target="_blank" style="color:white">Открыть пост →</a>'
        }
        delete window[callbackName];
        if(script.parentNode)document.head.removeChild(script)
    };
    
    script.src=apiUrl+'?'+params+'&callback='+callbackName;
    script.onerror=function(){
        statusP.innerHTML='❌ Ошибка сети. Возможно, токен неверный или истёк.<br><br>💡 Альтернатива: скопируйте текст и вставьте в ВК вручную.';
        delete window[callbackName];
        if(script.parentNode)document.head.removeChild(script)
    };
    
    document.head.appendChild(script);
    
    setTimeout(function(){
        if(window[callbackName]){
            statusP.innerHTML='⏱️ Время ожидания истекло.<br><br>💡 ВК может блокировать запросы с GitHub Pages. Скопируйте текст и опубликуйте вручную.';
            delete window[callbackName];
            if(script.parentNode)document.head.removeChild(script)
        }
    },10000)
}

// ПЛАВНАЯ ПРОКРУТКА
document.querySelectorAll('.nav a').forEach(function(link){
    link.addEventListener('click',function(e){
        e.preventDefault();
        var target=document.querySelector(this.getAttribute('href'));
        if(target)target.scrollIntoView({behavior:'smooth'})
    })
});
