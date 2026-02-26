const extensionName = "CT-MoveOptionsExtensionsButtons";

function integrateButton({ originalId, sidebarId, fallbackIcon, fallbackTitle, order }) {
    let isMoved = false;

    const checkAndMove = () => {
        if (isMoved) return;

        const $btn = $(`#${originalId}`);
        if ($btn.length && window.CTSidebarButtons) {
            if ($btn.closest('.ct-sidebar-button').length) return;

            const title = $btn.attr('title') || fallbackTitle;
            
            const proxy = window.CTSidebarButtons.registerButton({
                id: sidebarId,
                icon: fallbackIcon,
                title: title,
                order: order,
                class: 'core-integration-proxy',
                onClick: (e) => {
                    if (e.target.id !== originalId && !$(e.target).closest(`#${originalId}`).length) {
                        e.stopPropagation(); 
                        $btn[0].click();     
                    }
                }
            });

            if (proxy) {
                isMoved = true;
                
                $(proxy).empty();
                
                $btn.appendTo(proxy).css({
                    fontSize: 'calc(var(--button-size, 20px) * 0.6)',
                    color: 'var(--SmartThemeBodyColor, rgba(255, 255, 255, 0.7))',
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    padding: 0
                }).removeClass('interactable').removeAttr('tabindex');

                const visibilityObserver = new MutationObserver(() => {
                    visibilityObserver.disconnect(); 
                    
                    const isHidden = $btn[0].style.display === 'none' || $btn.hasClass('displayNone');
                    window.CTSidebarButtons.setButtonVisible(sidebarId, !isHidden);
                    
                    if (!isHidden && $btn[0].style.display !== 'flex') {
                        $btn.css('display', 'flex');
                    }
                    
                    visibilityObserver.observe($btn[0], { attributes: true, attributeFilter:['style', 'class'] });
                });
                
                const initiallyHidden = $btn[0].style.display === 'none' || $btn.hasClass('displayNone');
                if (!initiallyHidden) {
                    $btn.css('display', 'flex');
                }
                window.CTSidebarButtons.setButtonVisible(sidebarId, !initiallyHidden);
                visibilityObserver.observe($btn[0], { attributes: true, attributeFilter: ['style', 'class'] });

                const titleObserver = new MutationObserver(() => {
                    const newTitle = $btn.attr('title') || $btn.attr('data-original-title');
                    if (newTitle) {
                        $(proxy).attr('title', newTitle);
                    }
                });
                titleObserver.observe($btn[0], { attributes: true, attributeFilter:['title', 'data-original-title'] });
            }
        }
    };

    checkAndMove();
    
    if (!isMoved) {
        const domObserver = new MutationObserver((mutations, obs) => {
            if ($(`#${originalId}`).length && !$(`#${originalId}`).closest('.ct-sidebar-button').length) {
                checkAndMove();
                if (isMoved) obs.disconnect(); 
            }
        });
        domObserver.observe(document.body, { childList: true, subtree: true });
    }
}

// Ensure popups emerge on the correct side dynamically
function setupMenuPopouts() {
    const sidebar = document.getElementById('ct-sidebar-container');
    const optionsMenu = document.getElementById('options');
    const extMenu = document.getElementById('extensionsMenu');
    
    if (!sidebar) return;

    const syncDirection = () => {
        const isRight = sidebar.classList.contains('sidebar-right');
        
        if (optionsMenu) {
            optionsMenu.classList.toggle('ct-popout-left', isRight);
            optionsMenu.classList.toggle('ct-popout-right', !isRight);
            optionsMenu.classList.add('ct-sidebar-integrated');
        }
        if (extMenu) {
            extMenu.classList.toggle('ct-popout-left', isRight);
            extMenu.classList.toggle('ct-popout-right', !isRight);
            extMenu.classList.add('ct-sidebar-integrated');
        }
    };
    
    syncDirection();
    
    // Watch the sidebar for layout position changes (Left/Right)
    const classObserver = new MutationObserver(syncDirection);
    classObserver.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
}

jQuery(() => {
    const tryInit = () => {
        if (window.CTSidebarButtons) {
            
            integrateButton({
                originalId: 'options_button',
                sidebarId: 'core-options',
                fallbackIcon: 'fa-solid fa-bars',
                fallbackTitle: 'Options',
                order: 90
            });

            integrateButton({
                originalId: 'extensionsMenuButton',
                sidebarId: 'core-extensions',
                fallbackIcon: 'fa-solid fa-magic-wand-sparkles',
                fallbackTitle: 'Extensions',
                order: 91
            });

            // Set up CSS hooks for the popouts once elements are mapped
            setTimeout(setupMenuPopouts, 500);

        } else {
            setTimeout(tryInit, 500); 
        }
    };

    tryInit();
});