document.addEventListener('DOMContentLoaded', () => {
    // Load saved freedium URL
    chrome.storage.sync.get(['freediumUrl'], (result) => {
        if (result.freediumUrl) {
            document.getElementById('freediumUrl').value = result.freediumUrl;
        }
    });

    // Save freedium URL
    document.getElementById('save').addEventListener('click', () => {
        const freediumUrl = document.getElementById('freediumUrl').value.trim();

        // Remove trailing slash if present
        const formattedfreediumUrl = freediumUrl.endsWith('/')
            ? freediumUrl.slice(0, -1)
            : freediumUrl;

        chrome.storage.sync.set({ freediumUrl: formattedfreediumUrl }, () => {
            const status = document.getElementById('status');
            status.textContent = 'Settings saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        });
    });
});