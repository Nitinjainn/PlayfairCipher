let matrix = [];

// Generate Matrix from Key
function updateMatrix() {
    let key = document.getElementById('secretKey').value.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    let fullKey = [...new Set(key + alphabet)].slice(0, 25);
    
    const container = document.getElementById('matrixGrid');
    container.innerHTML = '';
    matrix = [];
    
    for (let i = 0; i < 5; i++) {
        matrix[i] = fullKey.slice(i * 5, i * 5 + 5);
        matrix[i].forEach(char => {
            const div = document.createElement('div');
            div.className = 'cell';
            div.textContent = char;
            container.appendChild(div);
        });
    }
    // Auto-refresh processing
    runCipher(true);
    runCipher(false);
}

function findPos(char) {
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            if (matrix[r][c] === char) return { r, c };
        }
    }
}

function runCipher(isEncrypt) {
    const inputId = isEncrypt ? 'encryptInput' : 'decryptInput';
    const outputId = isEncrypt ? 'encryptOutput' : 'decryptOutput';
    const previewId = isEncrypt ? 'encDigraphs' : 'decDigraphs';
    
    let text = document.getElementById(inputId).value.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    if (!text) {
        document.getElementById(outputId).textContent = isEncrypt ? "READY_" : "IDLE_";
        document.getElementById(previewId).textContent = "-- -- --";
        return;
    }

    let digraphs = [];
    for (let i = 0; i < text.length; i += 2) {
        let a = text[i], b = text[i + 1] || 'X';
        if (a === b) { b = 'X'; i--; }
        digraphs.push(a + b);
    }
    document.getElementById(previewId).textContent = digraphs.join(' ');

    let res = "";
    const shift = isEncrypt ? 1 : 4; 
    digraphs.forEach(pair => {
        let p1 = findPos(pair[0]), p2 = findPos(pair[1]);
        if (p1.r === p2.r) {
            res += matrix[p1.r][(p1.c + shift) % 5] + matrix[p2.r][(p2.c + shift) % 5];
        } else if (p1.c === p2.c) {
            res += matrix[(p1.r + shift) % 5][p1.c] + matrix[(p2.r + shift) % 5][p2.c];
        } else {
            res += matrix[p1.r][p2.c] + matrix[p2.r][p1.c];
        }
    });
    document.getElementById(outputId).textContent = res;
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    if (text.includes('_')) return;
    navigator.clipboard.writeText(text).then(() => {
        alert("Ciphertext copied to clipboard.");
    });
}

// Listeners
document.getElementById('secretKey').addEventListener('input', updateMatrix);
document.getElementById('encryptInput').addEventListener('input', () => runCipher(true));
document.getElementById('decryptInput').addEventListener('input', () => runCipher(false));

window.onload = updateMatrix;