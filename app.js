document.addEventListener('DOMContentLoaded', ()=> {
    function detectMastheadOutside() {
        let isShowing = false
        const isCardClosed = localStorage.getItem('_is_card_closed')
        const card = document.querySelector('.js-card')
        const masthead = document.querySelector('.js-masthead')

        if (isCardClosed) return card.remove()

        if (!isCardClosed) {
            card.removeAttribute('hidden')
            card.addEventListener('click', (e)=> {
                if (e.target.closest('[data-close]')) {
                    card.classList.remove('is_showing')
                    localStorage.setItem('_is_card_closed', true)
                    setTimeout(()=> {
                        card.remove()
                    }, 1000)
                }
            })
        }

        const showAndHide = ()=> {
            const blockOffset = masthead.offsetTop + masthead.offsetHeight
            if (blockOffset < window.scrollY && !isShowing && !isCardClosed) {
                card.classList.add('is_showing')
                isShowing = true
            } else if (blockOffset > window.scrollY && isShowing) {
                card.classList.remove('is_showing')
                isShowing = false
            }
        }

        showAndHide()
        
        window.addEventListener('scroll',  showAndHide)
    }

    detectMastheadOutside()
})