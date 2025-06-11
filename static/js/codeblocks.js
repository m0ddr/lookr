// Copy to Clipboard functionality for code blocks
function initCopyButtons() {
    const preTags = document.querySelectorAll('pre:not(.copy-wrapped)');
    
    preTags.forEach(pre => {
        pre.classList.add('copy-wrapped');
        
        const container = document.createElement('div');
        container.className = 'code-container';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        
        copyBtn.innerHTML = `
            <svg class="clipboard-icon" viewBox="0 0 24 24">
                <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            <svg class="check-icon" viewBox="0 0 24 24" style="display: none;">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
        `;
        
        pre.parentNode.insertBefore(container, pre);
        container.appendChild(copyBtn);
        container.appendChild(pre);
        
        copyBtn.addEventListener('click', async () => {
            const code = pre.textContent || pre.innerText;
            
            try {
                await navigator.clipboard.writeText(code);
                showCopiedState(copyBtn);
            } catch (err) {
                fallbackCopyTextToClipboard(code, copyBtn);
            }
        });
    });
}

function showCopiedState(button) {
    const clipboardIcon = button.querySelector('.clipboard-icon');
    const checkIcon = button.querySelector('.check-icon');
    
    clipboardIcon.style.display = 'none';
    checkIcon.style.display = 'block';
    button.classList.add('copied');
    
    setTimeout(() => {
        clipboardIcon.style.display = 'block';
        checkIcon.style.display = 'none';
        button.classList.remove('copied');
    }, 2000);
}

function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) showCopiedState(button);
    } catch (err) {
        console.error('Copy failed', err);
    }
    
    document.body.removeChild(textArea);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
} else {
    initCopyButtons();
}

const observer = new MutationObserver(initCopyButtons);
observer.observe(document.body, { childList: true, subtree: true });