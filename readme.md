h2 Задание
Реализовать веб-интерфейс и клиентскую логику браузерной игры ​ « ​ Memory​ » в
соответствии с предложенными правилами и дизайном.

h2 Правила игры
«​ Memory​ » ​ ​ – это карточная настольная игра на одного. Игрок открывает любые две
карты за один ход. Если при открытии образовалась пара одинаковых по масти и
номиналу карт, то они пропадают со стола, а игроку начисляются очки. Если открытые
карты оказались разными, то они переворачивают обратно рубашкой вверх, а
количество набранных очков уменьшается.

h2 Реализация
При нажатии кнопки «Начать игру» на столе раскладываются 18 карт (6 на 3). Каждую
новую игру генерируется новый случайный расклад с условием, что у каждой карты в
раскладке обязательно должна быть пара. Это значит, что из 52-ух карт в колоде
используется только 9 разных карт, каждая из которой дублируется. Первые 5 секунд
карты лежат рубашкой вниз, потом переворачиваются рубашкой вверх.Игрок кликает на 
любую карту, после чего она переворачивается и остается открытой,
до тех пор, пока игрок не откроет вторую карту. Если карты составляют пару, они
исчезают со стола. В обратном случае они снова переворачиваются рубашкой вверх.
Очки пересчитываются на каждом ходу по следующей формуле:
— при образовании пары прибавляется число нераскрытых пар, умноженное на 42;
— при несовпадении пары вычитается число раскрытых пар, умноженное на 42.
Игра продолжается до тех пор, пока на столе есть карты. После исчезновения со стола
последней пары, появляется экран с количеством заработанных очков:

h2 Условия
Прототипы и все необходимые картинки приложены в архиве. Но не обязательно
использовать наши ресурсы. Вместо этого можно воспользоваться внешними API или
нарисовать карты самостоятельно. Главное — не отходить от предложенного дизайна
и постараться максимально ему соответствовать.
В реализации решения вы можете использовать любые технологии, которые
демонстрируют ваши знания и навыки.

h2 Бонусы
Анимации и звуки в игре будут плюсом, но остаются на ваше усмотрение.
Кроме этого, бонусом будет покрытие кода любыми видами тестов (e2e, unit,
screenshot testing и т.д.)
