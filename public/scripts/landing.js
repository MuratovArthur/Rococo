
    window.addEventListener('resize', function() {
      if (window.matchMedia("(max-width: 500px)").matches) {
        document.getElementById("interface").innerHTML = "Используем удобный и понятный интерфейс";
      document.querySelector(".a-last").innerHTML = "Обучение и развитие";
      };
      if (window.matchMedia("(max-width: 450px)").matches) {
        document.getElementById("interface").innerHTML = "Используем удобный интерфейс";
      };
      if (window.matchMedia("(max-width: 321px)").matches) {
        document.querySelector(".glow-1").innerHTML = "Отбираем выгодные предложения";
                 document.querySelector(".glow-2").innerHTML = "Экономим ваше время на поиск";
      };
    });

    if (window.matchMedia("(max-width: 500px)").matches) {
      document.getElementById("interface").innerHTML = "Используем удобный и понятный интерфейс";
      document.querySelector(".a-last").innerHTML = "Обучение и развитие";
    }

    if (window.matchMedia("(max-width: 450px)").matches) {
        document.getElementById("interface").innerHTML = "Используем удобный интерфейс";
      };

      if (window.matchMedia("(max-width: 321px)").matches) {
        document.querySelector(".glow-1").innerHTML = "Отбираем выгодные предложения";
         document.querySelector(".glow-2").innerHTML = "Экономим ваше время на поиск";

      };


      $(document).ready(function() {
        $("#phone").mask("+7 (000)-000-00-00");
      });