Да, есть нативное решение на Cloudflare: Email Routing + Workers/Pages Functions. Форма отправляет POST на функцию, а она отправляет письмо через send_email‑binding — без mailto и без сторонних приложений. (developers.cloudflare.com)

Что нужно для этого:

Домен должен быть в Cloudflare и нужно включить Email Routing (Cloudflare добавит MX‑записи; если у домена уже есть почтовый провайдер, это может конфликтовать). (developers.cloudflare.com)
Адрес получателя (mashaled2@gmail.com) нужно подтвердить как destination address. (developers.cloudflare.com)
Отправитель письма должен быть с вашего домена (например, contact@yourdomain.com). (developers.cloudflare.com)
Готов внедрить. Подтвердите, пожалуйста:

Вы размещаете сайт на Cloudflare Pages/Workers?
Можно ли включить Email Routing для домена (MX‑записи не заняты другим сервисом)?
Какой адрес «отправителя» сделать (например, contact@вашдомен)?