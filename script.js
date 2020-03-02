window.onload = () => {
    const updateResult = e => {
        let block, element, el_mod, el_mov_value, block_mod, block_mov_value
        const value = e.target.value
        const parts = value.split('__')
        // блок
        if(parts[0]){
            const block_parts = parts[0].split('_')
            // название блока
            if(block_parts[0]){
                block = block_parts[0]
            }
            // название модификатора
            if(block_parts[1]){
                block_mod = block_parts[1]
            }
            // значение модификатора
            if(block_parts[2]){
                block_mov_value = block_parts[2]
            }
        }
        // элемент
        if(parts[1]){
            const el_parts = parts[1].split('_')
            // название элемента
            if(el_parts[0]){
                element = el_parts[0]
            }
            // название модификатора
            if(el_parts[1]){
                el_mod = el_parts[1]
            }
            // значение модификатора
            if(el_parts[2]){
                el_mov_value = el_parts[2]
            }
        }
        let aggr_value = ``
        if(block){
            aggr_value += 'Блок: ' + block + '<br />'
        }
        if(block_mod){
            aggr_value += 'Модификатор блока: ' + block_mod + '<br />'
        }
        if(block_mov_value){
            aggr_value += 'Значение модификатора блока: ' + block_mov_value + '<br />'
        }
        if(element){
            aggr_value += 'Элемент: ' + element + '<br />'
        }
        if(el_mod){
            aggr_value += 'Модификатор элемента: ' + el_mod + '<br />'
        }
        if(el_mov_value){
            aggr_value += 'Значение модификатора элемента: ' + el_mov_value + '<br />'
        }
        document.getElementById('result').innerHTML = aggr_value
    }
    document.getElementById('classinput').onkeydown = updateResult
    document.getElementById('classinput').onchange = updateResult
}