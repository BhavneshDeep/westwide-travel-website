const fs = require('fs');

try {
    let html = fs.readFileSync('c:/Users/Administrator/Desktop/WESTWIDE/services.html', 'utf8');

    const replaceStr = `<div style="display: flex; flex-direction: column; gap: 10px; margin-top: auto; padding-top: 1rem;">
                            <button class="btn btn-primary view-req-btn" style="width: 100%; padding: 0.8rem; font-size: 0.9rem; border: none;">Requirements</button>
                            <a href="contact.html" class="btn btn-outline" style="width: 100%; padding: 0.8rem; font-size: 0.9rem; text-align: center; display: flex; align-items: center; justify-content: center;">Apply</a>
                        </div>`;

    let replaced = html.replace(/<div style="display: flex; gap: 10px; margin-top: 1rem;">[\s\S]*?<button class="btn btn-primary view-req-btn" style="flex: 1; padding: 0.5rem; font-size: 0.9rem; border: none;">Requirements<\/button>[\s\S]*?<a href="contact\.html" class="btn btn-outline" style="flex: 1; padding: 0.5rem; font-size: 0.9rem; text-align: center; display: flex; align-items: center; justify-content: center;">Apply<\/a>[\s\S]*?<\/div>/g, replaceStr);

    fs.writeFileSync('c:/Users/Administrator/Desktop/WESTWIDE/services.html', replaced);
    console.log("services.html update complete.");
} catch (e) {
    console.error("Error", e);
}
