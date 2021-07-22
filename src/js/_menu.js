const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.Opera() ||
            isMobile.Windows() ||
            isMobile.iOS()
        )
    }
};

function getClassDevice() {
    if (isMobile.any())
        document.body.classList.add('_touch');
    else
        document.body.classList.add('_pc');

}

function setActiveMobileMenu() {
    let iconMenu = document.querySelector(".icon-menu");
    if(iconMenu){
        iconMenu.addEventListener("click", function(e){
            let menuBody = document.querySelector(".menu__body");
            if(menuBody)
            {
                document.body.classList.toggle("_lock");
                iconMenu.classList.toggle("_active");
                menuBody.classList.toggle("_active");
            }
        });
    }
}


setActiveMobileMenu();
