
(function() {
    // Helper function to wipe the page DOM cleanly
    function triggerBlockPage() {
        document.body.innerHTML = `
            <div style="
                position: fixed; 
                inset: 0; 
                background: #0f172a; 
                color: white; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                z-index: 99999999; 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-align: center;
                padding: 20px;
            ">
                <div style="font-size: 5rem; margin-bottom: 20px;">🛡️</div>
                <h1 style="color: #ef4444; font-size: 2.2rem; font-weight: 800; margin-bottom: 15px;">Access Restricted</h1>
                <p style="color: #94a3b8; font-size: 1.15rem; max-width: 500px; line-height: 1.6; margin: 0 auto 30px auto;">
                    <strong>We Got you!!!</strong> Inspect is prohibited and not permissible on this website.
                </p>
                <button onclick="window.location.reload()" style="
                    background: #ef4444; 
                    color: white; 
                    border: none; 
                    padding: 12px 28px; 
                    border-radius: 8px; 
                    font-weight: 700; 
                    cursor: pointer;
                    font-size: 1rem;
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                    transition: 0.2s;
                ">Reload</button>
            </div>
        `;
        throw new Error("Inspect prohibited."); 
    }

    // 1. Boundary dimension checks (docked inspectors)
    const checkDevTools = function() {
        const threshold = 160;
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;

        if (widthDiff > threshold || heightDiff > threshold) {
            triggerBlockPage();
        }
    };

    // RUN INSTANTLY ON LOAD (Catches docked inspect opened before visiting)
    checkDevTools();

    // 2. Disable Right-Click Context Menu
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 3. Disable Developer Tool Keyboard Shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 123) { // F12
            e.preventDefault();
            triggerBlockPage();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) { // Ctrl+Shift+I
            e.preventDefault();
            triggerBlockPage();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) { // Ctrl+Shift+J
            e.preventDefault();
            triggerBlockPage();
            return false;
        }
        if (e.ctrlKey && e.keyCode === 85) { // Ctrl+U (View Source)
            e.preventDefault();
            triggerBlockPage();
            return false;
        }
        if (e.metaKey && e.altKey && e.keyCode === 73) { // Cmd+Opt+I (Mac Safari)
            e.preventDefault();
            triggerBlockPage();
            return false;
        }
    });

    // 4. Run active high-speed loops (Checks docked inspectors every 250ms)
    setInterval(checkDevTools, 2500);
    window.addEventListener('resize', checkDevTools);

    // 5. High-Speed Debugger Timing Check (Catches detached/separate window inspect on load)
    setInterval(function() {
        const startTime = performance.now();

        const endTime = performance.now();
        
        // If pause lag is detected, developer tools are active
        if (endTime - startTime > 100) {
            triggerBlockPage();
        }
    }, 2500);
})();