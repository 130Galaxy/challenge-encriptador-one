// Variables para acceder a los elementos del DOM
const textInput = document.getElementById('text-input');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const message = document.getElementById('message');
const output = document.getElementById('output');

// Función para validar que solo se usen minúsculas y espacios (para cifrar)
function isValidTextForEncryption(text) {
    const regex = /^[a-z\s]+$/; // Solo permite letras minúsculas y espacios
    return regex.test(text);
}

// Función para cifrar el texto
function encryptText(text) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        const asciiCode = text.charCodeAt(i);
        encryptedText += String.fromCharCode(asciiCode + 2); // Sumar 2 al código ASCII
    }
    return encryptedText;
}

// Función para descifrar el texto (sin validación de caracteres especiales)
function decryptText(text) {
    let decryptedText = '';
    for (let i = 0; i < text.length; i++) {
        const asciiCode = text.charCodeAt(i);
        decryptedText += String.fromCharCode(asciiCode - 2); // Restar 2 al código ASCII
    }
    return decryptedText;
}

// Función para copiar texto al portapapeles
function copyToClipboard() {
    const text = output.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar al portapapeles', err);
    });
}

// Evento al hacer clic en el botón "Cifrar"
encryptBtn.addEventListener('click', () => {
    const text = textInput.value;
    if (isValidTextForEncryption(text)) {
        const encrypted = encryptText(text);
        output.textContent = encrypted;
        output.style.display = 'block'; // Mostrar el resultado
        message.textContent = ''; // Limpiar mensaje de error
    } else {
        message.textContent = 'No se permiten caracteres especiales, ni mayúsculas';
        output.style.display = 'none'; // Ocultar el resultado
    }
});

// Evento al hacer clic en el botón "Descifrar"
decryptBtn.addEventListener('click', () => {
    const text = textInput.value;
    const decrypted = decryptText(text);
    output.textContent = decrypted;
    output.style.display = 'block'; // Mostrar el resultado
    message.textContent = ''; // Limpiar mensaje de error
});

// Evento al hacer clic en el botón "Copiar"
copyBtn.addEventListener('click', () => {
    if (output.textContent) {
        copyToClipboard();
    }
});
