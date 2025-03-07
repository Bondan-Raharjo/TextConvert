const kamus = {
    'A': 0, 'B': 1, 'C': 1, 'D': 1, 'E': 2, 'F': 3, 'G': 3, 'H': 3, 'I': 4, 'J': 5,
    'K': 5, 'L': 5, 'M': 5, 'N': 5, 'O': 6, 'P': 7, 'Q': 7, 'R': 7, 'S': 7, 'T': 7,
    'U': 8, 'V': 9, 'W': 9, 'X': 9, 'Y': 9, 'Z': 9,
    'a': 9, 'b': 8, 'c': 8, 'd': 8, 'e': 7, 'f': 6, 'g': 6, 'h': 6, 'i': 5, 'j': 4,
    'k': 4, 'l': 4, 'm': 4, 'n': 4, 'o': 3, 'p': 2, 'q': 2, 'r': 2, 's': 2, 't': 2,
    'u': 1, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0,
    ' ': 0
};

const angkaKeHuruf = {};
for (const resultCase3 in kamus) {
    let angka = kamus[resultCase3];
    if (!(angka in angkaKeHuruf)) {
        angkaKeHuruf[angka] = resultCase3.toUpperCase();
    }
}

function resolvedCase1(teks) {
    return teks.split('').map(char => kamus[char] ?? '?').join(' ');
}

function resolvedCase2(bilanganStr) {
    let angkaArray = bilanganStr.split(' ').map(Number);
    if (angkaArray.some(isNaN)) return 'Input tidak valid';
    return angkaArray.reduce((hasil, angka, i) => i % 2 ? hasil + angka : hasil - angka);
}


function resolvedCase3(angka) {
    angka = Math.abs(angka); 
    let hasil = [];
    let n = 0, total = 0;

    while (total <= angka) {
        hasil.push(n);
        total += n;
        n++;
    }

    if (total > angka) {
        hasil.pop();
    }

    let tambahan = [0, 1];
    let indexTambahan = 0;
    while (hasil.reduce((a, b) => a + b, 0) < angka) {
        hasil.push(tambahan[indexTambahan]);
        indexTambahan = 1 - indexTambahan;
    }

    return hasil.map(num => angkaKeHuruf[num]).join(' ');
}

function resolvedCase4(angka) {
    let hasil = resolvedCase3(angka).split(' ');
    let len = hasil.length;
    if (len >= 2) {
        hasil[len - 1] = angkaKeHuruf[kamus[hasil[len - 1]] + 1] || hasil[len - 1];
        hasil[len - 2] = angkaKeHuruf[kamus[hasil[len - 2]] + 1] || hasil[len - 2];
    }
    return hasil.join(' ');
}

function resolvedCase5(teks) {
    return teks.split(' ').map(resultCase3 => {
        let angka = kamus[resultCase3] ?? '?';
        return ['A', 'E', 'I', 'O', 'U'].includes(resultCase3) ? angka + 1 : angka;
    }).join(' ');
}

function prosesTeks() {
    const inputText = document.getElementById('inputText').value;
    const hasilDiv = document.getElementById('hasil');
    
    hasilDiv.innerHTML = '';

    if (!inputText || !inputText.match(/^[A-Za-z ,]+$/)) {
        tampilkanError('Input mengandung karakter tidak valid');
        return;
    }

    const entries = inputText.split(',')
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);

    if (entries.length === 0) {
        tampilkanError('Tidak ada teks yang valid');
        return;
    }

    entries.forEach((entry, index) => {
        if (!entry.match(/^[A-Za-z ]+$/)) {
            tampilkanError(`Entry ke-${index + 1} tidak valid`);
            return;
        }

        const resultCase1 = resolvedCase1(entry);
        const resultCase2 = resolvedCase2(resultCase1);
        const resultCase3 = resolvedCase3(resultCase2);
        const resultCase4 = resolvedCase4(resultCase2);
        const resultCase5 = resolvedCase5(resultCase4);

        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry-result mb-4 p-3 border rounded';
        entryDiv.innerHTML = `
            <div class="list-group-item"><strong>Original :</strong> <span>${entry}</span></div>
            <div class="list-group-item"><strong>Case 1:</strong> <span>${resultCase1}</span></div>
            <div class="list-group-item"><strong>Case 2:</strong> <span>${resultCase2}</span></div>
            <div class="list-group-item"><strong>Case 3:</strong> <span>${resultCase3}</span></div>
            <div class="list-group-item"><strong>Case 4:</strong> <span>${resultCase4}</span></div>
            <div class="list-group-item"><strong>Case 5:</strong> <span>${resultCase5}</span></div>
        `;

        hasilDiv.appendChild(entryDiv);
    });
}

function tampilkanError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.textContent = message;
    document.getElementById('hasil').appendChild(errorDiv);
}