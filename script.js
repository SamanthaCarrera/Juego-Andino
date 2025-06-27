document.addEventListener('DOMContentLoaded', () => {

    // --- Actividad 1: Descubre tu atuendo ---
    [cite_start]const mamaDanzaOptions = ["Cushma", "Chumpi", "Sombrero blanco", "Pinkullu", "Bombo", "Huactana"]; [cite: 2]
    [cite_start]const wawaDanzaOptions = ["Chumpi", "Pollerín", "Alfanje", "Cascabeles", "Chanta", "Bandas"]; [cite: 2]

    // Combinar todas las opciones para la lista arrastrable. [cite_start]Se duplica "Chumpi" ya que aparece en ambos sets. [cite: 2]
    const allActivity1Options = [...mamaDanzaOptions, "Pollerín", "Alfanje", "Cascabeles", "Chanta", "Bandas"];

    const dragOptionsContainer1 = document.getElementById('drag-options-activity1');
    const mamaDanzaDropArea = document.getElementById('mama-danza-drop-area');
    const wawaDanzaDropArea = document.getElementById('wawa-danza-drop-area');
    [cite_start]const checkButton1 = document.getElementById('check-activity1'); [cite: 3]
    [cite_start]const resetButton1 = document.getElementById('reset-activity1'); [cite: 3]
    const feedback1 = document.getElementById('feedback-activity1');

    function createDraggableItems1(options) {
        dragOptionsContainer1.innerHTML = ''; // Limpiar opciones anteriores
        // Mezclar las opciones para cada reinicio
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        shuffledOptions.forEach(option => {
            const div = document.createElement('div');
            div.classList.add('draggable-item');
            div.setAttribute('draggable', true);
            div.textContent = option;
            div.dataset.value = option; // Almacenar el valor original
            dragOptionsContainer1.appendChild(div);
        });
    }

    createDraggableItems1(allActivity1Options);

    let draggedItem = null;

    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('draggable-item')) {
            draggedItem = e.target;
            e.dataTransfer.setData('text/plain', e.target.dataset.value);
            // Pequeño retardo para que el elemento se oculte después de que el navegador tome una "captura" para el arrastre
            setTimeout(() => {
                e.target.classList.add('hide');
            }, 0);
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('draggable-item')) {
            e.target.classList.remove('hide');
        }
    });

    [mamaDanzaDropArea, wawaDanzaDropArea].forEach(dropArea => {
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permitir la caída
        });

        dropArea.addEventListener('dragenter', (e) => {
            e.preventDefault();
            e.target.classList.add('hover');
        });

        dropArea.addEventListener('dragleave', (e) => {
            e.target.classList.remove('hover');
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            e.target.classList.remove('hover');
            if (draggedItem) {
                const droppedValue = draggedItem.dataset.value;
                const p = document.createElement('p');
                p.textContent = droppedValue;
                p.classList.add('dropped-item'); // Clase para estilizar/identificar
                e.target.appendChild(p);
                draggedItem.remove(); // Eliminar de las opciones originales
                draggedItem = null;
            }
        });
    });

    [cite_start]checkButton1.addEventListener('click', () => { [cite: 3]
        let correctCount = 0;
        let totalItemsDropped = 0;

        const mamaDanzaDroppedItems = Array.from(mamaDanzaDropArea.querySelectorAll('.dropped-item')).map(el => el.textContent);
        const wawaDanzaDroppedItems = Array.from(wawaDanzaDropArea.querySelectorAll('.dropped-item')).map(el => el.textContent);

        // Crear copias de los arreglos de opciones correctas para poder "consumir" elementos y manejar duplicados como "Chumpi"
        let tempMamaDanzaOptions = [...mamaDanzaOptions];
        let tempWawaDanzaOptions = [...wawaDanzaOptions];

        // Verificar elementos de Mama Danza
        mamaDanzaDroppedItems.forEach(item => {
            totalItemsDropped++;
            const index = tempMamaDanzaOptions.indexOf(item);
            if (index > -1) {
                correctCount++;
                tempMamaDanzaOptions.splice(index, 1); // Remover para evitar doble conteo si un ítem correcto se suelta dos veces
            }
        });

        // Verificar elementos de Wawa Danza
        wawaDanzaDroppedItems.forEach(item => {
            totalItemsDropped++;
            const index = tempWawaDanzaOptions.indexOf(item);
            if (index > -1) {
                correctCount++;
                tempWawaDanzaOptions.splice(index, 1); // Remover para evitar doble conteo
            }
        });

        // Contar el número total de opciones únicas correctas esperadas.
        // Dado que "Chumpi" aparece en ambas listas de opciones originales, y es una sola opción arrastrable,
        // necesitamos un set para las opciones únicas.
        const uniqueExpectedOptions = new Set([...mamaDanzaOptions, ...wawaDanzaOptions]);


        if (correctCount === allActivity1Options.length && totalItemsDropped === allActivity1Options.length) {
            feedback1.textContent = "¡Excelente! Has descubierto los atuendos correctamente.";
            feedback1.style.color = "green";
        } else {
            feedback1.textContent = "Sigue intentándolo, ¡lo lograrás!";
            feedback1.style.color = "red";
        }
    });

    [cite_start]resetButton1.addEventListener('click', () => { [cite: 3]
        // Mover los elementos de vuelta a las opciones arrastrables
        Array.from(mamaDanzaDropArea.querySelectorAll('.dropped-item')).forEach(item => {
            dragOptionsContainer1.appendChild(item);
            item.classList.remove('dropped-item'); // Quitar la clase de 'dropped-item'
            item.classList.remove('hide'); // Asegurarse de que sea visible
        });
        Array.from(wawaDanzaDropArea.querySelectorAll('.dropped-item')).forEach(item => {
            dragOptionsContainer1.appendChild(item);
            item.classList.remove('dropped-item');
            item.classList.remove('hide');
        });

        mamaDanzaDropArea.innerHTML = '';
        wawaDanzaDropArea.innerHTML = '';
        createDraggableItems1(allActivity1Options); // Regenerar y mezclar
        feedback1.textContent = '';
    });

    // --- Actividad 2: Crónica de los Danzantes del Sol ---
    const storyBlanksData = [
        [cite_start]{ word: "Inti", translation: "Sol" }, [cite: 11]
        [cite_start]{ word: "Atuendo", translation: "Atuendo" }, [cite: 11]
        [cite_start]{ word: "Alfanje", translation: "Espada ritual" }, [cite: 11]
        [cite_start]{ word: "Tauna", translation: "Vara" }, [cite: 11]
        [cite_start]{ word: "Allpamama", translation: "Madre Tierra" }, [cite: 11]
        [cite_start]{ word: "Mama Danza", translation: "Mama Danza" }, [cite: 11]
        [cite_start]{ word: "Pinkullu", translation: "Flauta ritual" }, [cite: 11]
        [cite_start]{ word: "Bombo", translation: "Tambor" }, [cite: 11]
    ];
    const dragOptionsContainer2 = document.getElementById('drag-options-activity2');
    const blanks = document.querySelectorAll('#activity2 .blank');
    [cite_start]const checkButton2 = document.getElementById('check-activity2'); [cite: 11]
    [cite_start]const translateButton2 = document.getElementById('translate-activity2'); [cite: 11]
    [cite_start]const resetButton2 = document.getElementById('reset-activity2'); [cite: 11]
    const feedback2 = document.getElementById('feedback-activity2');

    function createDraggableItems2(options) {
        dragOptionsContainer2.innerHTML = '';
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        shuffledOptions.forEach(option => {
            const div = document.createElement('div');
            div.classList.add('draggable-item');
            div.setAttribute('draggable', true);
            div.textContent = option.word;
            div.dataset.value = option.word;
            div.dataset.translation = option.translation;
            dragOptionsContainer2.appendChild(div);
        });
    }

    createDraggableItems2(storyBlanksData);

    let draggedItem2 = null;

    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('draggable-item')) {
            draggedItem2 = e.target;
            e.dataTransfer.setData('text/plain', e.target.dataset.value);
            setTimeout(() => {
                e.target.classList.add('hide');
            }, 0);
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('draggable-item')) {
            e.target.classList.remove('hide');
        }
    });

    blanks.forEach(blank => {
        blank.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        blank.addEventListener('dragenter', (e) => {
            e.preventDefault();
            e.target.classList.add('hover');
        });

        blank.addEventListener('dragleave', (e) => {
            e.target.classList.remove('hover');
        });

        blank.addEventListener('drop', (e) => {
            e.preventDefault();
            e.target.classList.remove('hover');
            // Solo permitir soltar si el espacio en blanco está vacío y si draggedItem2 no es null
            if (draggedItem2 && !e.target.textContent.trim()) {
                e.target.textContent = draggedItem2.dataset.value;
                e.target.classList.add('filled');
                e.target.dataset.droppedValue = draggedItem2.dataset.value; // Almacenar el valor soltado
                draggedItem2.remove(); // Eliminar de las opciones arrastrables
                draggedItem2 = null;
            }
        });
    });

    [cite_start]checkButton2.addEventListener('click', () => { [cite: 11]
        let correctCount = 0;
        let totalBlanksFilled = 0;
        blanks.forEach(blank => {
            if (blank.dataset.droppedValue) { // Solo si se ha soltado algo
                totalBlanksFilled++;
                if (blank.dataset.droppedValue === blank.dataset.correct) {
                    blank.style.color = "green";
                    correctCount++;
                } else {
                    blank.style.color = "red";
                }
            } else {
                blank.style.color = "#000"; // Asegurarse de que los no llenados no cambien de color
            }
        });

        if (correctCount === blanks.length && totalBlanksFilled === blanks.length) {
            feedback2.textContent = "¡Felicidades! Has completado la crónica correctamente.";
            feedback2.style.color = "green";
        } else {
            feedback2.textContent = "Algunas respuestas son incorrectas o faltan. ¡Sigue intentándolo!";
            feedback2.style.color = "red";
        }
    });

    [cite_start]translateButton2.addEventListener('click', () => { [cite: 11]
        let translationText = 'Traducción de términos:\n';
        storyBlanksData.forEach(item => {
            if (item.word !== item.translation) { // Solo mostrar si la traducción es diferente
                translationText += `\u2022 ${item.word} \u2192 ${item.translation}\n`;
            } else {
                translationText += `\u2022 ${item.word}\n`; // Si son iguales, solo el término
            }
        });
        alert(translationText);
    });

    [cite_start]resetButton2.addEventListener('click', () => { [cite: 11]
        blanks.forEach(blank => {
            // Si el elemento era un draggable-item antes de ser soltado, lo regresamos a dragOptionsContainer2
            if (blank.dataset.droppedValue) {
                const div = document.createElement('div');
                div.classList.add('draggable-item');
                div.setAttribute('draggable', true);
                div.textContent = blank.dataset.droppedValue;
                // Buscar la traducción original
                const originalData = storyBlanksData.find(d => d.word === blank.dataset.droppedValue);
                if (originalData) {
                    div.dataset.value = originalData.word;
                    div.dataset.translation = originalData.translation;
                }
                dragOptionsContainer2.appendChild(div);
            }
            blank.textContent = '';
            blank.classList.remove('filled');
            blank.style.color = "#000"; // Restablecer color de texto
            delete blank.dataset.droppedValue; // Borrar el valor soltado
        });
        createDraggableItems2(storyBlanksData); // Regenerar opciones arrastrables y mezclarlas
        feedback2.textContent = '';
    });

    // --- Actividad 3: Raymis y Meses ---
    const quizAnswers3 = document.querySelectorAll('#activity3 .quiz-answer');
    [cite_start]const checkButton3 = document.getElementById('check-activity3'); [cite: 13]
    [cite_start]const resetButton3 = document.getElementById('reset-activity3'); [cite: 13]
    [cite_start]const translateButton3 = document.getElementById('translate-activity3'); [cite: 13]
    const feedback3 = document.getElementById('feedback-activity3');

    [cite_start]checkButton3.addEventListener('click', () => { [cite: 13]
        let allCorrect = true;
        quizAnswers3.forEach(select => {
            if (select.value === select.dataset.correct) {
                select.style.backgroundColor = "#e0ffe0"; // Verde claro para correcto
                select.style.borderColor = "#28a745";
            } else {
                select.style.backgroundColor = "#ffe0e0"; // Rojo claro para incorrecto
                select.style.borderColor = "#dc3545";
                allCorrect = false;
            }
        });

        if (allCorrect) {
            feedback3.textContent = "¡Muy bien! Todas las respuestas son correctas.";
            feedback3.style.color = "green";
        } else {
            feedback3.textContent = "Algunas respuestas son incorrectas. ¡Inténtalo de nuevo!";
            feedback3.style.color = "red";
        }
    });

    [cite_start]resetButton3.addEventListener('click', () => { [cite: 13]
        quizAnswers3.forEach(select => {
            select.value = ""; // Restablecer a la opción por defecto
            select.style.backgroundColor = ""; // Limpiar color de fondo
            select.style.borderColor = "#b0d3ee"; // Restablecer color del borde
        });
        feedback3.textContent = '';
    });

    [cite_start]translateButton3.addEventListener('click', () => { [cite: 13]
        // Para esta actividad, el anexo solo menciona "marzo" para Pawkar Raymi.
        // Asumiendo que Killa Raymi se asocia tradicionalmente con septiembre.
        const translations = `
            Killa Raymi: Se celebra en Septiembre, asociado a la Luna y la fertilidad de la tierra.
            Pawkar Raymi: Se celebra en Marzo, asociado a la época de floración y la abundancia.
        `;
        alert(translations);
    });

});