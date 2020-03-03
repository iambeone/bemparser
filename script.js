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
        document.getElementById('classresult').innerHTML = aggr_value
    }
    const newErrors = () => ({
        ncp: [],
        mod: [],
        npc: []
    })
    let errors
    const checkBEMClass = (tagClass, parentClasses) => {
        let classes = tagClass.split(' ')
        // check if element is not containing parent classes
        if (parentClasses.find(pc => classes.find(c => c == pc))){
            // 
            errors.ncp.push(tagClass)
        }
        // check if no 
        if (classes.length > 1){
            if(classes[1].indexOf(classes[0] + '_') !== 0 && classes[0].indexOf(classes[1] + '_')) {
            errors.mod.push(tagClass)
            }
        }
        // check class bem
        classes.map(c => {
            const parts = c.split('__')
            // block_mod_value
            if(parts.length == 1){
            // block is ok
            }else{
            // block should be somewhere in parents
            if(!parentClasses.find(pc => pc === parts[0])){
                errors.npc.push(tagClass)
            }
            }
        })
        
    }
    const iterateDom = (el, parentClasses) => {
        el.map(child => {
            let pClasses = parentClasses.slice()
            if(child.attribs && child.attribs.class) {
            checkBEMClass(child.attribs.class, parentClasses)
            pClasses = [...pClasses, ...child.attribs.class.split(' ')]
            }
        
            if(child.type == 'tag' && child.children.length){
            iterateDom(child.children, pClasses)
            }
        })
    }
    const htmlParser = () => {
        errors = newErrors()
        const htmlCode = document.getElementById('codeinput').value
        const dom = window.HTMLDOMParser(htmlCode)
        iterateDom(dom, [])
        let result = ''
        if(errors.ncp.length){
            result += '<b>Ошибки, связанные с вложенностью блоков</b>:<br />'
            errors.ncp.map(er => {
                result += er + '<br />'
            })
        }
        if(errors.mod.length){
            result += '<b>Ошибки, связанные с неправильным применением модификаторов</b>:<br />'
            errors.mod.map(er => {
                result += er + '<br />'
            })
        }
        if(errors.npc.length){
            result += '<b>Ошибки, связанные с неправильным применением блоков</b>:<br />'
            errors.npc.map(er => {
                result += er + '<br />'
            })
        }
        document.getElementById('coderesult').innerHTML = result ? result: 'Ошибок не найдено'

    }
    
    document.getElementById('classinput').onkeydown = updateResult
    document.getElementById('classinput').onchange = updateResult
    document.getElementById('codecheck').onclick = htmlParser
}